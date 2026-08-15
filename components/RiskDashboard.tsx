'use client';

import React, { useState, useMemo } from 'react';
import { RiskFinding, AnalyzeResponsePayload } from '@/lib/types';
import { RiskCard } from './RiskCard';
import { ShieldAlert, AlertOctagon, CheckCircle, Download, FileText, Search, Filter, ShieldCheck, RefreshCw, ArrowLeft } from 'lucide-react';

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
    highRiskCount: findings.filter(f => ['CRITICAL', 'HIGH', 'High'].includes(f.riskLevel)).length,
    mediumRiskCount: findings.filter(f => ['MEDIUM', 'Medium'].includes(f.riskLevel)).length,
    lowRiskCount: findings.filter(f => ['LOW', 'Low'].includes(f.riskLevel)).length,
    overallRiskScore: Math.min(100, (findings.filter(f => ['CRITICAL', 'HIGH', 'High'].includes(f.riskLevel)).length * 25) + (findings.filter(f => ['MEDIUM', 'Medium'].includes(f.riskLevel)).length * 10))
  };

  // Filtered findings based on tab & search query
  const filteredFindings = useMemo(() => {
    return findings.filter((item) => {
      const levelStr = String(item.riskLevel).toUpperCase();
      const matchesLevel =
        filterLevel === 'All' ||
        (filterLevel === 'High' && (levelStr === 'HIGH' || levelStr === 'CRITICAL')) ||
        (filterLevel === 'Medium' && levelStr === 'MEDIUM') ||
        (filterLevel === 'Low' && levelStr === 'LOW');

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesLevel && matchesSearch;
    });
  }, [findings, filterLevel, searchQuery]);

  // Risk Level Badge formatting for overall score
  const score = summary.overallRiskScore;
  const isCriticalScore = score >= 60;
  const isModerateScore = score >= 30 && score < 60;

  const scoreColor = isCriticalScore
    ? 'text-rose-700 border-rose-200 bg-rose-50'
    : isModerateScore
    ? 'text-amber-700 border-amber-200 bg-amber-50'
    : 'text-emerald-700 border-emerald-200 bg-emerald-50';

  // Export as Markdown File
  const exportMarkdown = () => {
    let md = `# TermsScanner Audit Report: ${data.extractedTitle || 'Legal Document'}\n\n`;
    md += `**Overall Risk Score:** ${summary.overallRiskScore}/100\n`;
    md += `**Scan Mode:** ${data.mode === 'instant' ? 'Instant Regex Engine' : 'Deep AI Scan (Gemini)'}\n`;
    md += `**Total Scanned Clauses:** ${summary.totalClauses} | **High Risk:** ${summary.highRiskCount} | **Medium Risk:** ${summary.mediumRiskCount} | **Low/Safe:** ${summary.lowRiskCount}\n\n`;
    md += `---\n\n`;

    findings.forEach((f, idx) => {
      md += `### ${idx + 1}. [${String(f.riskLevel).toUpperCase()} RISK] ${f.title || f.category || 'Clause'}\n`;
      md += `> "${f.quote}"\n\n`;
      md += `**Why it is bad:** ${f.explanation}\n\n`;
      md += `**💡 Counter-Proposal:** ${f.suggestion}\n\n`;
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TermsScanner-Audit-Report-${Date.now()}.md`;
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
    a.download = `TermsScanner-Findings-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Print Report (triggers PDF print dialog)
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8 px-4 space-y-6 animate-fadeIn">
      
      {/* Top Bar with Prominent Back Button */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 rounded-xl text-xs font-extrabold transition-all shadow-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Scanner</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-slate-600 font-mono bg-white px-3 py-1.5 border border-slate-200 rounded-xl shadow-sm">
          <span>Engine:</span>
          <strong className="text-slate-900">
            {data.mode === 'instant' ? '⚡ Instant Offline' : '🧠 Gemini 2.5 AI'}
          </strong>
        </div>
      </div>

      {/* Overview Stats Dashboard Header */}
      <div className="p-6 sm:p-8 bg-white border border-slate-200/90 rounded-3xl shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          
          {/* Document Title & Type */}
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-800 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Audit Complete • Source: {data.sourceType.toUpperCase()}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {data.extractedTitle || 'Legal Risk Findings'}
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Scanned {data.rawTextLength.toLocaleString()} characters of agreement text
            </p>
          </div>

          {/* Overall Risk Score Meter */}
          <div className="flex items-center space-x-4">
            <div className={`p-4 rounded-2xl border ${scoreColor} text-center min-w-[140px] shadow-sm`}>
              <span className="block text-[10px] font-bold uppercase tracking-wider opacity-80">
                Overall Risk Index
              </span>
              <span className="text-3xl sm:text-4xl font-black tracking-tight">
                {summary.overallRiskScore}
                <span className="text-sm font-normal text-slate-500">/100</span>
              </span>
              <span className="block text-[11px] font-extrabold mt-0.5">
                {isCriticalScore ? 'CRITICAL RISK' : isModerateScore ? 'MODERATE RISK' : 'LOW RISK'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                onClick={onReset}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>New Audit</span>
              </button>

              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={exportMarkdown}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
                  title="Export Markdown Report"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>.MD</span>
                </button>
                <button
                  type="button"
                  onClick={exportJSON}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
                  title="Export Raw JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrintPDF}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
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
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <span className="text-xs text-slate-500 font-semibold">Total Clauses Scanned</span>
            <span className="block text-2xl font-bold text-slate-900 mt-1">
              {summary.totalClauses}
            </span>
          </div>

          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-rose-700 font-bold">High / Critical Risk</span>
              <AlertOctagon className="w-4 h-4 text-rose-600" />
            </div>
            <span className="block text-2xl font-bold text-rose-900 mt-1">
              {summary.highRiskCount}
            </span>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-700 font-bold">Medium Risk</span>
              <ShieldAlert className="w-4 h-4 text-amber-600" />
            </div>
            <span className="block text-2xl font-bold text-amber-900 mt-1">
              {summary.mediumRiskCount}
            </span>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-700 font-bold">Safe / Low Risk</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="block text-2xl font-bold text-emerald-900 mt-1">
              {summary.lowRiskCount}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Control */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 p-1.5 bg-white border border-slate-200 rounded-2xl w-full sm:w-auto shadow-sm">
          <button
            type="button"
            onClick={() => setFilterLevel('All')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterLevel === 'All'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Findings ({findings.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterLevel('High')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterLevel === 'High'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-rose-700'
            }`}
          >
            High/Critical ({summary.highRiskCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterLevel('Medium')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterLevel === 'Medium'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-amber-700'
            }`}
          >
            Medium ({summary.mediumRiskCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterLevel('Low')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterLevel === 'Low'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            Safe/Low ({summary.lowRiskCount})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clause quotes..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 shadow-sm"
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
          <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl text-slate-500 text-sm shadow-sm">
            <Filter className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p>No risk findings match your selected filter or search query.</p>
          </div>
        )}
      </div>

    </div>
  );
};
