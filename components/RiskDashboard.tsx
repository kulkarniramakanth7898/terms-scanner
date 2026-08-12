'use client';

import React, { useState, useMemo } from 'react';
import { RiskFinding, AnalyzeResponsePayload } from '@/lib/types';
import { RiskCard } from './RiskCard';
import { ShieldAlert, AlertOctagon, CheckCircle, Download, FileText, Search, Filter, ShieldCheck, RefreshCw } from 'lucide-react';

interface RiskDashboardProps {
  data: AnalyzeResponsePayload;
  onReset: () => void;
}

export const RiskDashboard: React.FC<RiskDashboardProps> = ({ data, onReset }) => {
  const [filterLevel, setFilterLevel] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const findings = data.findings || [];
  const summary = data.summary || {
    totalClauses: findings.length,
    highRiskCount: findings.filter(f => f.riskLevel === 'High').length,
    mediumRiskCount: findings.filter(f => f.riskLevel === 'Medium').length,
    lowRiskCount: findings.filter(f => f.riskLevel === 'Low').length,
    overallRiskScore: Math.min(100, (findings.filter(f => f.riskLevel === 'High').length * 25) + (findings.filter(f => f.riskLevel === 'Medium').length * 10))
  };

  // Filtered findings based on tab & search query
  const filteredFindings = useMemo(() => {
    return findings.filter((item) => {
      const matchesLevel = filterLevel === 'All' || item.riskLevel === filterLevel;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesLevel && matchesSearch;
    });
  }, [findings, filterLevel, searchQuery]);

  // Risk Level Badge formatting for overall score
  const score = summary.overallRiskScore;
  const isCriticalScore = score >= 60;
  const isModerateScore = score >= 30 && score < 60;

  const scoreColor = isCriticalScore
    ? 'text-rose-400 border-rose-800/80 bg-rose-950/60'
    : isModerateScore
    ? 'text-amber-400 border-amber-800/80 bg-amber-950/60'
    : 'text-emerald-400 border-emerald-800/80 bg-emerald-950/60';

  // Export as Markdown File
  const exportMarkdown = () => {
    let md = `# PrivacyLens Audit Report: ${data.extractedTitle || 'Legal Document'}\n\n`;
    md += `**Overall Risk Score:** ${summary.overallRiskScore}/100\n`;
    md += `**Total Scanned Clauses:** ${summary.totalClauses} | **High Risk:** ${summary.highRiskCount} | **Medium Risk:** ${summary.mediumRiskCount} | **Low/Safe:** ${summary.lowRiskCount}\n\n`;
    md += `---\n\n`;

    findings.forEach((f, idx) => {
      md += `### ${idx + 1}. [${f.riskLevel.toUpperCase()} RISK] ${f.category || 'Clause'}\n`;
      md += `> "${f.quote}"\n\n`;
      md += `**Why it is bad:** ${f.explanation}\n\n`;
      md += `**💡 Counter-Proposal:** ${f.suggestion}\n\n`;
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PrivacyLens-Audit-Report-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export as JSON File
  const exportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PrivacyLens-Findings-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Print Report (triggers PDF print dialog)
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8 px-4 space-y-8 animate-fadeIn">
      
      {/* Overview Stats Dashboard Header */}
      <div className="p-6 sm:p-8 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          
          {/* Document Title & Type */}
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-950/80 border border-blue-800/60 rounded-full text-xs font-semibold text-blue-300 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Audit Complete • Source: {data.sourceType.toUpperCase()}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {data.extractedTitle || 'Legal Risk Findings'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Scanned {data.rawTextLength.toLocaleString()} characters of agreement text
            </p>
          </div>

          {/* Overall Risk Score Meter */}
          <div className="flex items-center space-x-4">
            <div className={`p-4 rounded-2xl border ${scoreColor} text-center min-w-[140px] shadow-lg`}>
              <span className="block text-[10px] font-bold uppercase tracking-wider opacity-80">
                Overall Risk Index
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {summary.overallRiskScore}
                <span className="text-sm font-normal text-slate-400">/100</span>
              </span>
              <span className="block text-[11px] font-bold mt-0.5">
                {isCriticalScore ? 'CRITICAL RISK' : isModerateScore ? 'MODERATE RISK' : 'LOW RISK'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                onClick={onReset}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>New Audit</span>
              </button>

              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={exportMarkdown}
                  className="px-3 py-1.5 bg-blue-900/40 hover:bg-blue-900/80 text-blue-200 border border-blue-700/60 rounded-lg text-xs font-medium transition-all flex items-center space-x-1"
                  title="Export Markdown Report"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>.MD</span>
                </button>
                <button
                  type="button"
                  onClick={exportJSON}
                  className="px-3 py-1.5 bg-indigo-900/40 hover:bg-indigo-900/80 text-indigo-200 border border-indigo-700/60 rounded-lg text-xs font-medium transition-all flex items-center space-x-1"
                  title="Export Raw JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrintPDF}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-lg text-xs font-medium transition-all flex items-center space-x-1"
                  title="Print / Save PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Grid Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
            <span className="text-xs text-slate-400 font-medium">Total Clauses Scanned</span>
            <span className="block text-2xl font-bold text-white mt-1">
              {summary.totalClauses}
            </span>
          </div>

          <div className="p-4 bg-rose-950/40 border border-rose-900/60 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-rose-300 font-semibold">High Risk</span>
              <AlertOctagon className="w-4 h-4 text-rose-400" />
            </div>
            <span className="block text-2xl font-bold text-rose-200 mt-1">
              {summary.highRiskCount}
            </span>
          </div>

          <div className="p-4 bg-amber-950/40 border border-amber-900/60 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-300 font-semibold">Medium Risk</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <span className="block text-2xl font-bold text-amber-200 mt-1">
              {summary.mediumRiskCount}
            </span>
          </div>

          <div className="p-4 bg-emerald-950/40 border border-emerald-900/60 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-300 font-semibold">Safe / Low Risk</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="block text-2xl font-bold text-emerald-200 mt-1">
              {summary.lowRiskCount}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Control */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setFilterLevel('All')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterLevel === 'All'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Findings ({findings.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterLevel('High')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterLevel === 'High'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-rose-300'
            }`}
          >
            High Risk ({summary.highRiskCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterLevel('Medium')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterLevel === 'Medium'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            Medium Risk ({summary.mediumRiskCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterLevel('Low')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterLevel === 'Low'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-emerald-300'
            }`}
          >
            Safe/Low ({summary.lowRiskCount})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clause quotes..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

      </div>

      {/* Stack of Risk Cards */}
      <div className="space-y-4">
        {filteredFindings.length > 0 ? (
          filteredFindings.map((finding, idx) => (
            <RiskCard key={finding.id || idx} finding={finding} />
          ))
        ) : (
          <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400 text-sm">
            <Filter className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p>No risk findings match your selected filter or search query.</p>
          </div>
        )}
      </div>

    </div>
  );
};
