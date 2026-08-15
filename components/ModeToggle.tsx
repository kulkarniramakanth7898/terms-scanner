'use client';

import React from 'react';
import { Zap, Brain, Shield, Sparkles } from 'lucide-react';
import { ScanMode } from '@/lib/types';

interface ModeToggleProps {
  mode: ScanMode;
  setMode: (mode: ScanMode) => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
  return (
    <div className="w-full max-w-md mx-auto my-4 p-1.5 bg-slate-950/90 border border-slate-800/90 rounded-2xl shadow-inner backdrop-blur-md">
      <div className="grid grid-cols-2 gap-1.5">
        
        {/* Instant Scan (Regex Rule Engine) Button */}
        <button
          type="button"
          onClick={() => setMode('instant')}
          className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all relative overflow-hidden ${
            mode === 'instant'
              ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Zap className={`w-4 h-4 shrink-0 ${mode === 'instant' ? 'fill-slate-950 text-slate-950 animate-bounce' : 'text-amber-400'}`} />
          <div className="text-left leading-tight">
            <span className="block font-extrabold">⚡ Instant Scan</span>
            <span className={`block text-[10px] font-medium opacity-85 ${mode === 'instant' ? 'text-slate-900' : 'text-slate-500'}`}>
              Zero-Cost Regex Engine
            </span>
          </div>
        </button>

        {/* Deep AI Scan (Gemini API) Button */}
        <button
          type="button"
          onClick={() => setMode('ai')}
          className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all relative overflow-hidden ${
            mode === 'ai'
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Brain className={`w-4 h-4 shrink-0 ${mode === 'ai' ? 'text-blue-100 animate-pulse' : 'text-blue-400'}`} />
          <div className="text-left leading-tight">
            <span className="block font-extrabold flex items-center gap-1">
              <span>🧠 Deep AI Scan</span>
            </span>
            <span className={`block text-[10px] font-medium opacity-85 ${mode === 'ai' ? 'text-blue-100' : 'text-slate-500'}`}>
              Gemini 2.5 Flash
            </span>
          </div>
        </button>

      </div>
    </div>
  );
};
