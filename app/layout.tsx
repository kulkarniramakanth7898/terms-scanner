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
  title: {
    default: "TermsScanner: Legal & Privacy Auditor | AI Contract & Policy Scanner",
    template: "%s | TermsScanner",
  },
  description: "Instantly detect hidden risks in contracts, NDAs, and privacy policies using AI. 100% Client-Side GDPR, HIPAA, CCPA, SOC 2 & PCI-DSS compliance auditor.",
  keywords: [
    "TermsScanner",
    "privacy auditor",
    "legal AI",
    "contract risk detector",
    "NDA scanner",
    "terms of service auditor",
    "PDF legal scanner",
    "privacy policy risk",
    "GDPR compliance checker",
    "HIPAA compliance audit",
    "CCPA compliance check",
    "SOC 2 evaluator",
    "PCI-DSS security audit",
    "DPDP Act India auditor"
  ],
  authors: [{ name: "TermsScanner AI" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://termsscanner.in",
    siteName: "TermsScanner",
    title: "TermsScanner: Legal & Privacy Auditor | AI Contract & Policy Scanner",
    description: "Instantly detect hidden risks in contracts, NDAs, and privacy policies using AI. 100% Client-Side compliance auditing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TermsScanner: Legal & Privacy Auditor | AI Contract & Policy Scanner",
    description: "Instantly detect hidden risks in contracts, NDAs, and privacy policies using AI.",
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  other: {
    "google-adsense-account": "ca-pub-5058901049330069"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
        )}

        {/* Google AdSense Meta Verification */}
        <meta name="google-adsense-account" content="ca-pub-5058901049330069" />

        {/* Google AdSense Standard Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5058901049330069"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
        <div className="flex-1">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white py-10 text-center text-xs text-slate-500 mt-12 shadow-inner">
          <div className="max-w-5xl mx-auto px-4 space-y-6">
            
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
                Disclaimer: TermsScanner provides automated heuristic and rule-based compliance analysis for informational purposes only. It does not constitute formal legal advice, auditing certification, or an attorney-client relationship. We accept no liability for regulatory penalties or omissions. Consult a qualified attorney for legal compliance.
              </p>
            </div>

            <p>© {new Date().getFullYear()} TermsScanner. All rights reserved.</p>

          </div>
        </footer>
      </body>
    </html>
  );
}
