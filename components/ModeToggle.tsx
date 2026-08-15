'use client';

import React from 'react';
import { Zap, Brain } from 'lucide-react';
import { ScanMode } from '@/lib/types';

interface ModeToggleProps {
  mode: ScanMode;
  setMode: (mode: ScanMode) => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
  return (
    <div className="w-full max-w-md mx-auto my-4 p-1.5 bg-slate-950/90 border border-slate-800 rounded-2xl shadow-inner backdrop-blur-md">
      <div className="grid grid-cols-2 gap-1.5">
        
        {/* Button 1: Instant Scan (Regex) */}
        <button
          type="button"
          onClick={() => setMode('instant')}
          className={`flex items-center justify-center space-x-2 py-3 px-3 rounded-xl text-xs font-bold transition-all ${
            mode === 'instant'
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Zap className={`w-4 h-4 shrink-0 ${mode === 'instant' ? 'fill-slate-950 text-slate-950' : 'text-amber-400'}`} />
          <span>⚡ Instant Scan (Regex)</span>
        </button>

        {/* Button 2: Deep AI Scan (Gemini) */}
        <button
          type="button"
          onClick={() => setMode('ai')}
          className={`flex items-center justify-center space-x-2 py-3 px-3 rounded-xl text-xs font-bold transition-all ${
            mode === 'ai'
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-md shadow-blue-500/30 scale-[1.02]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Brain className={`w-4 h-4 shrink-0 ${mode === 'ai' ? 'text-blue-100' : 'text-blue-400'}`} />
          <span>🧠 Deep AI Scan (Gemini)</span>
        </button>

      </div>
    </div>
  );
};
