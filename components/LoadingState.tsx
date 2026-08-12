'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Cpu, Scale, Sparkles, FileSearch } from 'lucide-react';

const LOADING_STEPS = [
  'Extracting text structure and removing DOM noise...',
  'AI computing semantic differences and risk scores...',
  'Scanning for predatory clauses, liability traps & data grabs...',
  'Formulating plain-English breakdowns and counter-proposals...',
  'Finalizing PrivacyLens legal risk assessment report...'
];

export const LoadingState: React.FC = () => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto my-12 p-8 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl text-center backdrop-blur-xl transition-all">
      {/* Animated Radar Pulse Icon */}
      <div className="relative mx-auto w-20 h-20 flex items-center justify-center mb-6">
        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-indigo-500/30 animate-pulse" />
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/40 border border-blue-400/40">
          <FileSearch className="w-8 h-8 animate-bounce text-blue-100" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white tracking-tight">
        PrivacyLens AI Scanning Active
      </h3>

      {/* Dynamic Status Text */}
      <p className="mt-2 text-sm font-medium text-blue-400 min-h-[24px] transition-all">
        {LOADING_STEPS[currentStepIdx]}
      </p>

      {/* Step Progress Bar */}
      <div className="w-full bg-slate-950 h-2 rounded-full mt-6 overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-all duration-700 ease-out"
          style={{ width: `${((currentStepIdx + 1) / LOADING_STEPS.length) * 100}%` }}
        />
      </div>

      {/* Badges footer */}
      <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-slate-400 font-mono">
        <span className="flex items-center space-x-1">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span>Gemini 2.5 Flash</span>
        </span>
        <span>•</span>
        <span className="flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Strict JSON Schema</span>
        </span>
      </div>
    </div>
  );
};
