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

  // Light Theme styling based on risk level
  const cardBorder = isCritical
    ? 'border-rose-300 shadow-rose-100 bg-white'
    : isHigh
    ? 'border-rose-200 shadow-rose-50 bg-white'
    : isMedium
    ? 'border-amber-200 shadow-amber-50 bg-white'
    : 'border-emerald-200 shadow-emerald-50 bg-white';

  const badgeBg = isCritical
    ? 'bg-rose-600 text-white border-rose-700 shadow-sm animate-pulse'
    : isHigh
    ? 'bg-rose-100 text-rose-800 border-rose-300'
    : isMedium
    ? 'bg-amber-100 text-amber-800 border-amber-300'
    : 'bg-emerald-100 text-emerald-800 border-emerald-300';

  const quoteBorderColor = isCritical || isHigh
    ? 'border-rose-500 bg-rose-50/80 text-rose-950'
    : isMedium
    ? 'border-amber-500 bg-amber-50/80 text-amber-950'
    : 'border-emerald-500 bg-emerald-50/80 text-emerald-950';

  return (
    <div className={`p-6 border rounded-2xl shadow-md transition-all ${cardBorder} group`}>
      
      {/* Header Bar: Status Icon & Risk Level & Category */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center space-x-2.5">
          {isCritical && (
            <div className="p-2 rounded-xl bg-rose-100 text-rose-600 border border-rose-200 shadow-sm">
              <Flame className="w-5 h-5 animate-bounce text-rose-600" />
            </div>
          )}
          {isHigh && !isCritical && (
            <div className="p-2 rounded-xl bg-rose-100 text-rose-600 border border-rose-200 shadow-sm">
              <AlertOctagon className="w-5 h-5" />
            </div>
          )}
          {isMedium && (
            <div className="p-2 rounded-xl bg-amber-100 text-amber-600 border border-amber-200 shadow-sm">
              <ShieldAlert className="w-5 h-5" />
            </div>
          )}
          {isLow && (
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-sm">
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
          <div className="flex items-center space-x-1 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
            <Tag className="w-3 h-3 text-slate-500" />
            <span>{finding.category}</span>
          </div>
        )}
      </div>

      {/* Clause Title if provided */}
      {finding.title && (
        <h3 className="text-base font-extrabold text-slate-900 mb-2">
          {finding.title}
        </h3>
      )}

      {/* Exact Quote Block */}
      <div className="mb-4">
        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
          Matched Clause Quote:
        </span>
        <blockquote className={`p-4 border-l-4 rounded-r-xl italic text-xs sm:text-sm leading-relaxed font-serif ${quoteBorderColor}`}>
          &ldquo;{finding.quote}&rdquo;
        </blockquote>
      </div>

      {/* Plain-English Explanation */}
      <div className="mb-5">
        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
          Why this clause is bad:
        </span>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          {finding.explanation}
        </p>
      </div>

      {/* 💡 How to Handle It Section */}
      <div className="pt-4 border-t border-slate-200 bg-amber-50/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-2.5">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 mt-0.5 shrink-0 border border-amber-200">
              <Lightbulb className="w-4 h-4 fill-amber-500 text-amber-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                💡 How to handle it / Negotiation Counter-Proposal
              </h4>
              <p className="text-xs text-slate-800 mt-1 leading-relaxed font-medium">
                {finding.suggestion}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopySuggestion}
            className="shrink-0 inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-lg text-xs font-bold transition-all shadow-sm"
            title="Copy counter-clause text to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
