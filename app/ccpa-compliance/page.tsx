import type { Metadata } from 'next';
import Link from 'next/link';
import { UniversalScanner } from '@/components/UniversalScanner';
import { Header } from '@/components/Header';
import { ShieldCheck, ArrowLeft, CheckCircle2, Lock, FileText, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CCPA / CPRA Compliance Auditor & Policy Checker | TermsScanner',
  description: '100% Offline CCPA & CPRA Compliance Auditor. Audit privacy policies for California "Do Not Sell/Share", 12-month lookback, and sensitive info rights.',
  keywords: [
    'CCPA compliance auditor',
    'CPRA policy checker',
    'California privacy policy audit',
    'Do Not Sell My Info checker',
    'CCPA consumer rights guide'
  ]
};

export default function CCPACompliancePage() {
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
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-amber-950/80 border border-amber-800/60 rounded-full text-xs font-bold text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>California Consumer Privacy Act (CCPA / CPRA)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            CCPA / CPRA Compliance Auditor
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Audit privacy policies against mandatory California consumer disclosures, &quot;Do Not Sell or Share&quot; opt-out links, and 12-month lookback periods.
          </p>
        </div>

        {/* Universal Scanner Configured for CCPA */}
        <UniversalScanner
          defaultMode="regulatory"
          defaultFrameworks={['ccpa']}
        />

        {/* Static SEO Article & Guide Section */}
        <section className="max-w-4xl mx-auto px-4 my-12 space-y-8">
          <div className="p-8 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-6 text-sm text-slate-300 leading-relaxed">
            
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span>California Privacy Rights (CCPA / CPRA) Compliance Guide</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Mandatory legal disclosures for businesses operating in or targeting California consumers.
              </p>
            </div>

            <p>
              The California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA) grants residents unprecedented control over their personal data. Fines imposed by the California Privacy Protection Agency (CPPA) reach up to $7,500 per intentional violation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1. &quot;Do Not Sell or Share My Personal Info&quot;</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Businesses selling or sharing consumer data for cross-context behavioral advertising must provide a clear opt-out mechanism.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>2. 12-Month Access Lookback Disclosure</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Policies must categorize personal information collected, sold, or shared in the preceding 12 months.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3. Right to Limit Sensitive Personal Info</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Consumers can direct businesses to restrict the use of Sensitive Personal Information (SPI) like SSNs, precise location, and financial accounts.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <h3 className="font-bold text-white text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>4. Non-Discrimination Rights Notice</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Policies must explicitly declare that exercising privacy rights will not result in denied services or discriminatory pricing.
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
