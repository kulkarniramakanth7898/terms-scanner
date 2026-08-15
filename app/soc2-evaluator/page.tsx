import type { Metadata } from 'next';
import Link from 'next/link';
import { UniversalScanner } from '@/components/UniversalScanner';
import { Header } from '@/components/Header';
import { ShieldCheck, ArrowLeft, CheckCircle2, FileText } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <Header />

      <main className="mb-auto py-8">
        
        {/* Navigation Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 mb-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-extrabold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
            <span>Back to All Auditing Tools</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3 mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-purple-50 border border-purple-200 rounded-full text-xs font-bold text-purple-800 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>AICPA SOC 2 Type II Trust Services Criteria</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            SOC 2 Agreement Auditor & Evaluator
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto font-medium">
            Audit cloud SaaS contracts and MSA vendor agreements against AICPA Security, Availability, Processing Integrity, and Confidentiality criteria.
          </p>
        </div>

        {/* Universal Scanner Configured for SOC 2 */}
        <UniversalScanner
          defaultEngine="instant"
          defaultScanType="regulatory"
          defaultFrameworks={['soc2']}
        />

        {/* Static SEO Article & Guide Section */}
        <section className="max-w-4xl mx-auto px-4 my-12 space-y-8">
          <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-lg space-y-6 text-sm text-slate-700 leading-relaxed">
            
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>SaaS Vendor SOC 2 Contract Evaluation Guide</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Essential security and processing integrity terms required in enterprise Master Services Agreements (MSAs).
              </p>
            </div>

            <p>
              SOC 2 (Service Organization Control 2) audits evaluate a vendor&apos;s internal security controls against AICPA Trust Services Criteria. When procuring B2B cloud software, enterprise legal teams must ensure vendor agreements incorporate mandatory SOC 2 safeguards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-extrabold text-slate-900 text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1. Trust Services Criteria (TSC) Reference</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Vendor agreements should explicitly reference ongoing alignment with AICPA Security and Confidentiality criteria.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-extrabold text-slate-900 text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2. Processing Integrity & Continuous Audit</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Contracts must mandate system availability monitoring, processing data integrity, and annual SOC 2 Type II audit report delivery.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-extrabold text-slate-900 text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3. Confidentiality Commitments</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Strict safeguards protecting confidential information from unauthorized collection, use, or disclosure.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-extrabold text-slate-900 text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>4. Incident Response & Disaster Recovery</span>
                </h3>
                <p className="text-xs text-slate-600">
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
