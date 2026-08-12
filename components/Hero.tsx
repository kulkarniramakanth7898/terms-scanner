'use client';
import React from 'react';
import { ShieldAlert, Zap, Search, History, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-8 pb-6 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
      {/* Glow background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-96 h-96 bg-blue-600/15 blur-3xl rounded-full pointer-events-none" />

      {/* Top Pill Badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/60 text-blue-300 text-xs font-semibold shadow-inner mb-6">
        <Zap className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
        <span>Instant AI Legal Audit & Negotiation Assistant</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
        TermsScanner: <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500">Legal & Privacy Auditor</span>
      </h1>

      {/* Hero Subtitle */}
      <p className="mt-4 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
        Instantly detect hidden risks in contracts, NDAs, and privacy policies.
      </p>

      {/* Feature Highlights Grid */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs font-medium text-slate-700 dark:text-slate-300">
        <div className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Predatory Clause Detection</span>
        </div>
        <div className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>💡 Counter-Proposals</span>
        </div>
        <div className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
          <Search className="w-4 h-4 text-blue-400 shrink-0" />
          <span>Client PDF Sandbox</span>
        </div>
        <div className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
          <History className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Time-Travel Policy Erosion</span>
        </div>
      </div>
    </section>
  );
};
