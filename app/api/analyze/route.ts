import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RiskFinding, AnalyzeResponsePayload, ScanMode } from '@/lib/types';
import { analyzeWithoutAI } from '@/lib/ruleEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, content, text: inputText, mode = 'ai' } = body || {};

    const rawInput = (inputText || content || '').trim();

    if (!rawInput) {
      return NextResponse.json(
        { success: false, error: 'Text or Content parameter is required.' },
        { status: 400 }
      );
    }

    let textToAnalyze = rawInput;
    let extractedTitle = 'Legal Document';
    const effectiveType = type || (rawInput.startsWith('http://') || rawInput.startsWith('https://') ? 'url' : 'text');

    // Handle URL extraction with Cheerio
    if (effectiveType === 'url') {
      try {
        let urlString = rawInput;
        if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
          urlString = 'https://' + urlString;
        }

        const fetchResponse = await fetch(urlString, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TermsScanner/2.5',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          },
          signal: AbortSignal.timeout(12000)
        });

        if (!fetchResponse.ok) {
          throw new Error(`Failed to fetch URL. HTTP status ${fetchResponse.status}`);
        }

        const html = await fetchResponse.text();
        const $ = cheerio.load(html);

        // Remove unneeded elements
        $('script, style, nav, header, footer, aside, noscript, iframe, svg, form, [role="navigation"]').remove();

        extractedTitle = $('title').text().trim() || $('h1').first().text().trim() || 'Web Policy Document';
        
        let cleanedText = $('article, main, body').text();
        cleanedText = cleanedText
          .replace(/\s+/g, ' ')
          .replace(/\n+/g, '\n')
          .trim();

        if (cleanedText.length < 50) {
          throw new Error('Could not extract sufficient text from the target URL.');
        }

        textToAnalyze = cleanedText;
      } catch (err: any) {
        console.error('URL scraping error:', err);
        return NextResponse.json(
          { 
            success: false, 
            error: err.message || 'Failed to scrape text from specified URL. Please check the link or paste the text directly.' 
          },
          { status: 422 }
        );
      }
    }

    // Truncate text if excessively long
    const maxChars = 24000;
    if (textToAnalyze.length > maxChars) {
      textToAnalyze = textToAnalyze.slice(0, maxChars) + '\n\n[Document truncated for length]';
    }

    let findings: RiskFinding[] = [];

    // MODE 1: INSTANT RULE ENGINE (Zero Cost, Instant Regex)
    if (mode === 'instant') {
      findings = analyzeWithoutAI(textToAnalyze);
    } 
    // MODE 2: DEEP AI SCAN (Gemini API)
    else {
      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY') {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

          const prompt = `You are an expert legal and privacy auditor. Analyze the following text. Identify predatory clauses, privacy risks, liability traps, unilateral terms, or unfavorable clauses.
Respond ONLY in valid JSON format as an array of objects. Do not include any introductory commentary or markdown explanations outside the JSON.

JSON Schema:
[
  {
    "riskLevel": "High" | "Medium" | "Low",
    "quote": "exact text from doc",
    "explanation": "why it is bad in plain simple English",
    "suggestion": "how to fix/negotiate or specific counter-proposal clause",
    "category": "Arbitration | Data Privacy | IP Ownership | Liability | Unilateral Changes | Auto-Renewal | General"
  }
]

Document Text:
${textToAnalyze}`;

          const result = await model.generateContent(prompt);
          let rawResponse = result.response.text().trim();

          if (rawResponse.startsWith('```')) {
            rawResponse = rawResponse.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
          }

          const parsed = JSON.parse(rawResponse);
          if (Array.isArray(parsed)) {
            findings = parsed.map((item, idx) => ({
              id: `ai-finding-${idx}-${Date.now()}`,
              riskLevel: ['High', 'Medium', 'Low'].includes(item.riskLevel) ? item.riskLevel : 'Medium',
              quote: item.quote || 'Clause quote unavailable',
              explanation: item.explanation || 'Potential risk detected in clause.',
              suggestion: item.suggestion || 'Negotiate to limit scope and add mutual protections.',
              category: item.category || 'Legal Risk'
            }));
          }
        } catch (aiError) {
          console.warn('Gemini API call failed, running instant rule engine fallback:', aiError);
          findings = analyzeWithoutAI(textToAnalyze);
        }
      } else {
        // Fallback to rule engine if API key is unconfigured
        findings = analyzeWithoutAI(textToAnalyze);
      }
    }

    // Calculate Summary Stats
    const highCount = findings.filter(f => f.riskLevel === 'High').length;
    const medCount = findings.filter(f => f.riskLevel === 'Medium').length;
    const lowCount = findings.filter(f => f.riskLevel === 'Low').length;
    
    const rawScore = (highCount * 25) + (medCount * 10) + (lowCount * 3);
    const overallRiskScore = Math.min(100, Math.max(0, rawScore));

    const responsePayload: AnalyzeResponsePayload = {
      success: true,
      findings,
      sourceType: effectiveType === 'url' ? 'url' : 'text',
      mode: mode as ScanMode,
      rawTextLength: textToAnalyze.length,
      extractedTitle,
      summary: {
        totalClauses: findings.length,
        highRiskCount: highCount,
        mediumRiskCount: medCount,
        lowRiskCount: lowCount,
        overallRiskScore
      }
    };

    return NextResponse.json(responsePayload);
  } catch (error: any) {
    console.error('API /api/analyze error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'An error occurred while auditing the document.' },
      { status: 500 }
    );
  }
}
