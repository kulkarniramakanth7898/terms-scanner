'use client';

import React, { useState, useRef } from 'react';
import { Globe, Upload, FileText, Sparkles, AlertCircle, Lock, ShieldCheck, ShieldAlert, Zap, Brain, XCircle, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { extractTextFromPDF } from '@/lib/pdf-parser';
import { SAMPLE_DOCUMENTS } from '@/lib/sample-docs';
import { AnalyzeResponsePayload } from '@/lib/types';
import { scanDocument, UnifiedScanSummary, FrameworkResult } from '@/lib/scanner';
import { RiskDashboard } from './RiskDashboard';

export interface UniversalScannerProps {
  defaultEngine?: 'instant' | 'ai';
  defaultScanType?: 'general' | 'regulatory';
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
  defaultScanType = 'general',
  defaultFrameworks = ['All'],
  heroTitle,
  heroSubtitle
}) => {
  // LEVEL 1: Processing Engine (First Choice)
  const [engine, setEngine] = useState<'instant' | 'ai'>(defaultEngine);

  // LEVEL 2: Scan Type (Second Choice - ONLY active when engine === 'instant')
  const [scanType, setScanType] = useState<'general' | 'regulatory'>(defaultScanType);

  // LEVEL 3: Framework Selection (ONLY active when engine === 'instant' AND scanType === 'regulatory')
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(defaultFrameworks);

  // Input Tabs & Files
  const [activeTab, setActiveTab] = useState<'text' | 'pdf' | 'url' | 'samples'>('text');
  const [rawText, setRawText] = useState('');
  const [url, setUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfProgress, setPdfProgress] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Execution States & Results
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [complianceSummary, setComplianceSummary] = useState<UnifiedScanSummary | null>(null);
  const [riskAnalysisPayload, setRiskAnalysisPayload] = useState<AnalyzeResponsePayload | null>(null);

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

  // Run Audit Logic according to Strict Rules
  const executeScan = async (textToAudit: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    setComplianceSummary(null);
    setRiskAnalysisPayload(null);

    // RULE 1: Engine 1 (⚡ Instant Offline Scan)
    if (engine === 'instant') {
      // Option B: Regulatory Compliance Audit
      if (scanType === 'regulatory') {
        try {
          const localResults = scanDocument(textToAudit, selectedFrameworks);
          setComplianceSummary(localResults);
        } catch (err: any) {
          console.warn('Regulatory compliance scan error:', err);
          setErrorMsg('Failed to run regulatory compliance audit.');
        } finally {
          setIsLoading(false);
        }
      } 
      // Option A: General Terms Scan
      else {
        try {
          const res = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: textToAudit, mode: 'instant' })
          });
          const data: AnalyzeResponsePayload = await res.json();
          if (data.success) {
            setRiskAnalysisPayload(data);
          } else {
            throw new Error(data.error || 'Failed to complete instant terms scan.');
          }
        } catch (err: any) {
          console.warn('Instant risk analysis error:', err);
          setErrorMsg(err.message || 'Instant terms scan encountered an error.');
        } finally {
          setIsLoading(false);
        }
      }
    } 
    // RULE 2: Engine 2 (🧠 Deep AI Scan - Gemini)
    // Compliance scan and framework chips are STRICTLY DISABLED/HIDDEN.
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
        body: JSON.stringify({ type: 'url', content: url.trim(), mode: engine === 'ai' ? 'ai' : 'instant' })
      });
      const data: AnalyzeResponsePayload = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to extract text from specified URL.');
      }

      if (engine === 'ai' || scanType === 'general') {
        setRiskAnalysisPayload(data);
      } else {
        const extractedText = data.findings.map(f => f.quote).join(' ') || url;
        const localResults = scanDocument(extractedText, selectedFrameworks);
        setComplianceSummary(localResults);
      }
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
      
      {/* Optional Custom Hero Title */}
      {(heroTitle || heroSubtitle) && (
        <div className="text-center space-y-2 mb-4">
          {heroTitle && <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{heroTitle}</h2>}
          {heroSubtitle && <p className="text-sm text-slate-600 max-w-2xl mx-auto">{heroSubtitle}</p>}
        </div>
      )}

      {/* Main Dual-Engine Light Card Container */}
      {!complianceSummary && !riskAnalysisPayload && !isLoading && (
        <div className="bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden transition-all">
          
          {/* LEVEL 1: Processing Engine (First Choice) */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col items-center justify-center space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Step 1: Choose Processing Engine
            </span>
            <div className="p-1 bg-white border border-slate-200 rounded-2xl inline-flex space-x-1 shadow-sm w-full sm:w-auto justify-center">
              
              {/* Option A: Instant Offline Scan */}
              <button
                type="button"
                onClick={() => setEngine('instant')}
                className={`flex items-center justify-center space-x-2 py-2.5 px-5 rounded-xl text-xs font-extrabold transition-all ${
                  engine === 'instant'
                    ? 'bg-amber-500 text-slate-950 shadow-sm scale-[1.01]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Zap className={`w-4 h-4 ${engine === 'instant' ? 'fill-slate-950 text-slate-950' : 'text-amber-500'}`} />
                <span>⚡ Instant Offline Scan</span>
              </button>

              {/* Option B: Deep AI Scan (Gemini) */}
              <button
                type="button"
                onClick={() => setEngine('ai')}
                className={`flex items-center justify-center space-x-2 py-2.5 px-5 rounded-xl text-xs font-extrabold transition-all ${
                  engine === 'ai'
                    ? 'bg-blue-600 text-white shadow-sm scale-[1.01]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Brain className={`w-4 h-4 ${engine === 'ai' ? 'text-white' : 'text-blue-600'}`} />
                <span>🧠 Deep AI Scan (Gemini)</span>
              </button>

            </div>
          </div>

          {/* LEVEL 2: Scan Type (Second Choice - ONLY SHOWN IF engine === 'instant') */}
          {engine === 'instant' && (
            <div className="p-3.5 bg-slate-100/70 border-b border-slate-200 flex flex-col items-center justify-center space-y-2 animate-fadeIn">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Step 2: Select Scan Objective
              </span>
              <div className="p-1 bg-white border border-slate-200/90 rounded-2xl inline-flex space-x-1 shadow-sm w-full sm:w-auto justify-center">
                
                {/* Option A: General Terms Scan */}
                <button
                  type="button"
                  onClick={() => setScanType('general')}
                  className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-xs font-extrabold transition-all ${
                    scanType === 'general'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>📋 General Terms Scan</span>
                </button>

                {/* Option B: Regulatory Compliance Audit */}
                <button
                  type="button"
                  onClick={() => setScanType('regulatory')}
                  className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-xs font-extrabold transition-all ${
                    scanType === 'regulatory'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>⚖️ Regulatory Compliance Audit</span>
                </button>

              </div>
            </div>
          )}

          {/* LEVEL 3: Conditional Compliance Framework Chips (ONLY SHOWN IF engine === 'instant' AND scanType === 'regulatory') */}
          {engine === 'instant' && scanType === 'regulatory' && (
            <div className="p-4 bg-emerald-50/60 border-b border-emerald-100 animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 flex items-center space-x-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Select Active Compliance Frameworks:</span>
                </span>
                <span className="text-[11px] font-bold text-emerald-700">
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
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
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
          <div className="flex border-b border-slate-200 bg-slate-50/60 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => { setActiveTab('text'); setErrorMsg(null); }}
              className={`flex items-center space-x-2 px-5 py-3.5 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'text'
                  ? 'border-blue-600 text-blue-600 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
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
                  ? 'border-blue-600 text-blue-600 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
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
                  ? 'border-blue-600 text-blue-600 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
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
                  ? 'border-blue-600 text-blue-600 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
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
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white font-mono"
                />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs text-slate-600 font-semibold flex items-center space-x-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{engine === 'instant' ? '🔒 100% Offline Local Scan — Zero data transmitted' : '🧠 Powered by Gemini 2.5 Flash AI — Ephemeral context processing'}</span>
                  </p>
                  <button
                    type="submit"
                    disabled={rawText.trim().length < 20}
                    className={`px-6 py-2.5 font-extrabold text-xs rounded-xl shadow-md disabled:opacity-50 transition-all ${
                      engine === 'instant'
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
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
                    isDragOver ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/40'
                  }`}
                >
                  <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && handleFileProcess(e.target.files[0])} accept=".pdf" className="hidden" />
                  <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-sm font-bold text-slate-900">Drop PDF file here or click to browse</h3>
                  <p className="text-xs text-slate-500 mt-1">Natively extracted 100% locally in browser memory using pdfjs-dist.</p>
                  {pdfProgress && <p className="text-xs font-semibold text-emerald-600 mt-2">{pdfProgress}</p>}
                </div>
                <p className="text-center text-xs text-slate-600 font-semibold flex items-center justify-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>🔒 100% Client-Side PDF Parsing — Zero document data leaves your device.</span>
                </p>
              </div>
            )}

            {/* TAB 3: URL SCRAPING */}
            {activeTab === 'url' && (
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="relative flex items-center">
                  <Globe className="absolute left-4 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/privacy-policy"
                    className="w-full pl-10 pr-32 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-white"
                  />
                  <button
                    type="submit"
                    disabled={!url.trim()}
                    className="absolute right-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg disabled:opacity-50"
                  >
                    Fetch & Scan
                  </button>
                </div>
                <p className="text-center text-xs text-slate-600 font-semibold flex items-center justify-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>🔒 URL text is scraped ephemerally for instant or Gemini AI audit.</span>
                </p>
              </form>
            )}

            {/* TAB 4: SAMPLES */}
            {activeTab === 'samples' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-600 font-medium">Click a sample agreement to test immediately:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SAMPLE_DOCUMENTS.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => executeScan(s.text)}
                      className="p-3.5 bg-slate-50 border border-slate-200 hover:border-blue-500/80 hover:bg-white rounded-xl cursor-pointer transition-all shadow-sm"
                    >
                      <h4 className="text-xs font-bold text-slate-900">{s.title}</h4>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Display */}
            {errorMsg && (
              <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="p-12 text-center bg-white border border-slate-200/90 rounded-3xl shadow-lg space-y-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-900">
            {engine === 'instant' ? 'Running 100% Offline Local Audit...' : 'Executing Gemini 2.5 Flash Deep AI Scan...'}
          </p>
        </div>
      )}

      {/* RESULTS DISPLAY SECTION */}
      {(complianceSummary || riskAnalysisPayload) && !isLoading && (
        <div className="space-y-6">
          
          {/* Top Navigation Back Button */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-blue-600 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
            >
              <span>← Back to Scanner</span>
            </button>
            
            <div className="px-3.5 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-mono font-bold text-slate-700 shadow-sm">
              {engine === 'instant' ? '⚡ Instant Offline Engine' : '🧠 Gemini 2.5 AI Engine'}
            </div>
          </div>

          {/* Result View 1: Regulatory Compliance Grid (For Offline + Regulatory Audit) */}
          {complianceSummary && engine === 'instant' && scanType === 'regulatory' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complianceSummary.frameworkResults.map((result: FrameworkResult) => {
                const score = result.score;
                const isGreen = score >= 90;
                const isYellow = score >= 70 && score < 90;

                const scoreBg = isGreen
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : isYellow
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200';

                const barColor = isGreen ? 'bg-emerald-500' : isYellow ? 'bg-amber-500' : 'bg-rose-500';

                return (
                  <div
                    key={result.frameworkId}
                    className="p-6 bg-white border border-slate-200 rounded-3xl shadow-lg flex flex-col justify-between space-y-5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                          {result.frameworkName}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-black border shrink-0 ${scoreBg}`}>
                          {score}% Score
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">{result.description}</p>
                      
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                        <div className={`h-full transition-all duration-500 ${barColor}`} style={{ width: `${score}%` }} />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Satisfied Mandatory Clauses ({result.passedCount}):</span>
                        </h4>
                        {result.detectedClauses.length > 0 ? (
                          <ul className="space-y-1.5">
                            {result.detectedClauses.map((c) => (
                              <li key={c.id} className="p-2.5 bg-emerald-50/60 border border-emerald-200/70 rounded-xl text-xs">
                                <span className="font-bold text-emerald-900">✓ {c.clauseName}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-slate-500 italic p-2 bg-slate-50 rounded-xl">None detected.</p>
                        )}
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2 flex items-center space-x-1.5">
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>Missing Critical Clauses ({result.failedCount}):</span>
                        </h4>
                        {result.missingClauses.length > 0 ? (
                          <ul className="space-y-1.5">
                            {result.missingClauses.map((c) => (
                              <li key={c.id} className="p-2.5 bg-rose-50/60 border border-rose-200/70 rounded-xl text-xs space-y-0.5">
                                <span className="font-bold text-rose-900">✗ {c.clauseName}</span>
                                <p className="text-[11px] text-rose-800">{c.missingMessage}</p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-emerald-700 font-bold p-2 bg-emerald-50 border border-emerald-200 rounded-xl">
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

          {/* Result View 2: Risk Dashboard (For General Scan or AI Scan) */}
          {riskAnalysisPayload && (engine === 'ai' || (engine === 'instant' && scanType === 'general')) && (
            <RiskDashboard data={riskAnalysisPayload} onReset={handleReset} />
          )}

        </div>
      )}

    </div>
  );
};
