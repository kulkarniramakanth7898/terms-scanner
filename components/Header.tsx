'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Cpu, Lock } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand Title */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                Terms<span className="text-blue-600">Scanner</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-200/80 rounded-full">
                v2.5 Auditor
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Legal & Privacy Risk Intelligence</p>
          </div>
        </Link>

        {/* Navigation & Status Badges */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <nav className="hidden md:flex items-center space-x-5 text-xs font-bold text-slate-600 mr-2">
            <Link href="/gdpr-checker" className="hover:text-blue-600 transition-colors">
              GDPR
            </Link>
            <Link href="/hipaa-audit" className="hover:text-blue-600 transition-colors">
              HIPAA
            </Link>
            <Link href="/ccpa-compliance" className="hover:text-blue-600 transition-colors">
              CCPA
            </Link>
            <Link href="/soc2-evaluator" className="hover:text-blue-600 transition-colors">
              SOC 2
            </Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">
              About
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span>Gemini 2.5 AI</span>
          </div>
          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Client Offline</span>
          </div>
        </div>

      </div>
    </header>
  );
};
