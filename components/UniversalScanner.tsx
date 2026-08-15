'use client';

import React, { useState, useRef } from 'react';
import { Globe, Upload, FileText, Sparkles, AlertCircle, FileCode, Clock, ArrowRight, Check, Lock, ShieldCheck, ShieldAlert, Zap, Brain, XCircle, CheckCircle2 } from 'lucide-react';
import { extractTextFromPDF } from '@/lib/pdf-parser';
import { SAMPLE_DOCUMENTS } from '@/lib/sample-docs';
import { SampleDoc, ScanMode, AnalyzeResponsePayload } from '@/lib/types';
import { scanDocument, UnifiedScanSummary, FrameworkResult } from '@/lib/scanner';
import { RiskDashboard } from './RiskDashboard';

export interface UniversalScannerProps {
  defaultEngine?: 'instant' | 'ai';
  defaultMode?: 'general' | 'regulatory';
  defaultFrameworks?: string[];
  heroTitle?: string;
  heroSubtitle?: string;
}

export const FRAMEWORK_CHIPS = [
  { id: 'All', label: 'All Frameworks' },
  { id: 'gdpr', label: 'GDPR' },
  { id: 'hipaa', label: 'HIPAA' },
  { id: 'ccpa', label: 'CCPA' },
  { id: 'soc2', label: 'SOC 2' },
  { id: 'pci-dss', label: 'PCI-DSS' },
  { id: 'dpdp', label: 'DPDP Act (India)' }
];

