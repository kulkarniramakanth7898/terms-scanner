import { COMPLIANCE_FRAMEWORKS, ComplianceFramework, ComplianceRule } from './complianceRules';

export interface DetectedClause {
  id: string;
  clauseName: string;
  criticality: 'High' | 'Medium' | 'Low';
  description: string;
  matchedSnippet: string;
}

export interface MissingClause {
  id: string;
  clauseName: string;
  criticality: 'High' | 'Medium' | 'Low';
  description: string;
  missingMessage: string;
}

export interface FrameworkResult {
  frameworkId: string;
  frameworkName: string;
  description: string;
  category: string;
  score: number; // 0 to 100
  totalRules: number;
  passedCount: number;
  failedCount: number;
  detectedClauses: DetectedClause[];
  missingClauses: MissingClause[];
}

export interface UnifiedScanSummary {
  overallScore: number;
  frameworksScannedCount: number;
  frameworkResults: FrameworkResult[];
  scannedTextLength: number;
  timestamp: string;
}

/**
 * 100% Client-Side Compliance Scanner
 * Executes regex tests locally in browser memory with ZERO server calls.
 */
export function scanDocument(
  text: string,
  frameworkIds: string[] = ['All']
): UnifiedScanSummary {
  const normalizedText = text.replace(/\s+/g, ' ');
  const allKeys = Object.keys(COMPLIANCE_FRAMEWORKS);
  
  const targetIds = (frameworkIds.includes('All') || frameworkIds.includes('all') || frameworkIds.length === 0)
    ? allKeys
    : allKeys.filter(key => frameworkIds.map(id => id.toLowerCase()).includes(key.toLowerCase()));

  const frameworkResults: FrameworkResult[] = [];
  let totalScoreSum = 0;

  for (const fId of targetIds) {
    const framework: ComplianceFramework = COMPLIANCE_FRAMEWORKS[fId];
    if (!framework) continue;

    const detectedClauses: DetectedClause[] = [];
    const missingClauses: MissingClause[] = [];

    for (const rule of framework.rules) {
      const match = normalizedText.match(rule.regexPattern);

      if (rule.isNegativeRule) {
        // Finding a match in a negative rule means a security violation!
        if (match) {
          missingClauses.push({
            id: rule.id,
            clauseName: rule.clauseName,
            criticality: rule.criticality,
            description: rule.description,
            missingMessage: `${rule.missingMessage} (Matched snippet: "${match[0].slice(0, 60)}")`
          });
        } else {
          detectedClauses.push({
            id: rule.id,
            clauseName: rule.clauseName,
            criticality: rule.criticality,
            description: rule.description,
            matchedSnippet: 'Compliant: No prohibited data storage matched.'
          });
        }
      } else {
        if (match) {
          detectedClauses.push({
            id: rule.id,
            clauseName: rule.clauseName,
            criticality: rule.criticality,
            description: rule.description,
            matchedSnippet: match[0].length > 120 ? match[0].slice(0, 120) + '...' : match[0]
          });
        } else {
          missingClauses.push({
            id: rule.id,
            clauseName: rule.clauseName,
            criticality: rule.criticality,
            description: rule.description,
            missingMessage: rule.missingMessage
          });
        }
      }
    }

    const totalRules = framework.rules.length;
    const passedCount = detectedClauses.length;
    const failedCount = missingClauses.length;
    const score = totalRules > 0 ? Math.round((passedCount / totalRules) * 100) : 100;

    totalScoreSum += score;

    frameworkResults.push({
      frameworkId: framework.id,
      frameworkName: framework.name,
      description: framework.description,
      category: framework.category,
      score,
      totalRules,
      passedCount,
      failedCount,
      detectedClauses,
      missingClauses
    });
  }

  const overallScore = frameworkResults.length > 0
    ? Math.round(totalScoreSum / frameworkResults.length)
    : 100;

  return {
    overallScore,
    frameworksScannedCount: frameworkResults.length,
    frameworkResults,
    scannedTextLength: text.length,
    timestamp: new Date().toISOString()
  };
}
