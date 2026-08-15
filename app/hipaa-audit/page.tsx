import type { Metadata } from 'next';
import Link from 'next/link';
import { UniversalScanner } from '@/components/UniversalScanner';
import { Header } from '@/components/Header';
import { ArrowLeft, CheckCircle2, FileText, HelpCircle, Activity } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HIPAA Compliance Auditor & BAA Checker | TermsScanner',
  description: '100% Offline HIPAA Compliance & BAA Auditor. Audit vendor agreements and health privacy policies for PHI safeguards and 60-day breach notifications.',
  keywords: [
    'HIPAA compliance auditor',
    'BAA checker',
    'Business Associate Agreement audit',
    'PHI security compliance',
    'healthcare privacy scanner'
  ]
};

export default function HIPAAAuditPage() {
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
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-800 shadow-sm">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>US Health Insurance Portability and Accountability Act (HIPAA)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            HIPAA Compliance Auditor & BAA Checker
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto font-medium">
            Audit Business Associate Agreements (BAAs) and healthcare vendor contracts for PHI safeguards and breach notification clauses. 100% Offline.
          </p>
        </div>

        {/* Universal Scanner Configured for HIPAA */}
        <UniversalScanner
          defaultEngine="instant"
          defaultScanType="regulatory"
          defaultFrameworks={['hipaa']}
        />

        {/* Static SEO Article & Guide Section */}
        <section className="max-w-4xl mx-auto px-4 my-12 space-y-8">
          <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-lg space-y-6 text-sm text-slate-700 leading-relaxed">
            
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Mandatory HIPAA BAA Compliance Requirements Guide</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Ensuring covered entities and business associates satisfy HHS Security & Privacy Rules.
              </p>
            </div>

            <p>
              Under the HIPAA Privacy and Security Rules, any covered entity sharing Protected Health Information (PHI) with a third-party vendor must execute a binding <strong>Business Associate Agreement (BAA)</strong>. Failure to secure mandatory BAA terms can trigger HHS Office for Civil Rights (OCR) financial penalties exceeding $1.5 million per violation category.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-extrabold text-slate-900 text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1. Explicit PHI Safeguards Definition</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Contracts must clearly define Protected Health Information (PHI) and commit to administrative, technical, and physical security controls.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-extrabold text-slate-900 text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2. 60-Day Mandatory Breach Notification</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Business associates are required by law to notify covered entities without unreasonable delay and no later than 60 days following breach discovery.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-extrabold text-slate-900 text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3. PHI Return or Destruction</span>
                </h3>
                <p className="text-xs text-slate-600">
                  The agreement must stipulate that upon contract termination, all PHI received or created must be securely returned or destroyed.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <h3 className="font-extrabold text-slate-900 text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>4. Subcontractor BAA Flow-Down</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Business associates must ensure any subcontractors handling PHI agree to identical security restrictions.
                </p>
              </div>
            </div>

            {/* FAQs */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-purple-600" />
                <span>Frequently Asked Questions (HIPAA Audit)</span>
              </h3>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <h4 className="font-bold text-slate-900 text-xs">Are uploaded health contracts safe from data leaks?</h4>
                  <p className="text-xs text-slate-600">
                    Yes. PDF text extraction and regex evaluation run 100% locally inside your web browser memory. Zero healthcare text is uploaded to any cloud server.
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
