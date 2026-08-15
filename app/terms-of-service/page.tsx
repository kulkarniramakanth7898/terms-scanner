import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Scale, AlertTriangle, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | TermsScanner',
  description: 'Terms of Service, limitation of liability, and legal disclaimer for TermsScanner AI Auditor.',
};

export default function TermsOfServicePage() {
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
              <Scale className="w-3.5 h-3.5" />
              <span>Legal Terms & User Agreement</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              Last Updated: August 15, 2026
            </p>
          </div>

          <hr className="border-slate-800" />

          {/* Prominent Mandatory Disclaimer Banner */}
          <div className="p-5 bg-amber-950/40 border border-amber-800/80 rounded-2xl flex items-start space-x-3 text-xs text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-300 font-bold uppercase tracking-wider mb-1">
                Mandatory Legal Disclaimer & Attorney-Client Notice
              </strong>
              <span>
                TermsScanner provides preliminary, automated compliance analysis for informational purposes only. It does not constitute legal advice and does not create an attorney-client relationship. We assume no responsibility or liability for inaccuracies, omissions, or legal damages arising from the use of this tool. Always consult a certified attorney for official compliance verification.
              </span>
            </div>
          </div>

          {/* Detailed Clauses */}
          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>1. Acceptance of Terms</span>
              </h2>
              <p>
                By accessing or using TermsScanner (accessible via{' '}
                <a href="https://termsscanner.in" className="text-blue-400 hover:underline">
                  https://termsscanner.in
                </a>
                ), you agree to be bound by these Terms of Service. If you do not agree to all terms outlined herein, you must immediately cease using the platform.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">2. Scope of Service & Automated Rule Engine</h2>
              <p>
                TermsScanner provides automated document scanning, regex-based compliance checks (GDPR, HIPAA, CCPA, SOC 2, PCI-DSS), and AI-driven semantic clause risk detection. The user acknowledges that automated tools may produce false positives or false negatives, and agrees that all reports are purely informational.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">3. User Responsibility & Risk Assumption</h2>
              <p>
                The user assumes <strong>100% of all risks</strong> associated with using, interpreting, or relying upon generated audit reports, risk scores, or counter-proposal suggestions. You remain solely responsible for validating contract terms with qualified legal counsel prior to executing any binding agreement.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">4. Absolute Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, TermsScanner, its operators, employees, and affiliates shall not be liable for any direct, indirect, incidental, punitive, special, or consequential damages, financial losses, regulatory fines, or legal disputes arising from or connected to your reliance on this service.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">5. No Warranty ("As-Is" Basis)</h2>
              <p>
                TermsScanner is provided on an <strong>"AS IS" and "AS AVAILABLE" basis</strong> without warranties of any kind, whether express, implied, or statutory, including warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">6. Intellectual Property & Acceptable Use</h2>
              <p>
                All brand assets, custom rule dictionaries, UI designs, and software code are the intellectual property of TermsScanner. Users agree not to attempt denial-of-service attacks, reverse-engineer proprietary algorithms, or misrepresent automated AI output as certified legal opinion.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">7. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law principles. Any legal proceedings shall be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka, India.
              </p>
            </section>

          </div>

          {/* Footer Links */}
          <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} TermsScanner. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/privacy-policy" className="hover:text-slate-300">
                Privacy Policy
              </Link>
              <Link href="/about" className="hover:text-slate-300">
                About Us
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
