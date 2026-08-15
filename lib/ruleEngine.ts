export interface RiskResult {
  id: string;
  category: string;
  level: "CRITICAL" | "HIGH" | "MEDIUM";
  title: string;
  description: string;
  matchedText?: string;
}

const RISK_RULES = [
  { id: "DATA_SELLING", category: "Data Privacy", level: "CRITICAL", title: "Data Selling & Monetization", description: "They claim the right to sell, rent, or trade your personal data to third parties.", pattern: /(sell|rent|monetize|trade|exchange|share).*?(personal data|personal information|user data|your information).*?(third part|affiliate|partner|advertiser)/i },
  { id: "FORCED_ARBITRATION", category: "Legal Rights", level: "CRITICAL", title: "Forced Arbitration & Class Action Waiver", description: "You surrender your right to sue them in court or join a class-action lawsuit.", pattern: /(mandatory|binding).*?(arbitration)|(waive|give up|surrender).*?(right to).*?(class action|jury trial|court)/i },
  { id: "UNILATERAL_CHANGE", category: "Terms Modifications", level: "HIGH", title: "Unilateral Changes Without Notice", description: "They can change the contract at any time without telling you.", pattern: /(reserve the right to).*?(modify|change|update|amend).*?(terms|agreement|policy).*?(at any time|without prior notice|without notice)/i },
  { id: "IP_GRAB", category: "Intellectual Property", level: "HIGH", title: "Broad IP & Content License Grab", description: "You give them a permanent, free license to use or sell your work.", pattern: /(grant us|grant).*?(perpetual|irrevocable|worldwide|royalty-free|transferable).*?(license|right).*?(use|reproduce|modify|distribute|display)/i },
  { id: "GEO_TRACKING", category: "Data Privacy", level: "MEDIUM", title: "Invasive Tracking & Geolocation", description: "They track your precise physical location or cross-site browsing.", pattern: /(collect|track|gather).*?(precise location|geolocation|gps|cross-site|browsing history|device fingerprint)/i },
  { id: "LIABILITY_LIMIT", category: "Legal Rights", level: "HIGH", title: "Extreme Limitation of Liability", description: "They cap their financial responsibility to almost nothing if they cause damages.", pattern: /(limitation of liability|maximum liability|aggregate liability).*?(shall not exceed|limited to).*?(\$0|zero|amount paid by you|50|100)/i },
  { id: "INDEMNIFICATION", category: "Financial Risk", level: "HIGH", title: "User Indemnification Clause", description: "You agree to pay their legal fees if they get sued because of you.", pattern: /(agree to).*?(indemnify|hold harmless|defend).*?(company|us).*?(from and against|against).*?(claims|damages|liabilities|fees|lawsuits)/i },
  { id: "ACCOUNT_TERMINATION", category: "User Rights", level: "MEDIUM", title: "Arbitrary Account Termination", description: "They can delete your account and data for any reason, with no appeal.", pattern: /(reserve the right to).*?(terminate|suspend|delete).*?(account|access).*?(at any time|for any reason|without notice|at our sole discretion)/i },
  { id: "AUTO_RENEWAL", category: "Financial Risk", level: "MEDIUM", title: "Automatic Renewal Trap", description: "Your subscription auto-renews unless canceled.", pattern: /(subscription|membership|plan).*?(automatically renew|auto-renew).*?(unless you cancel|prior to the end)/i },
  { id: "DATA_RETENTION", category: "Data Privacy", level: "HIGH", title: "Indefinite Data Retention", description: "They keep your personal data forever, even after you delete your account.", pattern: /(retain|keep|store).*?(your data|information|personal data).*?(indefinitely|for as long as|perpetually|even after.*?(deletion|termination))/i }
];

export function analyzeWithoutAI(text: string): RiskResult[] {
  const detectedRisks: RiskResult[] = [];
  const normalizedText = text.replace(/\s+/g, ' ');
  for (const rule of RISK_RULES) {
    const match = normalizedText.match(rule.pattern);
    if (match) {
      detectedRisks.push({
        id: rule.id,
        category: rule.category,
        level: rule.level as "CRITICAL" | "HIGH" | "MEDIUM",
        title: rule.title,
        description: rule.description,
        matchedText: match[0]
      });
    }
  }
  return detectedRisks;
}
