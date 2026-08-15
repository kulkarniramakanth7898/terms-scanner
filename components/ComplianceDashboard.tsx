'use client';

import React from 'react';
import { UnifiedScanSummary } from '@/lib/scanner';
import { CheckCircle2, XCircle, ShieldCheck, AlertOctagon, ArrowLeft } from 'lucide-react';

interface ComplianceDashboardProps {
  summary: UnifiedScanSummary;
  onReset: () => void;
}

export const ComplianceDashboard: React.FC<ComplianceDashboardProps> = ({ summary, onReset }) => {
  return (
    <div className="w-full max-w-5xl mx-auto my-8 px-4 space-y-6 animate-fadeIn">
      
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-blue-300 border border-slate-800 hover:border-blue-500/60 rounded-xl text-xs font-extrabold transition-all shadow-md group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Scanner</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono bg-slate-950 px-3.5 py-1.5 border border-slate-800 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Offline Client-Side Scan</span>
        </div>
      </div>

      {/* Overall Score Header Banner */}
      <div className="p-6 sm:p-8 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-950/80 border border-blue-800/60 rounded-full text-xs font-semibold text-blue-300 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Document Compliance Summary</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Regulatory Compliance Audit
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Audited {summary.frameworksScannedCount} regulatory framework(s) across {summary.scannedTextLength.toLocaleString()} characters of document text.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 text-center min-w-[170px] shadow-inner">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Overall Compliance Score
          </span>
          <span className={`text-4xl font-extrabold tracking-tight ${
            summary.overallScore >= 80 ? 'text-emerald-400' : summary.overallScore >= 50 ? 'text-amber-400' : 'text-rose-400'
          }`}>
            {summary.overallScore}%
          </span>
          <span className="block text-[11px] font-semibold text-slate-400 mt-1">
            {summary.overallScore >= 80 ? 'HIGH COMPLIANCE' : summary.overallScore >= 50 ? 'PARTIAL RISK' : 'CRITICAL DEFICIT'}
          </span>
        </div>
      </div>

      {/* Grid of Framework Compliance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {summary.frameworkResults.map((result) => {
          const isHigh = result.score >= 80;
          const isMed = result.score >= 50 && result.score < 80;

          const cardBorder = isHigh
            ? 'border-emerald-900/60 bg-slate-900/90'
            : isMed
            ? 'border-amber-900/60 bg-slate-900/90'
            : 'border-rose-900/60 bg-slate-900/90';

          const scoreBadgeBg = isHigh
            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
            : isMed
            ? 'bg-amber-950 text-amber-300 border-amber-800'
            : 'bg-rose-950 text-rose-300 border-rose-800';

          return (
            <div
              key={result.frameworkId}
              className={`p-6 border rounded-3xl shadow-xl backdrop-blur-xl flex flex-col justify-between space-y-6 ${cardBorder}`}
            >
              
              {/* Framework Header */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-extrabold text-white tracking-tight">
                    {result.frameworkName}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shrink-0 ${scoreBadgeBg}`}>
                    {result.score}% Score
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {result.description}
                </p>
              </div>

              {/* Detected Green List vs Missing Red List */}
              <div className="space-y-4 pt-4 border-t border-slate-800/80">
                
                {/* Green List: Detected Clauses */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Detected / Compliant Clauses ({result.passedCount}):</span>
                  </h4>
                  {result.detectedClauses.length > 0 ? (
                    <ul className="space-y-2">
                      {result.detectedClauses.map((clause) => (
                        <li
                          key={clause.id}
                          className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-xl text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between font-bold text-emerald-200">
                            <span>✓ {clause.clauseName}</span>
                            <span className="text-[10px] px-2 py-0.5 bg-emerald-900/60 rounded text-emerald-300">
                              {clause.criticality}
                            </span>
                          </div>
                          {clause.matchedSnippet && (
                            <p className="text-[11px] text-emerald-400/80 italic font-mono truncate">
                              &ldquo;{clause.matchedSnippet}&rdquo;
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500 italic p-2 bg-slate-950/60 rounded-xl">
                      No compliant clauses detected for this framework.
                    </p>
                  )}
                </div>

                {/* Red List: Missing Critical Clauses */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2.5 flex items-center space-x-1.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Missing / Deficient Clauses ({result.failedCount}):</span>
                  </h4>
                  {result.missingClauses.length > 0 ? (
                    <ul className="space-y-2">
                      {result.missingClauses.map((clause) => (
                        <li
                          key={clause.id}
                          className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between font-bold text-rose-200">
                            <span>✗ {clause.clauseName}</span>
                            <span className="text-[10px] px-2 py-0.5 bg-rose-900/60 rounded text-rose-300">
                              {clause.criticality} Risk
                            </span>
                          </div>
                          <p className="text-[11px] text-rose-300/90 leading-normal">
                            {clause.missingMessage}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-emerald-400 font-semibold p-2 bg-emerald-950/40 border border-emerald-900/60 rounded-xl flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>100% Full Compliance! All framework criteria passed.</span>
                    </p>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
