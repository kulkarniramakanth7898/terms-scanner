'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { UniversalScanner } from '@/components/UniversalScanner';
import { ShieldCheck, Activity, ShieldAlert, Cpu, ArrowRight, Lock, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      
      {/* Navbar */}
      <Header />

      {/* Main Content Area */}
      <main className="mb-auto pb-16">
        
        {/* Hero Banner */}
        <Hero />

        {/* Master Universal Dual-Mode Scanner */}
        <UniversalScanner defaultMode="general" defaultFrameworks={['All']} />

        {/* Specialized Compliance Auditor Cards Section */}
        <section className="max-w-5xl mx-auto px-4 my-16 space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-950/80 border border-blue-800/60 rounded-full text-xs font-bold text-blue-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Specialized SEO Compliance Engines</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dedicated Regulatory Auditing Tools
            </h2>
            <p className="text-xs text-slate-400 max-w-xl mx-auto">
              Direct access to specialized pre-configured compliance auditors and legal checklist guides.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Tool 1: GDPR */}
            <Link
              href="/gdpr-checker"
              className="p-5 bg-slate-900/80 border border-slate-800 hover:border-emerald-500/60 rounded-2xl transition-all hover:shadow-xl hover:shadow-emerald-950/20 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                    EU GDPR
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  GDPR Checker
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-3">
                  Audit privacy policies against Articles 6, 13, 14, 17 (Erasure), and 37 (DPO).
                </p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 mt-4 block">
                Open GDPR Auditor →
              </span>
            </Link>

            {/* Tool 2: HIPAA */}
            <Link
              href="/hipaa-audit"
              className="p-5 bg-slate-900/80 border border-slate-800 hover:border-blue-500/60 rounded-2xl transition-all hover:shadow-xl hover:shadow-blue-950/20 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-950 text-blue-300 border border-blue-800">
                    US Healthcare
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  HIPAA BAA Audit
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-3">
                  Check Business Associate Agreements (BAAs) and PHI security safeguards.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-blue-400 mt-4 block">
                Open HIPAA Auditor →
              </span>
            </Link>

            {/* Tool 3: CCPA */}
            <Link
              href="/ccpa-compliance"
              className="p-5 bg-slate-900/80 border border-slate-800 hover:border-amber-500/60 rounded-2xl transition-all hover:shadow-xl hover:shadow-amber-950/20 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-950 text-amber-300 border border-amber-800">
                    California
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  CCPA / CPRA Auditor
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-3">
                  Verify &quot;Do Not Sell/Share&quot; disclosures and 12-month lookback clauses.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-amber-400 mt-4 block">
                Open CCPA Auditor →
              </span>
            </Link>

            {/* Tool 4: SOC 2 */}
            <Link
              href="/soc2-evaluator"
              className="p-5 bg-slate-900/80 border border-slate-800 hover:border-purple-500/60 rounded-2xl transition-all hover:shadow-xl hover:shadow-purple-950/20 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-950 text-purple-300 border border-purple-800">
                    SaaS Security
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                  SOC 2 Evaluator
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-3">
                  Evaluate SaaS vendor agreements against AICPA Trust Services Criteria.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-purple-400 mt-4 block">
                Open SOC 2 Evaluator →
              </span>
            </Link>

          </div>
        </section>

      </main>

    </div>
  );
}
