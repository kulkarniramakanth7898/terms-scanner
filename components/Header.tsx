'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Cpu, Lock } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Brand Title */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 text-white shadow-lg shadow-blue-500/20 border border-blue-400/30 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-blue-200" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                Terms<span className="text-blue-400">Scanner</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-blue-950/80 text-blue-300 border border-blue-800/50 rounded-full">
                AI Auditor v2.5
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Legal & Privacy Risk Intelligence</p>
          </div>
        </Link>

        {/* Navigation & Status Badges */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <nav className="hidden md:flex items-center space-x-4 text-xs font-semibold text-slate-300 mr-2">
            <Link href="/privacy" className="hover:text-blue-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-blue-400 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 bg-slate-900/90 border border-slate-800 rounded-lg text-xs font-medium text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Gemini 2.5 Flash</span>
          </div>
          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 bg-slate-900/90 border border-slate-800 rounded-lg text-xs font-medium text-slate-300">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Client PDF Sandbox</span>
          </div>
          <div className="flex items-center space-x-1 px-3 py-1 bg-blue-900/40 border border-blue-700/40 rounded-lg text-xs font-medium text-blue-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Ready</span>
          </div>
        </div>

      </div>
    </header>
  );
};
