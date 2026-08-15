import type { Metadata } from 'next';
import Link from 'next/link';
import { UniversalScanner } from '@/components/UniversalScanner';
import { Header } from '@/components/Header';
import { ShieldCheck, ArrowLeft, CheckCircle2, Lock, FileText, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'GDPR Compliance Checker & Privacy Policy Auditor | TermsScanner',
  description: '100% Offline GDPR Compliance Auditor. Instantly scan privacy policies for Article 13/14 requirements, DPO designations, and right to erasure clauses.',
  keywords: [
    'GDPR compliance checker',
    'GDPR policy auditor',
    'EU privacy policy checker',
    'right to erasure audit',
    'GDPR Article 13 checklist'
  ]
};

export default function GDPRCheckerPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between">
      <Header />

      <main className="mb-auto py-8">
        
        {/* Navigation Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 mb-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-400" />
            <span>Back to All Auditing Tools</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3 mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-emerald-950/80 border border-emerald-800/60 rounded-full text-xs font-bold text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>EU General Data Protection Regulation (GDPR)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            GDPR Compliance Checker & Policy Auditor
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Audit privacy policies and vendor contracts against EU GDPR Articles 6, 13, 14, 17, and 37. 100% Client-Side.
          </p>
        </div>

        {/* Universal Scanner Configured for GDPR */}
        <UniversalScanner
          defaultMode="regulatory"
          defaultFrameworks={['gdpr']}
        />

        {/* Static SEO Article & Guide Section (300-500 words) */}
        <section className="max-w-4xl mx-auto px-4 my-12 space-y-8">
          <div className="p-8 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-6 text-sm text-slate-300 leading-relaxed">
            
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span>Essential GDPR Compliance Checklist (Articles 13 & 14)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Understanding mandatory disclosures required under European data protection laws.
              </p>
            </div>

            <p>
              The European Union General Data Protection Regulation (GDPR) enforces strict compliance rules for any business handling personal data of EU residents. Failing to disclose mandatory privacy notices can result in fines up to €20 million or 4% of global annual turnover under Article 83.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1. Right to Erasure (Article 17)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Privacy policies must explicitly inform users of their &quot;Right to be Forgotten&quot; and outline clear instructions for submitting deletion requests.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>2. DPO Contact Designation (Article 37)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Organizations processing large-scale sensitive data must designate a Data Protection Officer and list their direct contact email.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3. Lawful Basis Specification (Article 6)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Contracts must clearly state the lawful ground for processing (e.g. explicit consent, legal obligation, or legitimate interest).
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>4. Supervisory Authority Complaint Right (Article 77)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Policies must explicitly notify users of their statutory right to lodge complaints with an official Data Protection Authority (DPA).
                </p>
              </div>
            </div>

            {/* FAQs */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-purple-400" />
                <span>Frequently Asked Questions (GDPR)</span>
              </h3>

              <div className="space-y-3">
                <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-1">
                  <h4 className="font-bold text-white text-xs">Is this GDPR checker 100% private and confidential?</h4>
                  <p className="text-xs text-slate-400">
                    Yes. All document regex scanning runs 100% locally inside your browser memory. Zero contract text or uploaded PDF data is ever transmitted to our servers.
                  </p>
                </div>

                <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-1">
                  <h4 className="font-bold text-white text-xs">Does an automated scan constitute certified legal compliance?</h4>
                  <p className="text-xs text-slate-400">
                    No. TermsScanner provides preliminary heuristic screening. Formal legal certification requires review by a qualified EU data protection lawyer.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
