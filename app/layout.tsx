import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://termsscanner.in"),
  title: "Terms Scanner – Free AI & Offline Terms of Service Analyzer",
  description: "Analyze Terms of Service, Privacy Policies, and user agreements instantly using AI and fast offline keyword scanning. Spot sneaky clauses, auto-renewals, and privacy risks.",
  keywords: [
    "terms scanner", 
    "offline terms scanner", 
    "free TOS analyzer", 
    "privacy policy scanner", 
    "keyword red flag detector", 
    "client-side contract analyzer", 
    "AI terms of service summarizer", 
    "scan terms and conditions online"
  ],
  alternates: {
    canonical: "https://termsscanner.in",
  },
  authors: [{ name: "Terms Scanner AI" }],
  openGraph: {
    title: "Terms Scanner – Free AI & Offline Terms of Service Analyzer",
    description: "Fast, private TOS and privacy policy analyzer using AI and offline keyword detection.",
    url: "https://termsscanner.in",
    siteName: "Terms Scanner",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms Scanner – Free AI & Offline Terms of Service Analyzer",
    description: "Analyze Terms of Service and Privacy Policies using AI and offline keyword detection.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google62ce07a5a56199e5",
  },
  other: {
    "google-adsense-account": "ca-pub-5058901049330069",
    "google-site-verification": "google62ce07a5a56199e5"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// JSON-LD Structured Data for SoftwareApplication & FAQPage
const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Terms Scanner",
  "operatingSystem": "Any (Web Browser)",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Analyze Terms of Service, Privacy Policies, and user agreements instantly using AI and fast offline keyword scanning. Spot sneaky clauses, auto-renewals, and privacy risks.",
  "featureList": "AI Deep Analysis, Instant Offline Regex/Keyword Detection, Zero-Data Retention Privacy Mode"
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does the offline keyword scanner work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The offline keyword scanner uses 100% client-side JavaScript regular expressions (regex) directly in your browser. No text is transmitted to any external server, guaranteeing 100% data privacy and zero latency."
      }
    },
    {
      "@type": "Question",
      "name": "When should I use AI analysis vs. offline keyword search?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use the Instant Offline Keyword Scanner for instant, confidential checks of regulatory compliance or common predatory patterns. Use the Deep AI Scan when you want context-aware explanations, counter-proposals, and nuanced legal summarization."
      }
    },
    {
      "@type": "Question",
      "name": "Is Terms Scanner free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Terms Scanner is 100% free for individual users, legal researchers, and privacy-conscious consumers."
      }
    },
    {
      "@type": "Question",
      "name": "Is any of my pasted text stored or shared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. When using the Instant Offline Scan, your text never leaves your device memory. When using Deep AI Scan, text is processed ephemerally in memory solely to compute your audit and is never sold or retained."
      }
    },
    {
      "@type": "Question",
      "name": "Can Terms Scanner replace formal legal counsel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Terms Scanner provides automated risk identification and educational analysis. It is not formal legal advice. For binding contracts or litigation, always consult a licensed attorney."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        {/* Google Search Console Meta Verification Tag */}
        <meta name="google-site-verification" content="google62ce07a5a56199e5" />

        {/* Google AdSense Meta Verification */}
        <meta name="google-adsense-account" content="ca-pub-5058901049330069" />

        {/* Google AdSense Standard Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5058901049330069"
          crossOrigin="anonymous"
        />

        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
        <div className="flex-1">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white py-10 text-center text-xs text-slate-500 mt-12 shadow-inner">
          <div className="max-w-5xl mx-auto px-4 space-y-6">
            
            {/* Popular Platform Analyses Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-600 pb-3 border-b border-slate-100">
              <span className="text-slate-400 uppercase tracking-wider text-[10px] block w-full sm:w-auto">Popular Analyses:</span>
              <Link href="/privacy/tiktok" className="hover:text-blue-600 transition-colors">
                TikTok
              </Link>
              <span>•</span>
              <Link href="/privacy/openai-chatgpt" className="hover:text-blue-600 transition-colors">
                ChatGPT
              </Link>
              <span>•</span>
              <Link href="/privacy/instagram" className="hover:text-blue-600 transition-colors">
                Instagram
              </Link>
              <span>•</span>
              <Link href="/privacy/zoom" className="hover:text-blue-600 transition-colors">
                Zoom
              </Link>
              <span>•</span>
              <Link href="/privacy/discord" className="hover:text-blue-600 transition-colors">
                Discord
              </Link>
              <span>•</span>
              <Link href="/privacy/whatsapp" className="hover:text-blue-600 transition-colors">
                WhatsApp
              </Link>
            </div>

            {/* Specialized Auditor Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-600 pb-3 border-b border-slate-100">
              <span className="text-slate-400 uppercase tracking-wider text-[10px] block w-full sm:w-auto">Compliance Auditors:</span>
              <Link href="/gdpr-checker" className="hover:text-emerald-600 transition-colors">
                GDPR Checker
              </Link>
              <span>•</span>
              <Link href="/hipaa-audit" className="hover:text-blue-600 transition-colors">
                HIPAA BAA Audit
              </Link>
              <span>•</span>
              <Link href="/ccpa-compliance" className="hover:text-amber-600 transition-colors">
                CCPA / CPRA Auditor
              </Link>
              <span>•</span>
              <Link href="/soc2-evaluator" className="hover:text-purple-600 transition-colors">
                SOC 2 Evaluator
              </Link>
            </div>

            {/* Standard Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 font-bold text-slate-600">
              <Link href="/privacy-policy" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms-of-service" className="hover:text-blue-600 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/about" className="hover:text-blue-600 transition-colors">
                About Us
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>

            {/* Prominent Mandatory Legal Disclaimer */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-4xl mx-auto text-left text-[11px] text-slate-600 leading-relaxed space-y-1">
              <p className="font-semibold text-slate-700">
                Disclaimer: Terms Scanner provides automated heuristic and rule-based compliance analysis for informational purposes only. It does not constitute formal legal advice, auditing certification, or an attorney-client relationship. We accept no liability for regulatory penalties or omissions. Consult a qualified attorney for legal compliance.
              </p>
            </div>

            <p>© {new Date().getFullYear()} Terms Scanner. All rights reserved.</p>

          </div>
        </footer>
      </body>
    </html>
  );
}
