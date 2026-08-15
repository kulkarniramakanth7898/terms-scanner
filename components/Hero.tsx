'use client';
import React from 'react';
import { ShieldAlert, Zap, Search, History, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-10 pb-6 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
      
      {/* Ambient Radial Mesh Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[300px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />

      {/* Top Pill Badge */}
      <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-bold shadow-lg shadow-blue-950/50 backdrop-blur-md mb-6 animate-fadeIn">
        <Zap className="w-4 h-4 text-blue-400 fill-blue-400 animate-pulse" />
        <span>Instant Legal & Compliance Auditor</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
        Terms<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">Scanner</span>
      </h1>

      {/* Subheadline */}
      <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
        Instantly detect hidden risks, regulatory non-compliance, and predatory clauses in contracts, NDAs, and privacy policies.
      </p>

      {/* Feature Highlights Grid */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs font-semibold text-slate-300">
        <div className="flex items-center justify-center space-x-2 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md shadow-md hover:border-slate-700 transition-all">
          <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Predatory Clauses</span>
        </div>
        <div className="flex items-center justify-center space-x-2 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md shadow-md hover:border-slate-700 transition-all">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>💡 Counter-Proposals</span>
        </div>
        <div className="flex items-center justify-center space-x-2 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md shadow-md hover:border-slate-700 transition-all">
          <Search className="w-4 h-4 text-blue-400 shrink-0" />
          <span>Offline Client PDF</span>
        </div>
        <div className="flex items-center justify-center space-x-2 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md shadow-md hover:border-slate-700 transition-all">
          <History className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Wayback Time-Travel</span>
        </div>
      </div>

    </section>
  );
};
