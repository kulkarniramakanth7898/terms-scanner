import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RiskFinding, AnalyzeResponsePayload } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, content } = body || {};

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Content parameter is required.' },
        { status: 400 }
      );
    }

    let textToAnalyze = content.trim();
    let extractedTitle = 'Legal Document';

    // Handle URL extraction with Cheerio
    if (type === 'url') {
      try {
        let urlString = content.trim();
        if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
          urlString = 'https://' + urlString;
        }

        const fetchResponse = await fetch(urlString, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PrivacyLens/1.0',
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
        
        // Extract main readable text from body or article
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

    // Truncate text if excessively long to stay within standard context limits
    const maxChars = 24000;
    if (textToAnalyze.length > maxChars) {
      textToAnalyze = textToAnalyze.slice(0, maxChars) + '\n\n[Document truncated for length]';
    }

    let findings: RiskFinding[] = [];
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY') {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Try Gemini 2.5 flash or fall back to gemini-1.5-flash
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

        // Strip markdown code fences if Gemini included ```json ... ```
        if (rawResponse.startsWith('```')) {
          rawResponse = rawResponse.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
        }

        const parsed = JSON.parse(rawResponse);
        if (Array.isArray(parsed)) {
          findings = parsed.map((item, idx) => ({
            id: `finding-${idx}-${Date.now()}`,
            riskLevel: ['High', 'Medium', 'Low'].includes(item.riskLevel) ? item.riskLevel : 'Medium',
            quote: item.quote || 'Clause quote unavailable',
            explanation: item.explanation || 'Potential risk detected in clause.',
            suggestion: item.suggestion || 'Negotiate to limit scope and add mutual protections.',
            category: item.category || 'Legal Risk'
          }));
        }
      } catch (aiError) {
        console.warn('Gemini API call failed or unconfigured, running fallback auditor:', aiError);
        findings = runFallbackLegalAuditor(textToAnalyze);
      }
    } else {
      // Fallback rule-based legal scanner if API key is not supplied
      findings = runFallbackLegalAuditor(textToAnalyze);
    }

    // Calculate Summary Stats & Overall Risk Score
    const highCount = findings.filter(f => f.riskLevel === 'High').length;
    const medCount = findings.filter(f => f.riskLevel === 'Medium').length;
    const lowCount = findings.filter(f => f.riskLevel === 'Low').length;
    
    // Risk score calculation formula: High (25 pts), Med (10 pts), Low (2 pts), capped at 100
    const rawScore = (highCount * 25) + (medCount * 10) + (lowCount * 3);
    const overallRiskScore = Math.min(100, Math.max(0, rawScore));

    const responsePayload: AnalyzeResponsePayload = {
      success: true,
      findings,
      sourceType: type === 'url' ? 'url' : 'text',
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

/**
 * Intelligent rule-based fallback auditor for offline/unconfigured environments.
 * Scans text for high-risk legal patterns (arbitration, unilateral changes, IP grab, data selling, liability limits).
 */
function runFallbackLegalAuditor(text: string): RiskFinding[] {
  const findings: RiskFinding[] = [];
  let idCounter = 1;

  const patterns = [
    {
      regex: /(unilateral|sole and absolute discretion|without prior notice|at any time without notice)/i,
      riskLevel: 'High' as const,
      category: 'Unilateral Changes',
      explanation: 'The provider grants themselves unilateral power to alter pricing, terms, or service features without giving you notice or a right to cancel.',
      suggestion: 'Demand a mandatory 30-day prior written notice requirement and an explicit right to terminate without penalty upon material changes.'
    },
    {
      regex: /(binding arbitration|waive any right to.*class action|jurisdiction of the cayman|jury trial)/i,
      riskLevel: 'High' as const,
      category: 'Arbitration & Disputes',
      explanation: 'Forces you to waive jury trial rights and class actions in favor of private arbitration, often in remote or unfavorable jurisdictions.',
      suggestion: 'Propose small-claims court exemption and mutual arbitration in a neutral, local jurisdiction with shared arbitration fees.'
    },
    {
      regex: /(perpetual.*irrevocable.*royalty-free|assigns and transfers exclusively.*all right|prior unpatented inventions)/i,
      riskLevel: 'High' as const,
      category: 'IP Ownership Grab',
      explanation: 'Clauses claiming perpetual, global licenses or total assignment over your uploaded content, data, or prior personal work.',
      suggestion: 'Limit licenses strictly to what is required to deliver the service, with automatic license termination upon account deletion.'
    },
    {
      regex: /(share.*biometric|real-time gps|sell.*data|data brokers|150 third-party)/i,
      riskLevel: 'High' as const,
      category: 'Data Privacy & Tracking',
      explanation: 'Intrusive data collection and sharing with third-party advertisers, data brokers, or debt collectors without court oversight.',
      suggestion: 'Incorporate a strict opt-in requirement for data sharing, prohibit data sales, and enforce zero biometric retention.'
    },
    {
      regex: /(increase subscription fees by up to|automatically renew|90 days prior to the renewal|refunds are strictly prohibited)/i,
      riskLevel: 'Medium' as const,
      category: 'Auto-Renewal & Price Hikes',
      explanation: 'Enforces steep price increases upon automatic renewal and mandates cumbersome cancellation requirements (e.g. 90-day physical mail).',
      suggestion: 'Require email renewal reminders 30 days prior, cap annual rate increases at 5% or CPI, and allow 1-click electronic cancellation.'
    },
    {
      regex: /(total aggregate liability.*limited to \$10|indemnify and hold harmless.*officers)/i,
      riskLevel: 'Medium' as const,
      category: 'Liability & Indemnification',
      explanation: 'Severely caps provider liability to a nominal amount ($10) while requiring you to absorb unlimited legal costs for third-party claims.',
      suggestion: 'Establish a mutual liability cap equal to 12 months of paid service fees, with carve-outs for gross negligence and data breaches.'
    },
    {
      regex: /(liquidated damages of \$250,000|non-compete.*period of five \(5\) years)/i,
      riskLevel: 'High' as const,
      category: 'Non-Compete & Penalties',
      explanation: 'Imposes extreme non-compete periods (5 years globally) and harsh automatic financial penalties ($250k) without proof of actual harm.',
      suggestion: 'Eliminate non-compete clauses or restrict them narrowly to direct competitors for max 6 months, removing liquidated damages.'
    },
    {
      regex: /(mutual non-disclosure|expire two \(2\) years|return or destroy)/i,
      riskLevel: 'Low' as const,
      category: 'Standard Protection',
      explanation: 'Standard mutual protection clause with a reasonable expiration timeframe and clear return/destroy obligations.',
      suggestion: 'Accept as standard practice.'
    }
  ];

  const sentences = text.split(/(?<=[.!?])\s+/);

  for (const sentence of sentences) {
    if (sentence.trim().length < 15) continue;

    for (const p of patterns) {
      if (p.regex.test(sentence)) {
        // Avoid duplicate quotes
        if (!findings.some(f => f.quote.includes(sentence.trim().slice(0, 30)))) {
          findings.push({
            id: `fallback-${idCounter++}`,
            riskLevel: p.riskLevel,
            quote: sentence.trim(),
            explanation: p.explanation,
            suggestion: p.suggestion,
            category: p.category
          });
        }
      }
    }
  }

  // If no specific patterns matched, provide standard generic audit item
  if (findings.length === 0) {
    findings.push({
      id: 'fallback-generic-1',
      riskLevel: 'Low',
      quote: text.slice(0, 180) + '...',
      explanation: 'No immediate predatory red flags detected in scanned excerpt.',
      suggestion: 'Standard legal terms. Ensure clear termination rights and notice periods are verified.',
      category: 'General Review'
    });
  }

  return findings;
}