export const UniversalScanner: React.FC<UniversalScannerProps> = ({
  defaultEngine = 'instant',
  defaultMode = 'general',
  defaultFrameworks = ['All'],
  heroTitle,
  heroSubtitle
}) => {
  const [engine, setEngine] = useState<'instant' | 'ai'>(defaultEngine);
  const [scannerMode, setScannerMode] = useState<'general' | 'regulatory'>(defaultMode);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(defaultFrameworks);
  const [activeTab, setActiveTab] = useState<'text' | 'pdf' | 'url' | 'samples'>('text');

  // Form Inputs
  const [rawText, setRawText] = useState('');
  const [url, setUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfProgress, setPdfProgress] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Status & Results
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [complianceSummary, setComplianceSummary] = useState<UnifiedScanSummary | null>(null);
  const [riskAnalysisPayload, setRiskAnalysisPayload] = useState<AnalyzeResponsePayload | null>(null);
  const [viewTab, setViewTab] = useState<'compliance' | 'riskCards'>('compliance');

  // Toggle Framework Chip Selection
  const handleFrameworkToggle = (id: string) => {
    if (id === 'All') {
      setSelectedFrameworks(['All']);
      return;
    }
    let next = selectedFrameworks.filter(f => f !== 'All');
    if (next.includes(id)) {
      next = next.filter(f => f !== id);
    } else {
      next.push(id);
    }
    if (next.length === 0 || next.length === FRAMEWORK_CHIPS.length - 1) {
      setSelectedFrameworks(['All']);
    } else {
      setSelectedFrameworks(next);
    }
  };

  // Run Audit Logic according to selected Engine (Instant Offline vs Deep AI Gemini)
  const executeScan = async (textToAudit: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    setComplianceSummary(null);
    setRiskAnalysisPayload(null);

    // ENGINE A: INSTANT OFFLINE SCAN (100% Browser Regex & Compliance Engine)
    if (engine === 'instant') {
      try {
        const localResults = scanDocument(textToAudit, selectedFrameworks);
        setComplianceSummary(localResults);
        setViewTab('compliance');

        // Also generate instant risk findings locally via API instant mode
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: textToAudit, mode: 'instant' })
        });
        const data: AnalyzeResponsePayload = await res.json();
        if (data.success) {
          setRiskAnalysisPayload(data);
        }
      } catch (err: any) {
        console.warn('Local scan error:', err);
      } finally {
        setIsLoading(false);
      }
    } 
    // ENGINE B: DEEP AI SCAN (Gemini API 2.5 Flash)
    else {
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: textToAudit,
            mode: 'ai'
          })
        });
        const data: AnalyzeResponsePayload = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to complete Deep AI Gemini Audit.');
        }
        setRiskAnalysisPayload(data);
        setViewTab('riskCards');

        // Optional local compliance overview
        const localResults = scanDocument(textToAudit, selectedFrameworks);
        setComplianceSummary(localResults);
      } catch (aiErr: any) {
        console.error('Deep AI scan error:', aiErr);
        setErrorMsg(aiErr.message || 'Gemini AI scan encountered an error.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // URL Submit Handler
  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setErrorMsg('Please enter a valid website URL.');
      return;
    }
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'url', content: url.trim(), mode: engine })
      });
      const data: AnalyzeResponsePayload = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to extract text from specified URL.');
      }
      setRiskAnalysisPayload(data);

      const extractedText = data.findings.map(f => f.quote).join(' ') || url;
      const localResults = scanDocument(extractedText, selectedFrameworks);
      setComplianceSummary(localResults);

      if (engine === 'instant') setViewTab('compliance');
      else setViewTab('riskCards');
    } catch (err: any) {
      setErrorMsg(err.message || 'URL scraping failed. Please paste text directly.');
    } finally {
      setIsLoading(false);
    }
  };

  // PDF Upload Handler
  const handleFileProcess = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMsg('Please select a valid .pdf document.');
      return;
    }
    setSelectedFile(file);
    setPdfProgress('Extracting text 100% locally in browser...');

    try {
      const text = await extractTextFromPDF(file);
      setPdfProgress(`Extracted ${text.length.toLocaleString()} characters.`);
      await executeScan(text);
    } catch (err: any) {
      setErrorMsg(err.message || 'PDF extraction failed.');
      setPdfProgress('');
    }
  };

  const handleReset = () => {
    setComplianceSummary(null);
    setRiskAnalysisPayload(null);
    setErrorMsg(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4 space-y-6">
      
      {/* Optional Hero Title / Header */}
      {(heroTitle || heroSubtitle) && (
        <div className="text-center space-y-2 mb-4">
          {heroTitle && <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{heroTitle}</h2>}
          {heroSubtitle && <p className="text-sm text-slate-400 max-w-2xl mx-auto">{heroSubtitle}</p>}
        </div>
      )}

      {/* Main Dual-Engine Scanner Container */}
      {!complianceSummary && !riskAnalysisPayload && !isLoading && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl transition-all">
          
          {/* Dual Engine Switcher Bar */}
          <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            <div className="p-1 bg-slate-900 border border-slate-800 rounded-2xl inline-flex space-x-1 w-full sm:w-auto justify-center">
              
              {/* Engine A: Instant Offline Scan */}
              <button
                type="button"
                onClick={() => setEngine('instant')}
                className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all ${
                  engine === 'instant'
                    ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-md scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className={`w-4 h-4 ${engine === 'instant' ? 'fill-slate-950 text-slate-950' : 'text-amber-400'}`} />
                <span>⚡ Instant Offline Scan</span>
              </button>

              {/* Engine B: Deep AI Scan (Gemini) */}
              <button
                type="button"
                onClick={() => setEngine('ai')}
                className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all ${
                  engine === 'ai'
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-md scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Brain className={`w-4 h-4 ${engine === 'ai' ? 'text-blue-100' : 'text-blue-400'}`} />
                <span>🧠 Deep AI Scan (Gemini)</span>
              </button>

            </div>

            {/* Sub-Mode Selector Pills */}
            <div className="flex items-center space-x-1.5 text-xs">
              <button
                type="button"
                onClick={() => setScannerMode('general')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  scannerMode === 'general' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                General Terms
              </button>
              <button
                type="button"
                onClick={() => setScannerMode('regulatory')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  scannerMode === 'regulatory' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Regulatory Audit
              </button>
            </div>

          </div>

          {/* Mode 2: Framework Selectors (For Instant Scan or Regulatory Audit) */}
          {(scannerMode === 'regulatory' || engine === 'instant') && (
            <div className="p-4 bg-slate-950/60 border-b border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select Compliance Frameworks:
                </span>
                <span className="text-[11px] font-mono text-amber-400">
                  {selectedFrameworks.includes('All') ? 'All Frameworks Active' : `${selectedFrameworks.length} Selected`}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {FRAMEWORK_CHIPS.map((chip) => {
                  const isSel = selectedFrameworks.includes('All') ? chip.id === 'All' : selectedFrameworks.includes(chip.id);
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => handleFrameworkToggle(chip.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isSel
                          ? 'bg-amber-950 text-amber-300 border-amber-600 shadow-sm'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <span>{chip.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Channel Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/40 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => { setActiveTab('text'); setErrorMsg(null); }}
              className={`flex items-center space-x-2 px-5 py-3.5 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'text'
                  ? 'border-blue-500 text-blue-400 bg-slate-900/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Paste Raw Text</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('pdf'); setErrorMsg(null); }}
              className={`flex items-center space-x-2 px-5 py-3.5 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'pdf'
                  ? 'border-blue-500 text-blue-400 bg-slate-900/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload PDF (Offline)</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('url'); setErrorMsg(null); }}
              className={`flex items-center space-x-2 px-5 py-3.5 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'url'
                  ? 'border-blue-500 text-blue-400 bg-slate-900/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Paste Website URL</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('samples'); setErrorMsg(null); }}
              className={`flex items-center space-x-2 px-5 py-3.5 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'samples'
                  ? 'border-blue-500 text-blue-400 bg-slate-900/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Sample Contracts</span>
            </button>
          </div>

          {/* Tab Body */}
          <div className="p-6">
            
            {/* TAB 1: RAW TEXT */}
            {activeTab === 'text' && (
              <form onSubmit={(e) => { e.preventDefault(); if (rawText.trim().length >= 20) executeScan(rawText); }} className="space-y-4">
                <textarea
                  rows={6}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste document terms, NDA, privacy policy, or vendor agreement text here..."
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono"
                />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs text-slate-400 font-medium flex items-center space-x-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{engine === 'instant' ? '🔒 100% Offline Local Scan — Zero data transmitted.' : '🧠 Powered by Gemini 2.5 Flash AI.'}</span>
                  </p>
                  <button
                    type="submit"
                    disabled={rawText.trim().length < 20}
                    className={`px-6 py-2.5 font-extrabold text-xs rounded-xl shadow-lg disabled:opacity-50 ${
                      engine === 'instant'
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    }`}
                  >
                    Run {engine === 'instant' ? '⚡ Instant Scan' : '🧠 Deep AI Audit'}
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: PDF UPLOAD */}
            {activeTab === 'pdf' && (
              <div className="space-y-4">
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setIsDragOver(false); if (e.dataTransfer.files[0]) handleFileProcess(e.dataTransfer.files[0]); }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    isDragOver ? 'border-blue-500 bg-blue-950/20' : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
                  }`}
                >
                  <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && handleFileProcess(e.target.files[0])} accept=".pdf" className="hidden" />
                  <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-sm font-bold text-white">Drop PDF file here or click to browse</h3>
                  <p className="text-xs text-slate-400 mt-1">Natively extracted 100% locally in browser memory using pdfjs-dist.</p>
                  {pdfProgress && <p className="text-xs font-semibold text-emerald-400 mt-2">{pdfProgress}</p>}
                </div>
                <p className="text-center text-xs text-slate-400 font-medium flex items-center justify-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>🔒 100% Client-Side PDF Parsing — No document data leaves your device.</span>
                </p>
              </div>
            )}

            {/* TAB 3: URL SCRAPING */}
            {activeTab === 'url' && (
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="relative flex items-center">
                  <Globe className="absolute left-4 w-4 h-4 text-slate-500" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/privacy-policy"
                    className="w-full pl-10 pr-32 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <button
                    type="submit"
                    disabled={!url.trim()}
                    className="absolute right-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg disabled:opacity-50"
                  >
                    Fetch & Scan
                  </button>
                </div>
                <p className="text-center text-xs text-slate-400 font-medium flex items-center justify-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>🔒 URL text is scraped ephemerally for instant or Gemini AI audit.</span>
                </p>
              </form>
            )}

            {/* TAB 4: SAMPLES */}
            {activeTab === 'samples' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Click a sample agreement to test immediately:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SAMPLE_DOCUMENTS.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => executeScan(s.text)}
                      className="p-3.5 bg-slate-950 border border-slate-800 hover:border-blue-500/60 rounded-xl cursor-pointer transition-all"
                    >
                      <h4 className="text-xs font-bold text-white">{s.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Display */}
            {errorMsg && (
              <div className="mt-4 p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-rose-200 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="p-12 text-center bg-slate-900/90 border border-slate-800 rounded-3xl shadow-xl space-y-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-white">
            {engine === 'instant' ? 'Running 100% Offline Local Audit...' : 'Executing Gemini 2.5 Flash Deep AI Scan...'}
          </p>
        </div>
      )}

      {/* RESULTS DISPLAY SECTION */}
      {(complianceSummary || riskAnalysisPayload) && !isLoading && (
        <div className="space-y-6">
          
          {/* Top Navigation & View Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-blue-400 rounded-xl text-xs font-bold flex items-center space-x-1.5"
            >
              <span>← Back to Scanner</span>
            </button>

            {/* Tab switcher between Compliance Grid & Risk Clause Cards */}
            <div className="p-1 bg-slate-900 border border-slate-800 rounded-xl flex space-x-1">
              <button
                type="button"
                onClick={() => setViewTab('compliance')}
                className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                  viewTab === 'compliance' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Framework Compliance Grid
              </button>
              {riskAnalysisPayload && (
                <button
                  type="button"
                  onClick={() => setViewTab('riskCards')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                    viewTab === 'riskCards' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Clause Risk Audit ({riskAnalysisPayload.findings.length})
                </button>
              )}
            </div>
          </div>

          {/* View Tab 1: Regulatory Compliance Grid */}
          {viewTab === 'compliance' && complianceSummary && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complianceSummary.frameworkResults.map((result: FrameworkResult) => {
                const score = result.score;
                const isGreen = score >= 90;
                const isYellow = score >= 70 && score < 90;

                const scoreBg = isGreen
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : isYellow
                  ? 'bg-amber-950 text-amber-300 border-amber-800'
                  : 'bg-rose-950 text-rose-300 border-rose-800';

                const barColor = isGreen ? 'bg-emerald-500' : isYellow ? 'bg-amber-500' : 'bg-rose-500';

                return (
                  <div
                    key={result.frameworkId}
                    className="p-6 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-xl backdrop-blur-xl flex flex-col justify-between space-y-5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base font-extrabold text-white tracking-tight">
                          {result.frameworkName}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-black border shrink-0 ${scoreBg}`}>
                          {score}% Score
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">{result.description}</p>
                      
                      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div className={`h-full transition-all duration-500 ${barColor}`} style={{ width: `${score}%` }} />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-800">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Satisfied Mandatory Clauses ({result.passedCount}):</span>
                        </h4>
                        {result.detectedClauses.length > 0 ? (
                          <ul className="space-y-1.5">
                            {result.detectedClauses.map((c) => (
                              <li key={c.id} className="p-2.5 bg-emerald-950/30 border border-emerald-900/50 rounded-xl text-xs">
                                <span className="font-bold text-emerald-200">✓ {c.clauseName}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-slate-500 italic p-2 bg-slate-950 rounded-xl">None detected.</p>
                        )}
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center space-x-1.5">
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          <span>Missing Critical Clauses ({result.failedCount}):</span>
                        </h4>
                        {result.missingClauses.length > 0 ? (
                          <ul className="space-y-1.5">
                            {result.missingClauses.map((c) => (
                              <li key={c.id} className="p-2.5 bg-rose-950/30 border border-rose-900/50 rounded-xl text-xs space-y-0.5">
                                <span className="font-bold text-rose-200">✗ {c.clauseName}</span>
                                <p className="text-[11px] text-rose-300/90">{c.missingMessage}</p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-emerald-400 font-semibold p-2 bg-emerald-950/40 border border-emerald-900/60 rounded-xl">
                            ✓ 100% Fully Compliant for this framework!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* View Tab 2: Detailed Clause Risk Audit Dashboard */}
          {viewTab === 'riskCards' && riskAnalysisPayload && (
            <RiskDashboard data={riskAnalysisPayload} onReset={handleReset} />
          )}

        </div>
      )}

    </div>
  );
};
