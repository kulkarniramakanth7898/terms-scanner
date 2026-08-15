'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Cpu, Zap, Brain, FileSearch } from 'lucide-react';
import { ScanMode } from '@/lib/types';

const AI_LOADING_STEPS = [
  'Extracting text structure and removing DOM noise...',
  'AI computing semantic differences and risk scores...',
  'Scanning for predatory clauses, liability traps & data grabs...',
  'Formulating plain-English breakdowns and counter-proposals...',
  'Finalizing TermsScanner legal risk assessment report...'
];

const INSTANT_LOADING_STEPS = [
  'Parsing document text structure...',
  'Executing Zero-Cost Regex Rule Engine...',
  'Scanning for Data Selling, Arbitration & Unilateral Changes...',
  'Generating instant risk report...'
];

interface LoadingStateProps {
  mode?: ScanMode;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ mode = 'ai' }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const steps = mode === 'instant' ? INSTANT_LOADING_STEPS : AI_LOADING_STEPS;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, mode === 'instant' ? 400 : 1800);
    return () => clearInterval(interval);
  }, [steps.length, mode]);

  const isInstant = mode === 'instant';

  return (
    <div className="w-full max-w-xl mx-auto my-12 p-8 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl text-center backdrop-blur-xl transition-all">
      {/* Animated Icon */}
      <div className="relative mx-auto w-20 h-20 flex items-center justify-center mb-6">
        <div className={`absolute inset-0 rounded-full animate-ping ${isInstant ? 'bg-amber-500/20' : 'bg-blue-500/20'}`} />
        <div className={`absolute inset-2 rounded-full animate-pulse ${isInstant ? 'bg-amber-500/30' : 'bg-indigo-500/30'}`} />
        <div className={`relative w-16 h-16 rounded-2xl text-white flex items-center justify-center shadow-lg border ${
          isInstant 
            ? 'bg-gradient-to-br from-amber-500 to-yellow-600 shadow-amber-500/30 border-amber-400/40 text-slate-950' 
            : 'bg-gradient-to-br from-blue-600 to-indigo-700 shadow-blue-600/40 border-blue-400/40'
        }`}>
          {isInstant ? (
            <Zap className="w-8 h-8 animate-bounce fill-slate-950 text-slate-950" />
          ) : (
            <FileSearch className="w-8 h-8 animate-bounce text-blue-100" />
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
        {isInstant ? (
          <>
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>⚡ Zero-Cost Instant Scan Active</span>
          </>
        ) : (
          <>
            <Brain className="w-5 h-5 text-blue-400" />
            <span>🧠 Deep AI Scanning Active</span>
          </>
        )}
      </h3>

      {/* Dynamic Status Text */}
      <p className={`mt-2 text-sm font-medium min-h-[24px] transition-all ${isInstant ? 'text-amber-300' : 'text-blue-400'}`}>
        {steps[currentStepIdx]}
      </p>

      {/* Step Progress Bar */}
      <div className="w-full bg-slate-950 h-2 rounded-full mt-6 overflow-hidden border border-slate-800">
        <div
          className={`h-full transition-all duration-300 ease-out ${
            isInstant 
              ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300' 
              : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400'
          }`}
          style={{ width: `${((currentStepIdx + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Badges footer */}
      <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-slate-400 font-mono">
        <span className="flex items-center space-x-1">
          {isInstant ? (
            <>
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Regex Pattern Engine</span>
            </>
          ) : (
            <>
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Gemini 2.5 Flash</span>
            </>
          )}
        </span>
        <span>•</span>
        <span className="flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isInstant ? 'Zero Latency' : 'Strict JSON Schema'}</span>
        </span>
      </div>
    </div>
  );
};
