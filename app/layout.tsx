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
  description: "Instantly detect hidden risks in contracts, NDAs, and privacy policies using AI. Get plain-English explanations, counter-proposals, and Wayback time-travel diffs.",
  keywords: [
    "TermsScanner",
    "privacy auditor",
    "legal AI",
    "contract risk detector",
    "NDA scanner",
    "terms of service auditor",
    "PDF legal scanner",
    "privacy policy risk",
    "policy erosion tracker",
    "GDPR compliance scanner",
    "HIPAA compliance audit",
    "CCPA compliance check"
  ],
  authors: [{ name: "TermsScanner AI" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://termsscanner.in",
    siteName: "TermsScanner",
    title: "TermsScanner: Legal & Privacy Auditor | AI Contract & Policy Scanner",
    description: "Instantly detect hidden risks in contracts, NDAs, and privacy policies using AI. Get plain-English explanations, counter-proposals, and Wayback time-travel diffs.",
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
      <head>
        {/* Google AdSense Meta Verification */}
        <meta name="google-adsense-account" content="ca-pub-5058901049330069" />

        {/* Google AdSense Standard Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5058901049330069"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between">
        <div className="flex-1">
          {children}
        </div>

        {/* Global Task 4 Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-10 text-center text-xs text-slate-500 mt-12">
          <div className="max-w-5xl mx-auto px-4 space-y-6">
            
            {/* Nav Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 font-semibold text-slate-400">
              <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/about" className="hover:text-blue-400 transition-colors">
                About Us
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </div>

            {/* Prominent Mandatory Legal Disclaimer */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl max-w-4xl mx-auto text-left text-[11px] text-slate-400 leading-relaxed space-y-1">
              <p className="font-semibold text-slate-300">
                Disclaimer: TermsScanner provides preliminary, automated compliance analysis for informational purposes only. It does not constitute legal advice and does not create an attorney-client relationship. We assume no responsibility or liability for inaccuracies, omissions, or legal damages arising from the use of this tool. Always consult a certified attorney for official compliance verification.
              </p>
            </div>

            <p>© {new Date().getFullYear()} TermsScanner. All rights reserved.</p>

          </div>
        </footer>
      </body>
    </html>
  );
}
