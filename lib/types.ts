export type RiskLevel = 'High' | 'Medium' | 'Low';

export interface RiskFinding {
  id?: string;
  riskLevel: RiskLevel;
  quote: string;
  explanation: string;
  suggestion: string;
  category?: string;
}

export interface AnalyzeRequestPayload {
  type: 'url' | 'text';
  content: string;
  compareWithHistory?: boolean;
}

export interface AnalyzeResponsePayload {
  success: boolean;
  findings: RiskFinding[];
  sourceType: 'url' | 'text' | 'pdf';
  rawTextLength: number;
  extractedTitle?: string;
  summary?: {
    totalClauses: number;
    highRiskCount: number;
    mediumRiskCount: number;
    lowRiskCount: number;
    overallRiskScore: number; // 0 to 100
  };
  error?: string;
}

export interface TimeTravelRequestPayload {
  url: string;
}

export interface TimeTravelResponsePayload {
  success: boolean;
  available: boolean;
  snapshotDate?: string;
  snapshotUrl?: string;
  historicalText?: string;
  error?: string;
  diffSummary?: {
    addedClauses: number;
    removedClauses: number;
    erosionScore: number;
  };
}

export interface SampleDoc {
  id: string;
  title: string;
  type: 'contract' | 'nda' | 'privacy';
  description: string;
  text: string;
  url?: string;
}
