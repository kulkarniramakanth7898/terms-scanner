export interface ComplianceRule {
  id: string;
  clauseName: string;
  regexPattern: RegExp;
  criticality: 'High' | 'Medium' | 'Low';
  description: string;
  missingMessage: string;
  isNegativeRule?: boolean; // If true, matching regex indicates a compliance violation
}

export interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  category: 'Global' | 'Healthcare' | 'Regional' | 'Security' | 'Finance';
  rules: ComplianceRule[];
}

export const COMPLIANCE_FRAMEWORKS: Record<string, ComplianceFramework> = {
  gdpr: {
    id: 'gdpr',
    name: 'GDPR (EU General Data Protection Regulation)',
    description: 'Mandatory European Union privacy framework protecting data subject rights and enforcing strict data processing principles.',
    category: 'Global',
    rules: [
      {
        id: 'gdpr-erasure',
        clauseName: 'Right to Erasure / Right to be Forgotten',
        regexPattern: /right to erasure|be forgotten|delete my data|request deletion of personal/i,
        criticality: 'High',
        description: 'Mandatory clause permitting data subjects to request permanent erasure of their personal data (Article 17).',
        missingMessage: 'Missing explicit Right to Erasure / Right to be Forgotten clause (GDPR Art. 17).'
      },
      {
        id: 'gdpr-dpo',
        clauseName: 'Data Protection Officer (DPO) Designation',
        regexPattern: /data protection officer|DPO|privacy officer|dpo@/i,
        criticality: 'High',
        description: 'Contact details for the designated Data Protection Officer or Privacy Officer (Article 37).',
        missingMessage: 'Missing Data Protection Officer (DPO) contact details or official privacy designation.'
      },
      {
        id: 'gdpr-lawful-basis',
        clauseName: 'Lawful Basis & Explicit Consent',
        regexPattern: /lawful basis|legitimate interest|legal basis|explicit consent|processing operations/i,
        criticality: 'High',
        description: 'Specification of the lawful basis for processing personal data (Article 6).',
        missingMessage: 'Missing declaration of the Lawful Basis for personal data processing (GDPR Art. 6).'
      },
      {
        id: 'gdpr-supervisory',
        clauseName: 'Supervisory Authority Complaint Right',
        regexPattern: /supervisory authority|data protection authority|lodge a complaint|DPA complaint/i,
        criticality: 'Medium',
        description: 'Informing users of their legal right to lodge a complaint with an official DPA (Article 77).',
        missingMessage: 'Missing notice of the right to lodge a complaint with a Supervisory Authority.'
      },
      {
        id: 'gdpr-retention',
        clauseName: 'Data Retention Limits & Policy',
        regexPattern: /retention period|retain your data|storage limitation|kept for no longer than/i,
        criticality: 'Medium',
        description: 'Specific timeframe or criteria used to determine data storage duration (Article 5(1)(e)).',
        missingMessage: 'Missing explicit Data Retention Period specification.'
      }
    ]
  },

  hipaa: {
    id: 'hipaa',
    name: 'HIPAA Privacy & Security Rule (US Healthcare)',
    description: 'United States federal standard protecting Protected Health Information (PHI) and requiring Business Associate Agreements.',
    category: 'Healthcare',
    rules: [
      {
        id: 'hipaa-phi',
        clauseName: 'Protected Health Information (PHI) Safeguards',
        regexPattern: /protected health information|PHI|medical records|health records|individually identifiable health/i,
        criticality: 'High',
        description: 'Mandatory definitions and technical safeguards surrounding Protected Health Information.',
        missingMessage: 'Missing explicit Protected Health Information (PHI) security definitions.'
      },
      {
        id: 'hipaa-baa',
        clauseName: 'Business Associate Agreement (BAA)',
        regexPattern: /business associate agreement|BAA|business associate contract/i,
        criticality: 'High',
        description: 'Requirement for vendors handling health data to sign a binding Business Associate Agreement.',
        missingMessage: 'Missing Business Associate Agreement (BAA) execution commitment.'
      },
      {
        id: 'hipaa-breach-notification',
        clauseName: '60-Day Mandatory Breach Notification',
        regexPattern: /60 days|breach notification|notification of breach|notify within 60/i,
        criticality: 'High',
        description: 'Mandatory protocol to notify covered entities within 60 days of discovering a data breach.',
        missingMessage: 'Missing 60-day mandatory breach notification protocol requirement.'
      },
      {
        id: 'hipaa-safeguards',
        clauseName: 'Administrative & Technical Safeguards',
        regexPattern: /administrative safeguards|technical safeguards|physical safeguards|access control|audit controls/i,
        criticality: 'Medium',
        description: 'Specification of administrative, physical, and technical safeguards under the Security Rule.',
        missingMessage: 'Missing Administrative & Technical Safeguards clause.'
      },
      {
        id: 'hipaa-phi-destruction',
        clauseName: 'PHI Return or Destruction Upon Termination',
        regexPattern: /return or destroy|destroy all PHI|de-identification|sanitization of health/i,
        criticality: 'Medium',
        description: 'Requirement to return or securely destroy all PHI upon agreement termination.',
        missingMessage: 'Missing mandatory PHI Return or Destruction protocol upon contract termination.'
      }
    ]
  },

  ccpa: {
    id: 'ccpa',
    name: 'CCPA / CPRA (California Consumer Privacy)',
    description: 'California state privacy framework granting consumer rights to opt-out of data selling, limit sensitive info, and request 12-month lookback records.',
    category: 'Regional',
    rules: [
      {
        id: 'ccpa-do-not-sell',
        clauseName: 'Do Not Sell or Share Personal Information',
        regexPattern: /do not sell or share|opt-out of sale|do not sell my personal|opt out of sharing/i,
        criticality: 'High',
        description: 'Mandatory opt-out clause prohibiting the sale or sharing of California consumer data.',
        missingMessage: 'Missing mandatory "Do Not Sell or Share My Personal Information" opt-out link.'
      },
      {
        id: 'ccpa-12month-lookback',
        clauseName: '12-Month Access Lookback Period',
        regexPattern: /12-month lookback|past 12 months|preceding 12 months|categories of personal information/i,
        criticality: 'High',
        description: 'Disclosure of personal information categories collected or disclosed in the preceding 12 months.',
        missingMessage: 'Missing 12-Month Lookback disclosure of collected personal information.'
      },
      {
        id: 'ccpa-limit-sensitive',
        clauseName: 'Right to Limit Use of Sensitive Personal Information',
        regexPattern: /limit the use of sensitive|sensitive personal information|SPI|social security number|precise geolocation/i,
        criticality: 'High',
        description: 'Consumer right to direct businesses to limit the use of sensitive personal information.',
        missingMessage: 'Missing "Right to Limit Use of Sensitive Personal Information" clause.'
      },
      {
        id: 'ccpa-consumer-optout',
        clauseName: 'Non-Discrimination & Consumer Rights Notice',
        regexPattern: /california resident|california consumer|non-discrimination|shine the light/i,
        criticality: 'Medium',
        description: 'Explicit notice that consumers will not receive discriminatory pricing or service for exercising privacy rights.',
        missingMessage: 'Missing California Non-Discrimination Notice & Consumer Rights declaration.'
      }
    ]
  },

  soc2: {
    id: 'soc2',
    name: 'SOC 2 Type II (Trust Services Criteria)',
    description: 'Security, Processing Integrity, Availability, and Confidentiality auditing standard for cloud and SaaS vendors.',
    category: 'Security',
    rules: [
      {
        id: 'soc2-tsc',
        clauseName: 'Trust Services Criteria Audit Alignment',
        regexPattern: /trust services criteria|AICPA|SOC 2|SOC2|security criteria/i,
        criticality: 'High',
        description: 'Formal reference to AICPA Trust Services Criteria (TSC) compliance.',
        missingMessage: 'Missing reference to AICPA Trust Services Criteria alignment.'
      },
      {
        id: 'soc2-integrity',
        clauseName: 'Processing Integrity & Continuous Monitoring',
        regexPattern: /processing integrity|system availability|data accuracy|audit logs|continuous monitoring/i,
        criticality: 'High',
        description: 'Commitments regarding complete, valid, timely, and authorized system processing.',
        missingMessage: 'Missing Processing Integrity & Continuous Monitoring commitments.'
      },
      {
        id: 'soc2-confidentiality',
        clauseName: 'Confidentiality & Data Protection Commitments',
        regexPattern: /confidential information|confidentiality commitments|restricted access|data classification/i,
        criticality: 'High',
        description: 'Safeguards for information designated as confidential from collection through disposal.',
        missingMessage: 'Missing Confidentiality & Data Classification commitments.'
      },
      {
        id: 'soc2-incident-response',
        clauseName: 'Incident Response & Disaster Recovery Procedures',
        regexPattern: /incident response plan|disaster recovery|business continuity|security incident procedure/i,
        criticality: 'Medium',
        description: 'Established incident response procedures to detect, respond to, and recover from security events.',
        missingMessage: 'Missing Incident Response & Disaster Recovery procedure declaration.'
      }
    ]
  },

  'pci-dss': {
    id: 'pci-dss',
    name: 'PCI-DSS v4.0 (Payment Card Industry)',
    description: 'Global technical and operational standard required for merchants and service providers processing credit card data.',
    category: 'Finance',
    rules: [
      {
        id: 'pci-cardholder-data',
        clauseName: 'Cardholder Data Environment (CDE) Security',
        regexPattern: /cardholder data|payment card info|CDE|credit card data|PCI-DSS|PCI DSS/i,
        criticality: 'High',
        description: 'Technical security requirements for storing, processing, or transmitting payment cardholder data.',
        missingMessage: 'Missing Cardholder Data Environment (CDE) security policy declaration.'
      },
      {
        id: 'pci-encryption-transit',
        clauseName: 'Cardholder Encryption in Transit (TLS 1.2+)',
        regexPattern: /encryption in transit|TLS|HTTPS|strong cryptography|encrypted transmission/i,
        criticality: 'High',
        description: 'Requirement to encrypt all cardholder data transmitted across open, public networks.',
        missingMessage: 'Missing mandatory Encryption in Transit (TLS/HTTPS) clause for payment data.'
      },
      {
        id: 'pci-no-cvv-storage',
        clauseName: 'Strict Prohibition on CVV / PIN Storage',
        regexPattern: /store CVV|store PIN|retain CVV2|save security code|store card verification/i,
        criticality: 'High',
        isNegativeRule: true,
        description: 'Prohibition against storing Sensitive Authentication Data (CVV/CVV2/PIN) after authorization.',
        missingMessage: 'CRITICAL SECURITY VIOLATION: Agreement mentions storing prohibited CVV/PIN data!'
      },
      {
        id: 'pci-access-control',
        clauseName: 'Role-Based Access Control & MFA',
        regexPattern: /role-based access|least privilege|multi-factor authentication|MFA|unique ID/i,
        criticality: 'Medium',
        description: 'Restricting access to cardholder data strictly on a business need-to-know basis.',
        missingMessage: 'Missing Role-Based Access Control & MFA requirements for cardholder data.'
      }
    ]
  },

  dpdp: {
    id: 'dpdp',
    name: 'DPDP Act 2023 (Digital Personal Data Protection, India)',
    description: 'India federal data protection framework governing Data Fiduciaries, Data Principal rights, and consent obligations.',
    category: 'Regional',
    rules: [
      {
        id: 'dpdp-fiduciary',
        clauseName: 'Data Fiduciary & Data Protection Board Contact',
        regexPattern: /data fiduciary|data protection officer|dpo|grievance officer|data protection board/i,
        criticality: 'High',
        description: 'Contact details of the designated Data Fiduciary or Grievance Officer under the DPDP Act.',
        missingMessage: 'Missing Data Fiduciary contact details or Grievance Officer designation.'
      },
      {
        id: 'dpdp-consent-notice',
        clauseName: 'Itemized Consent Notice & Withdrawal Right',
        regexPattern: /consent notice|itemized consent|withdraw consent|right to withdraw/i,
        criticality: 'High',
        description: 'Clear, itemized notice accompanying consent requests and simple withdrawal procedures.',
        missingMessage: 'Missing Itemized Consent Notice & Consent Withdrawal procedure clause.'
      },
      {
        id: 'dpdp-grievance',
        clauseName: 'Grievance Redressal Mechanism',
        regexPattern: /grievance redressal|redressal mechanism|file a grievance|grievance officer/i,
        criticality: 'High',
        description: 'Readily available mechanism for Data Principals to register complaints and grievances.',
        missingMessage: 'Missing Grievance Redressal Mechanism specification.'
      },
      {
        id: 'dpdp-parental-consent',
        clauseName: 'Parental Consent for Minors (Children Data)',
        regexPattern: /parental consent|verifiable consent|minor|children data|under 18/i,
        criticality: 'Medium',
        description: 'Requirement to obtain verifiable consent from a parent or legal guardian before processing children personal data.',
        missingMessage: 'Missing Verifiable Parental Consent clause for processing children data.'
      }
    ]
  }
};
