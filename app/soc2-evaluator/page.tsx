import type { Metadata } from 'next';
import Link from 'next/link';
import { UniversalScanner } from '@/components/UniversalScanner';
import { Header } from '@/components/Header';
import { ShieldCheck, ArrowLeft, CheckCircle2, Lock, FileText, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SOC 2 Type II Agreement Auditor & Vendor Evaluator | TermsScanner',
  description: '100% Offline SOC 2 Type II Agreement Auditor. Audit SaaS contracts and vendor agreements for AICPA Trust Services Criteria, Processing Integrity, and Incident Response.',
  keywords: [
    'SOC 2 auditor',
    'SOC 2 agreement checker',
    'SaaS vendor compliance',
    'Trust Services Criteria audit',
    'vendor security evaluator'
  ]
};

export default function SOC2EvaluatorPage() {
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
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-purple-950/80 border border-purple-800/60 rounded-full text-xs font-bold text-purple-300">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>AICPA SOC 2 Type II Trust Services Criteria</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            SOC 2 Agreement Auditor & Evaluator
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Audit cloud SaaS contracts and MSA vendor agreements against AICPA Security, Availability, Processing Integrity, and Confidentiality criteria.
          </p>
        </div>

        {/* Universal Scanner Configured for SOC 2 */}
        <UniversalScanner
          defaultMode="regulatory"
          defaultFrameworks={['soc2']}
        />

        {/* Static SEO Article & Guide Section */}
        <section className="max-w-4xl mx-auto px-4 my-12 space-y-8">
          <div className="p-8 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-6 text-sm text-slate-300 leading-relaxed">
            
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span>SaaS Vendor SOC 2 Contract Evaluation Guide</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Essential security and processing integrity terms required in enterprise Master Services Agreements (MSAs).
              </p>
            </div>

            <p>
              SOC 2 (Service Organization Control 2) audits evaluate a vendor&apos;s internal security controls against AICPA Trust Services Criteria. When procuring B2B cloud software, enterprise legal teams must ensure vendor agreements incorporate mandatory SOC 2 safeguards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1. Trust Services Criteria (TSC) Reference</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Vendor agreements should explicitly reference ongoing alignment with AICPA Security and Confidentiality criteria.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>2. Processing Integrity & Continuous Audit</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Contracts must mandate system availability monitoring, processing data integrity, and annual SOC 2 Type II audit report delivery.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3. Confidentiality Commitments</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Strict safeguards protecting confidential information from unauthorized collection, use, or disclosure.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>4. Incident Response & Disaster Recovery</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Formal procedures detailing security incident management, customer notification, and business continuity plans.
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
