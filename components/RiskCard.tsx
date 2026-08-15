'use client';

import React, { useState } from 'react';
import { AlertOctagon, ShieldAlert, CheckCircle, Copy, Check, Lightbulb, Tag, Flame } from 'lucide-react';
import { RiskFinding } from '@/lib/types';

interface RiskCardProps {
  finding: RiskFinding;
}

export const RiskCard: React.FC<RiskCardProps> = ({ finding }) => {
  const [copied, setCopied] = useState(false);

  const handleCopySuggestion = () => {
    if (finding.suggestion) {
      navigator.clipboard.writeText(finding.suggestion);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const levelStr = String(finding.riskLevel).toUpperCase();
  const isCritical = levelStr === 'CRITICAL';
  const isHigh = levelStr === 'HIGH';
  const isMedium = levelStr === 'MEDIUM';
  const isLow = levelStr === 'LOW';

  // Styling based on risk level
  const cardBorder = isCritical
    ? 'border-rose-600/80 shadow-rose-950/40 bg-slate-900/90'
    : isHigh
    ? 'border-rose-900/60 shadow-rose-950/20 bg-slate-900/90'
    : isMedium
    ? 'border-amber-900/60 shadow-amber-950/20 bg-slate-900/90'
    : 'border-emerald-900/60 shadow-emerald-950/20 bg-slate-900/90';

  const badgeBg = isCritical
    ? 'bg-rose-900 text-white border-rose-500 shadow-sm animate-pulse'
    : isHigh
    ? 'bg-rose-950 text-rose-300 border-rose-800/80'
    : isMedium
    ? 'bg-amber-950 text-amber-300 border-amber-800/80'
    : 'bg-emerald-950 text-emerald-300 border-emerald-800/80';

  const quoteBorderColor = isCritical || isHigh
    ? 'border-rose-500/80 bg-rose-950/20 text-rose-100'
    : isMedium
    ? 'border-amber-500/80 bg-amber-950/20 text-amber-100'
    : 'border-emerald-500/80 bg-emerald-950/20 text-emerald-100';

  return (
    <div className={`p-6 border rounded-2xl shadow-xl backdrop-blur-xl transition-all ${cardBorder} group`}>
      
      {/* Header Bar: Status Icon & Risk Level & Category */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center space-x-2.5">
          {isCritical && (
            <div className="p-2 rounded-xl bg-rose-950/90 text-rose-400 border border-rose-600/80 shadow-md">
              <Flame className="w-5 h-5 animate-bounce text-rose-500" />
            </div>
          )}
          {isHigh && !isCritical && (
            <div className="p-2 rounded-xl bg-rose-950/90 text-rose-400 border border-rose-800/80 shadow-md">
              <AlertOctagon className="w-5 h-5" />
            </div>
          )}
          {isMedium && (
            <div className="p-2 rounded-xl bg-amber-950/90 text-amber-400 border border-amber-800/80 shadow-md">
              <ShieldAlert className="w-5 h-5" />
            </div>
          )}
          {isLow && (
            <div className="p-2 rounded-xl bg-emerald-950/90 text-emerald-400 border border-emerald-800/80 shadow-md">
              <CheckCircle className="w-5 h-5" />
            </div>
          )}
          <div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${badgeBg}`}>
              {finding.riskLevel} Risk
            </span>
          </div>
        </div>

        {finding.category && (
          <div className="flex items-center space-x-1 px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-medium text-slate-400">
            <Tag className="w-3 h-3 text-slate-500" />
            <span>{finding.category}</span>
          </div>
        )}
      </div>

      {/* Clause Title if provided */}
      {finding.title && (
        <h3 className="text-base font-bold text-white mb-2">
          {finding.title}
        </h3>
      )}

      {/* Exact Quote Block */}
      <div className="mb-4">
        <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
          Matched Clause Quote:
        </span>
        <blockquote className={`p-4 border-l-4 rounded-r-xl italic text-sm leading-relaxed font-serif ${quoteBorderColor}`}>
          &ldquo;{finding.quote}&rdquo;
        </blockquote>
      </div>

      {/* Plain-English Explanation */}
      <div className="mb-5">
        <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
          Why this clause is bad:
        </span>
        <p className="text-sm text-slate-200 leading-relaxed font-normal bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
          {finding.explanation}
        </p>
      </div>

      {/* 💡 How to Handle It Section */}
      <div className="pt-4 border-t border-slate-800/80 bg-blue-950/20 -mx-6 -mb-6 p-6 rounded-b-2xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 mt-0.5 shrink-0">
              <Lightbulb className="w-4 h-4 fill-amber-400 text-amber-300" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                💡 How to handle it / Negotiation Counter-Proposal
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {finding.suggestion}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopySuggestion}
            className="shrink-0 inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-all"
            title="Copy counter-clause text to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
