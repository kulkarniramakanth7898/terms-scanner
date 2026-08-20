export interface KeyRedFlag {
  title: string;
  detail: string;
}

export interface ServiceAnalysis {
  slug: string;
  name: string;
  category: string;
  riskScore: number; // out of 10 (higher means higher risk)
  lastUpdated: string;
  summary: string;
  keyRedFlags: KeyRedFlag[];
  dataCollected: string[];
}

export const POPULAR_SERVICES: ServiceAnalysis[] = [
  {
    slug: 'tiktok',
    name: 'TikTok',
    category: 'Social Media & Video Sharing',
    riskScore: 8.7,
    lastUpdated: '2026-08-01',
    summary: 'TikTok’s Privacy Policy grants extensive permissions to collect device identifiers, keystroke dynamics, location data, biometric data (faceprints and voiceprints), and cross-site browsing activity for ad profiling.',
    keyRedFlags: [
      {
        title: 'Biometric Identifier Collection',
        detail: 'Permits collecting faceprints and voiceprints from user content without explicit consent where permitted by local law.'
      },
      {
        title: 'Keystroke & Clipboard Tracking',
        detail: 'Monitors keystroke patterns and accesses system clipboard data when the app is active.'
      },
      {
        title: 'Broad Content Licensing',
        detail: 'Users grant a perpetual, royalty-free, worldwide license to use, modify, and monetize uploaded videos and audio.'
      },
      {
        title: 'Cross-App & Cross-Device Data Sharing',
        detail: 'Aggregates browsing habits from third-party websites via tracking pixels and ad integration partners.'
      }
    ],
    dataCollected: [
      'Biometric Faceprints & Voiceprints',
      'Keystroke Dynamics & Timing',
      'System Clipboard Content',
      'Precise GPS Location Data',
      'Device Model, ID & SIM Information',
      'Browsing History via Embedded Webview'
    ]
  },
  {
    slug: 'openai-chatgpt',
    name: 'OpenAI / ChatGPT',
    category: 'Artificial Intelligence & Productivity',
    riskScore: 6.8,
    lastUpdated: '2026-07-15',
    summary: 'OpenAI processes prompts and conversations to train future AI models by default (unless opted out). Shared content may be reviewed by human moderators or exposed in model memory.',
    keyRedFlags: [
      {
        title: 'Default Model Training on User Prompts',
        detail: 'Conversations and uploaded documents are utilized to train future GPT foundation models unless explicit opt-out settings are enabled.'
      },
      {
        title: 'Human Moderator Content Inspection',
        detail: 'Human reviewers may inspect flagged prompts and uploaded files for safety compliance and moderation enforcement.'
      },
      {
        title: 'Third-Party Vendor Access',
        detail: 'Data is transmitted to cloud infrastructure providers and third-party contractors supporting model evaluations.'
      },
      {
        title: 'No Guarantees on Data Output Confidentiality',
        detail: 'Generated text is not guaranteed to be exclusive and similar prompts may yield identical outputs to other users.'
      }
    ],
    dataCollected: [
      'User Prompts & Conversation History',
      'Uploaded Documents & Images',
      'IP Address & Geographic Region',
      'Browser Type, Device & OS Metadata',
      'API Usage Logs & Performance Data'
    ]
  },
  {
    slug: 'instagram',
    name: 'Instagram (Meta)',
    category: 'Social Media & Photo Sharing',
    riskScore: 8.2,
    lastUpdated: '2026-08-10',
    summary: 'As part of Meta, Instagram aggregates user interactions across Instagram, Facebook, WhatsApp, and third-party ad networks to construct detailed behavioral interest profiles.',
    keyRedFlags: [
      {
        title: 'Cross-Platform Meta Data Binding',
        detail: 'Combines Instagram activity with Facebook, WhatsApp, and off-Meta tracking pixels to serve targeted ads.'
      },
      {
        title: 'Sub-Licensing Rights on Photos & Videos',
        detail: 'Grants Meta a non-exclusive, transferable, sub-licensable, royalty-free worldwide license to host and distribute uploaded media.'
      },
      {
        title: 'Facial & Visual Data Processing',
        detail: 'Processes photo contents and video frames for automated object, scene, and user tagging algorithms.'
      },
      {
        title: 'Ad Tracking via Off-Site Pixels',
        detail: 'Tracks purchases and page views on third-party merchant sites using Meta Pixel integration.'
      }
    ],
    dataCollected: [
      'Photos, Videos & Audio Uploads',
      'Direct Messages & Contact Lists',
      'Off-Site Shopping & Browsing History',
      'Precise GPS & Wi-Fi Triangulation',
      'Device Battery, Signal & Storage Metrics'
    ]
  },
  {
    slug: 'zoom',
    name: 'Zoom',
    category: 'Video Conferencing & Enterprise Communication',
    riskScore: 5.9,
    lastUpdated: '2026-06-20',
    summary: 'Zoom collects teleconference metadata, meeting transcripts, and chat logs. While end-to-end encryption is supported, standard cloud recordings and transcriptions process data on cloud servers.',
    keyRedFlags: [
      {
        title: 'Cloud Recording & Automated Transcription Storage',
        detail: 'Meeting transcripts, audio recordings, and chat logs are stored unencrypted on cloud servers unless client-side encryption is enabled.'
      },
      {
        title: 'Meeting Metadata Retention',
        detail: 'Retains participant IP addresses, MAC addresses, meeting duration, and device hardware details indefinitely.'
      },
      {
        title: 'Host Attention Tracking Disclosures',
        detail: 'Allows meeting hosts to view participant attendance status, poll results, and diagnostic analytics.'
      }
    ],
    dataCollected: [
      'Meeting Audio & Video Streams',
      'Transcripts & In-Meeting Chat Logs',
      'Host & Participant IP Addresses',
      'Hardware Model, OS & Network Details',
      'Calendar Invites & Contact Lists'
    ]
  },
  {
    slug: 'discord',
    name: 'Discord',
    category: 'VoIP & Instant Messaging',
    riskScore: 7.1,
    lastUpdated: '2026-07-28',
    summary: 'Discord monitors text messages, voice channels, and server activity for moderation and ad targeting. Messages are not end-to-end encrypted.',
    keyRedFlags: [
      {
        title: 'No End-to-End Encryption',
        detail: 'All text messages, voice chats, and uploaded attachments are accessible by Discord servers for safety scanning.'
      },
      {
        title: 'Game Activity & Installed App Scanning',
        detail: 'Scans running system processes to display rich presence status and target game recommendations.'
      },
      {
        title: 'Indefinite Message Storage',
        detail: 'Deleted messages may remain in system backups and analytical data stores for extended periods.'
      }
    ],
    dataCollected: [
      'Text Messages & Voice Audio Data',
      'Running Computer Software & Games',
      'Connected Accounts (Steam, Twitch, Spotify)',
      'IP Address & Device Identifiers',
      'Friend Lists & Server Interaction Logs'
    ]
  },
  {
    slug: 'whatsapp',
    name: 'WhatsApp (Meta)',
    category: 'Encrypted Messaging',
    riskScore: 6.4,
    lastUpdated: '2026-08-05',
    summary: 'While message contents are end-to-end encrypted via the Signal protocol, WhatsApp shares extensive account metadata, phone numbers, and transaction logs with parent company Meta.',
    keyRedFlags: [
      {
        title: 'Extensive Metadata Sharing with Meta',
        detail: 'Shares phone numbers, profile names, interaction frequency, and device identifiers with Meta companies.'
      },
      {
        title: 'Business Messaging Data Exposure',
        detail: 'Conversations with WhatsApp Business accounts may be stored on third-party servers and used for targeted ads.'
      },
      {
        title: 'Address Book Contact Uploads',
        detail: 'Requires continuous access to your mobile phone contacts to identify registered WhatsApp users.'
      }
    ],
    dataCollected: [
      'Phone Numbers & Contact Address Book',
      'Interaction Timestamps & Frequency',
      'Device Model, Battery & Signal Strength',
      'WhatsApp Business Commerce Logs',
      'IP Address & Mobile Network Provider'
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceAnalysis | undefined {
  return POPULAR_SERVICES.find(service => service.slug === slug);
}
