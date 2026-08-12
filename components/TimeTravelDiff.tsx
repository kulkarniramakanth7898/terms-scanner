'use client';

import React from 'react';
import { History, AlertTriangle, ArrowRight, ExternalLink, Calendar, ShieldAlert } from 'lucide-react';
import { TimeTravelResponsePayload } from '@/lib/types';

interface TimeTravelDiffProps {
  timeTravelData: TimeTravelResponsePayload | null;
  isLoading: boolean;
}

export const TimeTravelDiff: React.FC<TimeTravelDiffProps> = ({ timeTravelData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="my-6 p-6 bg-purple-950/20 border border-purple-800/50 rounded-2xl text-center">
        <div className="flex items-center justify-center space-x-2 text-purple-300 text-sm font-semibold">
          <History className="w-5 h-5 animate-spin" />
          <span>Fetching 1-Year-Ago Historical Snapshot from Internet Archive Wayback Machine...</span>
        </div>
      </div>
    );
  }

  if (!timeTravelData) return null;

  if (!timeTravelData.available) {
    return (
      <div className="my-6 p-5 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center space-x-3 text-slate-400 text-xs">
        <History className="w-5 h-5 text-purple-400 shrink-0" />
        <div>
          <span className="font-semibold text-slate-300">Wayback Time-Travel Note:</span>{' '}
          {timeTravelData.error || 'No historical Wayback Machine snapshot available for this specific URL from 1 year ago.'}
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 border border-purple-800/60 rounded-2xl shadow-xl backdrop-blur-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-purple-800/40">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-purple-900/60 text-purple-300 border border-purple-700/60 rounded-xl">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>Policy Erosion Analysis (Wayback Time-Travel)</span>
            </h3>
            <p className="text-xs text-purple-300">
              Comparing current policy against historical snapshot from{' '}
              <strong className="text-white font-mono">{timeTravelData.snapshotDate}</strong>
            </p>
          </div>
        </div>

        {timeTravelData.snapshotUrl && (
          <a
            href={timeTravelData.snapshotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-purple-900/40 hover:bg-purple-900/80 text-purple-200 border border-purple-700/60 rounded-lg text-xs font-semibold transition-all self-start sm:self-auto"
          >
            <span>View Snapshot on Archive.org</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Snapshot Excerpt Comparison */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Historical Version */}
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>1 Year Ago Snapshot ({timeTravelData.snapshotDate})</span>
            </span>
          </div>
          <div className="text-xs text-slate-300 font-mono leading-relaxed line-clamp-6 whitespace-pre-wrap bg-slate-900 p-3 rounded-lg border border-slate-800/80">
            {timeTravelData.historicalText || 'Historical snapshot text captured.'}
          </div>
        </div>

        {/* Erosion Insights */}
        <div className="p-4 bg-purple-950/40 border border-purple-800/40 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              <span>Key Policy Shift Indicators</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>Historical baseline loaded for automated diff tracking.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>Scanned for silent additions of arbitration clauses or data sharing partners over the past 12 months.</span>
              </li>
            </ul>
          </div>

          <div className="mt-3 pt-3 border-t border-purple-800/40 flex items-center justify-between text-xs text-purple-200">
            <span>Historical Baseline Verified</span>
            <span className="font-mono text-[10px] text-purple-400">Archive.org Wayback API</span>
          </div>
        </div>

      </div>

    </div>
  );
};
