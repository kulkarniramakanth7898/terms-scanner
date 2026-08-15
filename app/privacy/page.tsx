import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Eye, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | TermsScanner',
  description: 'Learn how TermsScanner protects your privacy with client-side PDF parsing and secure data handling.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400" />
            <span>Back to TermsScanner</span>
          </Link>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-white tracking-tight">TermsScanner</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          
          <div>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-950/80 border border-blue-800/60 rounded-full text-xs font-semibold text-blue-300 mb-4">
              <Lock className="w-3.5 h-3.5" />
              <span>Data Protection & Privacy</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              Last Updated: August 12, 2026
            </p>
          </div>

          <hr className="border-slate-800" />

          {/* Policy Sections */}
          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">1. Introduction</h2>
              <p>
                Welcome to <strong>TermsScanner</strong> (accessible via{' '}
                <a href="https://termsscanner.in" className="text-blue-400 hover:underline">
                  https://termsscanner.in
                </a>
                ). Your privacy and document confidentiality are our highest priorities. This Privacy Policy outlines how we collect, use, and safeguard information when you use our AI-powered legal audit services.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">2. Client-Side PDF Parsing & Document Privacy</h2>
              <p>
                We prioritize zero-retention data processing. When you upload a PDF file for audit, text extraction occurs <strong>100% client-side inside your browser</strong> using web assembly and Web Workers. Your original PDF files are never uploaded to or stored on our servers.
              </p>
              <p>
                For URL scans and raw text inputs, the extracted agreement text is processed ephemerally in-memory strictly to perform AI risk analysis and generate counter-proposals. We do not sell, license, or retain your scanned contract contents.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">3. Information We Collect</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
                <li>
                  <strong>Scanned Document Text:</strong> Ephemeral text submitted for AI semantic audit.
                </li>
                <li>
                  <strong>Usage & Analytics Data:</strong> Anonymous telemetry (IP addresses, browser type, referral URLs, page request timestamps) collected to ensure system stability and performance.
                </li>
                <li>
                  <strong>Cookies & Local Storage:</strong> Small session cookies utilized for operational preferences and Google AdSense compliance.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">4. Advertising & Google AdSense</h2>
              <p>
                TermsScanner uses Google AdSense to serve advertisements. Google, as a third-party vendor, uses cookies to serve ads on our site. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our website or other sites on the Internet.
              </p>
              <p>
                You may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Google Ads Settings
                </a>
                .
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">5. Third-Party AI Processors</h2>
              <p>
                To provide AI risk assessments, sanitized contract text excerpts are analyzed via Google Gemini API services under strict privacy standards. No personal identifying information (PII) is transmitted to third parties for independent marketing.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">6. Contact Information</h2>
              <p>
                If you have any questions or concerns regarding this Privacy Policy, please contact our privacy compliance team at{' '}
                <a href="mailto:support@termsscanner.in" className="text-blue-400 hover:underline">
                  support@termsscanner.in
                </a>
                {' '}or via our{' '}
                <Link href="/contact" className="text-blue-400 hover:underline">
                  Contact Page
                </Link>.
              </p>
            </section>

          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} TermsScanner. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/terms" className="hover:text-slate-300">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-slate-300">
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
