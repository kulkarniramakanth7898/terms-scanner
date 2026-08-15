'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { UniversalScanner } from '@/components/UniversalScanner';
import { ShieldCheck, Activity, ShieldAlert, Cpu, ArrowRight, Lock, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      
      {/* Navbar */}
      <Header />

      {/* Main Content Area */}
      <main className="mb-auto pb-16">
        
        {/* Hero Banner */}
        <Hero />

        {/* Master Universal Dual-Engine Scanner */}
        <UniversalScanner defaultEngine="instant" defaultScanType="general" defaultFrameworks={['All']} />

        {/* Specialized Compliance Auditor Cards Section */}
        <section className="max-w-5xl mx-auto px-4 my-16 space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-bold text-blue-800 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Specialized SEO Compliance Engines</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dedicated Regulatory Auditing Tools
            </h2>
            <p className="text-xs text-slate-600 max-w-xl mx-auto">
              Direct access to specialized pre-configured compliance auditors and legal checklist guides.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Tool 1: GDPR */}
            <Link
              href="/gdpr-checker"
              className="p-5 bg-white border border-slate-200 hover:border-emerald-500/80 rounded-2xl transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                    EU GDPR
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  GDPR Checker
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-3">
                  Audit privacy policies against Articles 6, 13, 14, 17 (Erasure), and 37 (DPO).
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 mt-4 block">
                Open GDPR Auditor →
              </span>
            </Link>

            {/* Tool 2: HIPAA */}
            <Link
              href="/hipaa-audit"
              className="p-5 bg-white border border-slate-200 hover:border-blue-500/80 rounded-2xl transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-50 text-blue-800 border border-blue-200">
                    US Healthcare
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                  HIPAA BAA Audit
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-3">
                  Check Business Associate Agreements (BAAs) and PHI security safeguards.
                </p>
              </div>
              <span className="text-[11px] font-bold text-blue-700 mt-4 block">
                Open HIPAA Auditor →
              </span>
            </Link>

            {/* Tool 3: CCPA */}
            <Link
              href="/ccpa-compliance"
              className="p-5 bg-white border border-slate-200 hover:border-amber-500/80 rounded-2xl transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-50 text-amber-800 border border-amber-200">
                    California
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                  CCPA / CPRA Auditor
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-3">
                  Verify &quot;Do Not Sell/Share&quot; disclosures and 12-month lookback clauses.
                </p>
              </div>
              <span className="text-[11px] font-bold text-amber-700 mt-4 block">
                Open CCPA Auditor →
              </span>
            </Link>

            {/* Tool 4: SOC 2 */}
            <Link
              href="/soc2-evaluator"
              className="p-5 bg-white border border-slate-200 hover:border-purple-500/80 rounded-2xl transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-50 text-purple-800 border border-purple-200">
                    SaaS Security
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors">
                  SOC 2 Evaluator
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-3">
                  Evaluate SaaS vendor agreements against AICPA Trust Services Criteria.
                </p>
              </div>
              <span className="text-[11px] font-bold text-purple-700 mt-4 block">
                Open SOC 2 Evaluator →
              </span>
            </Link>

          </div>
        </section>

      </main>

    </div>
  );
}
