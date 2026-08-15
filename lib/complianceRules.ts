export interface ComplianceRule {
  id: string;
  clauseName: string;
  regexPattern: RegExp;
  criticality: 'High' | 'Medium' | 'Low';
  missingMessage: string;
  isNegativeRule?: boolean; // If true, finding a match indicates a violation/failure
}

export interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  rules: ComplianceRule[];
}

export const COMPLIANCE_FRAMEWORKS: Record<string, ComplianceFramework> = {
  GDPR: {
    id: 'GDPR',
    name: 'GDPR (EU General Data Protection Regulation)',
    description: 'Mandatory EU privacy framework enforcing data subject rights, lawful processing, and DPO requirements.',
    rules: [
      {
        id: 'gdpr-erasure',
        clauseName: 'Right to Erasure / Right to be Forgotten',
        regexPattern: /right to erasure|be forgotten|delete my data|request deletion/i,
        criticality: 'High',
        missingMessage: 'Missing explicit Right to Erasure / Right to be Forgotten clause.'
      },
      {
        id: 'gdpr-dpo',
        clauseName: 'Data Protection Officer (DPO) Contact',
        regexPattern: /data protection officer|DPO|privacy officer|dpo@/i,
        criticality: 'High',
        missingMessage: 'Missing Data Protection Officer (DPO) contact information or designation.'
      },
      {
        id: 'gdpr-lawful-basis',
        clauseName: 'Lawful Basis for Data Processing',
        regexPattern: /lawful basis|legitimate interest|legal basis|consent for processing/i,
        criticality: 'High',
        missingMessage: 'Missing explicit declaration of Lawful Basis for personal data processing.'
      },
      {
        id: 'gdpr-supervisory',
        clauseName: 'Supervisory Authority Complaint Right',
        regexPattern: /supervisory authority|data protection authority|lodge a complaint|DPA/i,
        criticality: 'Medium',
        missingMessage: 'Missing clause informing users of their right to lodge complaints with a Supervisory Authority.'
      }
    ]
  },

  HIPAA: {
    id: 'HIPAA',
    name: 'HIPAA (Health Insurance Portability Act)',
    description: 'US healthcare data standard protecting Protected Health Information (PHI) and requiring BAA safeguards.',
    rules: [
      {
        id: 'hipaa-phi',
        clauseName: 'Protected Health Information (PHI) Safeguards',
        regexPattern: /protected health information|PHI|health records|individually identifiable health/i,
        criticality: 'High',
        missingMessage: 'Missing explicit Protected Health Information (PHI) security definitions.'
      },
      {
        id: 'hipaa-baa',
        clauseName: 'Business Associate Agreement (BAA) Requirement',
        regexPattern: /business associate agreement|BAA|business associate/i,
        criticality: 'High',
        missingMessage: 'Missing Business Associate Agreement (BAA) compliance declaration.'
      },
      {
        id: 'hipaa-breach-notification',
        clauseName: '60-Day Breach Notification Window',
        regexPattern: /60 days|breach notification|notification of breach|notify within 60/i,
        criticality: 'High',
        missingMessage: 'Missing 60-day mandatory breach notification protocol requirement.'
      },
      {
        id: 'hipaa-admin-safeguards',
        clauseName: 'Administrative & Technical Safeguards',
        regexPattern: /administrative safeguards|technical safeguards|physical safeguards|access controls/i,
        criticality: 'Medium',
        missingMessage: 'Missing Administrative & Technical Security Safeguards specification.'
      }
    ]
  },

  CCPA: {
    id: 'CCPA',
    name: 'CCPA / CPRA (California Consumer Privacy)',
    description: 'California privacy law granting rights to opt-out of data selling, access records, and request deletion.',
    rules: [
      {
        id: 'ccpa-do-not-sell',
        clauseName: 'Do Not Sell or Share My Personal Information',
        regexPattern: /do not sell or share|opt-out of sale|do not sell my personal|opt out of sharing/i,
        criticality: 'High',
        missingMessage: 'Missing mandatory "Do Not Sell or Share My Personal Information" opt-out clause.'
      },
      {
        id: 'ccpa-california-resident',
        clauseName: 'California Resident Notice & Consumer Rights',
        regexPattern: /california resident|california consumer|shine the light|california privacy rights/i,
        criticality: 'High',
        missingMessage: 'Missing specific California Consumer Rights declaration notice.'
      },
      {
        id: 'ccpa-12month-lookback',
        clauseName: '12-Month Data Access Lookback Period',
        regexPattern: /12-month lookback|past 12 months|preceding 12 months|categories of personal information collected/i,
        criticality: 'Medium',
        missingMessage: 'Missing disclosure of personal data categories collected in the preceding 12 months.'
      }
    ]
  },

  SOC2: {
    id: 'SOC2',
    name: 'SOC 2 Type II (Trust Services Criteria)',
    description: 'Security, Availability, Confidentiality, and Processing Integrity standards for cloud providers.',
    rules: [
      {
        id: 'soc2-tsc',
        clauseName: 'Trust Services Criteria Audit Alignment',
        regexPattern: /trust services criteria|AICPA|security criteria|SOC 2|SOC2/i,
        criticality: 'High',
        missingMessage: 'Missing alignment reference to AICPA Trust Services Criteria.'
      },
      {
        id: 'soc2-integrity',
        clauseName: 'Processing Integrity & System Monitoring',
        regexPattern: /processing integrity|system availability|data accuracy|audit logs|continuous monitoring/i,
        criticality: 'High',
        missingMessage: 'Missing Processing Integrity & Continuous System Audit controls.'
      },
      {
        id: 'soc2-incident-response',
        clauseName: 'Incident Response Plan',
        regexPattern: /incident response plan|disaster recovery|business continuity|security incident procedure/i,
        criticality: 'Medium',
        missingMessage: 'Missing formal Incident Response & Business Continuity Plan declaration.'
      }
    ]
  },

  PCIDSS: {
    id: 'PCIDSS',
    name: 'PCI-DSS v4.0 (Payment Card Industry)',
    description: 'Global security standard for handling credit card data, transit encryption, and CVV storage prohibitions.',
    rules: [
      {
        id: 'pci-cardholder-data',
        clauseName: 'Cardholder Data Environment (CDE) Security',
        regexPattern: /cardholder data|payment card info|CDE|credit card data|PCI-DSS/i,
        criticality: 'High',
        missingMessage: 'Missing Cardholder Data Environment (CDE) protection policy.'
      },
      {
        id: 'pci-encryption-transit',
        clauseName: 'Encryption in Transit (TLS 1.2+ / HTTPS)',
        regexPattern: /encryption in transit|TLS|HTTPS|strong cryptography|encrypted transmission/i,
        criticality: 'High',
        missingMessage: 'Missing mandatory Encryption in Transit (TLS/HTTPS) requirement.'
      },
      {
        id: 'pci-no-cvv-storage',
        clauseName: 'Strict Prohibition on CVV / PIN Storage',
        regexPattern: /store CVV|store PIN|retain CVV2|save security code|store card verification/i,
        criticality: 'High',
        isNegativeRule: true,
        missingMessage: 'Potential Security Violation: Document mentions storing sensitive CVV/PIN data!'
      }
    ]
  }
};
