import { RiskFinding } from './types';

export interface RuleFinding {
  title: string;
  description: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  quote?: string;
  suggestion?: string;
  category?: string;
}

export function analyzeWithoutAI(text: string): RiskFinding[] {
  if (!text || text.trim().length === 0) {
    return [];
  }

  const findings: RiskFinding[] = [];
  let idCounter = 1;

  const rules: Array<{
    title: string;
    regex: RegExp;
    riskLevel: 'High' | 'Medium' | 'Low';
    category: string;
    explanation: string;
    suggestion: string;
  }> = [
    {
      title: 'Data Selling & Third-Party Data Sharing',
      regex: /(sell.*user data|share.*third-party|data brokers|debt collection|biometric.*face|real-time gps|location telemetry|150 third-party)/i,
      riskLevel: 'High',
      category: 'Data Privacy',
      explanation: 'The agreement permits selling, sharing, or monetizing your personal data, location telemetry, or biometric identifiers with third-party advertisers or data brokers.',
      suggestion: 'Demand a strict opt-in clause prohibiting third-party data sales, and enforce zero biometric retention.'
    },
    {
      title: 'Mandatory Binding Arbitration & Class Action Waiver',
      regex: /(binding arbitration|waive.*class action|jurisdiction of the cayman|waive any right to.*jury trial|collective arbitration)/i,
      riskLevel: 'High',
      category: 'Arbitration & Disputes',
      explanation: 'Forces you to give up your constitutional right to a jury trial or class action lawsuit, requiring private arbitration in remote or unfavorable legal jurisdictions.',
      suggestion: 'Insist on a small-claims court exemption and mutual arbitration in your home jurisdiction with shared filing fees.'
    },
    {
      title: 'Unilateral Policy & Price Changes Without Notice',
      regex: /(unilateral|sole and absolute discretion|without prior notice|at any time without notice|reserve the right to modify|increase subscription fees)/i,
      riskLevel: 'High',
      category: 'Unilateral Changes',
      explanation: 'The provider grants themselves unilateral authority to alter prices, terms, or service features at any time without giving you prior written notice or a cancellation right.',
      suggestion: 'Require a mandatory 30-day prior written notice for material changes, with an explicit right to cancel without penalty.'
    },
    {
      title: 'Perpetual & Irrevocable IP Ownership Grab',
      regex: /(perpetual.*irrevocable.*royalty-free|assigns and transfers exclusively.*all right|prior unpatented inventions|non-working hours)/i,
      riskLevel: 'High',
      category: 'IP Ownership',
      explanation: 'Claims perpetual, global ownership or unrestricted licensing rights over all user-submitted content, notes, or side projects created outside working hours.',
      suggestion: 'Limit content licensing strictly to service delivery needs, with automatic license termination upon account deletion.'
    },
    {
      title: 'Draconian Auto-Renewal & Non-Refundable Cancellation',
      regex: /(automatically renew|90 days prior to the renewal|refunds are strictly prohibited|certified physical mail)/i,
      riskLevel: 'Medium',
      category: 'Auto-Renewal',
      explanation: 'Enforces automatic multi-year renewals and restricts cancellations to onerous methods (e.g., physical certified mail 90 days in advance).',
      suggestion: 'Require electronic 1-click cancellation and annual email renewal reminders 30 days prior to billing.'
    },
    {
      title: 'Nominal Liability Cap & Unlimited User Indemnification',
      regex: /(total aggregate liability.*limited to \$10|indemnify and hold harmless.*officers|maximum extent permitted)/i,
      riskLevel: 'Medium',
      category: 'Liability',
      explanation: 'Caps the provider liability to a nominal amount ($10) while forcing you to absorb unlimited legal costs for third-party claims.',
      suggestion: 'Establish a mutual liability cap equal to 12 months of service fees paid.'
    }
  ];

  // Split text into sentences/paragraphs
  const sentences = text.split(/(?<=[.!?])\s+/);

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (trimmed.length < 15) continue;

    for (const rule of rules) {
      if (rule.regex.test(trimmed)) {
        // Avoid duplicate quotes
        if (!findings.some((f) => f.quote.includes(trimmed.slice(0, 35)))) {
          findings.push({
            id: `rule-${idCounter++}`,
            riskLevel: rule.riskLevel,
            quote: trimmed,
            explanation: rule.explanation,
            suggestion: rule.suggestion,
            category: rule.category
          });
        }
      }
    }
  }

  // Fallback if no specific regex matches
  if (findings.length === 0) {
    findings.push({
      id: 'rule-generic-1',
      riskLevel: 'Low',
      quote: text.slice(0, 180) + '...',
      explanation: 'No immediate predatory red flags detected in scanned excerpt using the instant rule engine.',
      suggestion: 'Run a Deep AI Scan for nuanced legal interpretation or verify termination clauses manually.',
      category: 'Standard Review'
    });
  }

  return findings;
}
