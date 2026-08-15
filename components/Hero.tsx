'use client';
import React from 'react';
import { ShieldAlert, Zap, Search, History, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-10 pb-6 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
      
      {/* Soft Ambient Radial Mesh Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[280px] bg-gradient-to-tr from-blue-200/50 via-indigo-100/40 to-cyan-100/30 blur-[90px] rounded-full pointer-events-none" />

      {/* Top Pill Badge */}
      <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-bold shadow-sm backdrop-blur-md mb-6 animate-fadeIn">
        <Zap className="w-4 h-4 text-blue-600 fill-blue-600 animate-pulse" />
        <span>Instant Legal & Regulatory Compliance Auditor</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
        Terms<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">Scanner</span>
      </h1>

      {/* Subheadline */}
      <p className="mt-4 text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
        Instantly detect hidden risks, regulatory non-compliance, and predatory clauses in contracts, NDAs, and privacy policies.
      </p>

      {/* Feature Highlights Grid */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs font-bold text-slate-700">
        <div className="flex items-center justify-center space-x-2 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
          <span>Predatory Clauses</span>
        </div>
        <div className="flex items-center justify-center space-x-2 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>💡 Counter-Proposals</span>
        </div>
        <div className="flex items-center justify-center space-x-2 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all">
          <Search className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Offline Client PDF</span>
        </div>
        <div className="flex items-center justify-center space-x-2 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all">
          <History className="w-4 h-4 text-purple-600 shrink-0" />
          <span>Time-Travel Diff</span>
        </div>
      </div>

    </section>
  );
};
