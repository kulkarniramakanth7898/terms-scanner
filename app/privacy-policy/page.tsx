import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | TermsScanner',
  description: 'Privacy Policy detailing 100% offline client-side document security, Google AdSense cookies, and DoubleClick DART disclosures.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>Back to TermsScanner</span>
          </Link>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span className="font-extrabold text-slate-900 tracking-tight">TermsScanner</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
          
          <div>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-800 mb-4 shadow-sm">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Data Protection & AdSense Compliance</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-2 font-mono">
              Last Updated: August 15, 2026
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* Zero Data Storage Highlight Box */}
          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start space-x-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-emerald-950 font-black uppercase tracking-wider mb-1">
                Zero Server Data Storage & 100% Client-Side Scanning Guarantee
              </strong>
              <span>
                At TermsScanner, your document confidentiality is paramount. <strong>Uploaded documents, PDF files, and pasted text are never stored, saved, or transmitted to our backend servers.</strong> Text extraction and compliance regex scanning execute 100% locally inside your web browser. Zero contract data leaves your device during offline scans.
              </span>
            </div>
          </div>

          {/* Detailed Policy Sections */}
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            
            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">1. Introduction</h2>
              <p>
                Welcome to <strong>TermsScanner</strong> (accessible via{' '}
                <a href="https://termsscanner.in" className="text-blue-600 font-bold hover:underline">
                  https://termsscanner.in
                </a>
                ). This Privacy Policy explains how we collect, handle, and safeguard user data, alongside our third-party advertising cookie disclosures.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">2. Offline Document Auditing & PDF Security</h2>
              <p>
                We prioritize zero-retention data privacy. PDF document parsing is powered by client-side Web Workers using <code className="text-blue-700 bg-slate-100 px-1.5 py-0.5 rounded font-mono border border-slate-200">pdfjs-dist</code>. All regex compliance rules (GDPR, HIPAA, CCPA, SOC 2, PCI-DSS) run strictly in local browser JavaScript. We do not store, index, or sell your documents or contract text.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">3. Information We Collect Automatically</h2>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-2">
                <li>
                  <strong>Anonymous Technical Telemetry:</strong> Standard web server logs including anonymized IP addresses, browser user-agent strings, referral pages, and access timestamps.
                </li>
                <li>
                  <strong>Local Storage Preferences:</strong> Session state saved locally in your browser (e.g. selected scan mode or UI theme).
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">4. Google AdSense & DoubleClick DART Cookies</h2>
              <p>
                TermsScanner partners with <strong>Google AdSense</strong> to display advertisements. Google, as a third-party advertising vendor, uses cookies to serve ads on our site.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-2">
                <li>
                  Google&apos;s use of the <strong>DoubleClick DART cookie</strong> enables it and its partners to serve ads to users based on their visit to TermsScanner and/or other sites on the Internet.
                </li>
                <li>
                  Users may opt out of the use of DART cookies for interest-based advertising by visiting the{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-bold"
                  >
                    Google Ad and Content Network Privacy Policy
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">5. Third-Party Advertising Partners</h2>
              <p>
                Third-party ad servers or ad networks use technology in their respective advertisements and links that appear on TermsScanner, sent directly to your browser. They automatically receive your IP address when this occurs. These technologies (such as cookies, JavaScript, or Web Beacons) are used to measure advertising effectiveness and personalize ad content.
              </p>
              <p>
                TermsScanner has no access to or control over cookies used by third-party advertisers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">6. Contact Information</h2>
              <p>
                For questions or inquiries regarding this Privacy Policy or data protection, contact our privacy compliance team at{' '}
                <a href="mailto:support@termsscanner.in" className="text-blue-600 hover:underline font-mono font-bold">
                  support@termsscanner.in
                </a>.
              </p>
            </section>

          </div>

          {/* Footer Links */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-3">
            <p>© {new Date().getFullYear()} TermsScanner. All rights reserved.</p>
            <div className="flex space-x-4 font-bold">
              <Link href="/terms-of-service" className="hover:text-blue-600">
                Terms of Service
              </Link>
              <Link href="/about" className="hover:text-blue-600">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-blue-600">
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
