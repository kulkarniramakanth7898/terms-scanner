import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    "policy erosion tracker"
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
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
