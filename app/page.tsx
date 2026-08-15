'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { InputCard } from '@/components/InputCard';
import { LoadingState } from '@/components/LoadingState';
import { RiskDashboard } from '@/components/RiskDashboard';
import { ComplianceDashboard } from '@/components/ComplianceDashboard';
import { TimeTravelDiff } from '@/components/TimeTravelDiff';
import { AnalyzeResponsePayload, TimeTravelResponsePayload, ScanMode } from '@/lib/types';
import { scanDocument, UnifiedScanSummary } from '@/lib/scanner';
import { ShieldCheck, ShieldAlert, Layers } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ScanMode>('instant');
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(['All']);
  
  // Results State
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponsePayload | null>(null);
  const [complianceSummary, setComplianceSummary] = useState<UnifiedScanSummary | null>(null);
  const [viewTab, setViewTab] = useState<'compliance' | 'riskCards'>('compliance');

  // Time Travel states
  const [isTimeTravelLoading, setIsTimeTravelLoading] = useState(false);
  const [timeTravelData, setTimeTravelData] = useState<TimeTravelResponsePayload | null>(null);

  // Error Banner
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAnalyze = async (payload: {
    type: 'url' | 'text';
    content: string;
    mode: ScanMode;
    selectedFrameworks?: string[];
    compareWithHistory?: boolean;
  }) => {
    setIsLoading(true);
    setAnalysisResult(null);
    setComplianceSummary(null);
    setTimeTravelData(null);
    setErrorMessage(null);

    const activeFrameworks = payload.selectedFrameworks || selectedFrameworks;

    // 100% OFFLINE STEP: Execute local scanDocument rule engine ONLY for instant scan mode
    if (payload.mode === 'instant') {
      try {
        const localCompliance = scanDocument(payload.content, activeFrameworks);
        setComplianceSummary(localCompliance);
        setViewTab('compliance');
      } catch (localErr) {
        console.warn('Local scan error:', localErr);
      }
    } else {
      setViewTab('riskCards');
    }

    // If URL & compareWithHistory enabled, trigger time travel in parallel
    if (payload.type === 'url' && payload.compareWithHistory) {
      setIsTimeTravelLoading(true);
      fetch('/api/time-travel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: payload.content })
      })
        .then((res) => res.json())
        .then((data) => setTimeTravelData(data))
        .catch((err) => console.warn('Time-travel trigger error:', err))
        .finally(() => setIsTimeTravelLoading(false));
    }

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: payload.type, 
          content: payload.content,
          text: payload.content,
          mode: payload.mode 
        })
      });

      const data: AnalyzeResponsePayload = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete legal audit.');
      }

      setAnalysisResult(data);
    } catch (err: any) {
      console.error('Audit submission error:', err);
      // If API fails or offline, local complianceSummary remains available!
      if (!complianceSummary) {
        setErrorMessage(err.message || 'An error occurred while analyzing the document.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setComplianceSummary(null);
    setTimeTravelData(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      
      {/* Navbar */}
      <Header />

      {/* Main Content Area */}
      <main className="mb-auto pb-16">
        
        {/* Hero Banner */}
        <Hero />

        {/* Input Card Container with Dual-Mode & Framework Selector */}
        {!analysisResult && !complianceSummary && !isLoading && (
          <InputCard 
            onAnalyze={handleAnalyze} 
            isLoading={isLoading} 
            mode={mode} 
            setMode={setMode} 
            selectedFrameworks={selectedFrameworks}
            setSelectedFrameworks={setSelectedFrameworks}
          />
        )}

        {/* Dynamic Loading Scanner Animation */}
        {isLoading && <LoadingState mode={mode} />}

        {/* Error Notification */}
        {errorMessage && !complianceSummary && (
          <div className="max-w-2xl mx-auto my-6 p-4 bg-rose-950/90 border border-rose-800 rounded-2xl text-rose-200 text-sm text-center">
            <p className="font-bold">Audit Error</p>
            <p className="mt-1 text-xs text-rose-300">{errorMessage}</p>
            <button
              onClick={handleReset}
              className="mt-3 px-4 py-1.5 bg-rose-950 hover:bg-rose-900 border border-rose-700 text-white rounded-lg text-xs font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results View Container */}
        {(analysisResult || complianceSummary) && (
          <div className="space-y-6">
            
            {/* View Switcher Tabs: Compliance Framework Grid vs Risk Clause Cards */}
            <div className="max-w-5xl mx-auto px-4 pt-4 flex items-center justify-center">
              <div className="p-1 bg-slate-900 border border-slate-800 rounded-2xl inline-flex space-x-1 shadow-lg">
                <button
                  type="button"
                  onClick={() => setViewTab('compliance')}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                    viewTab === 'compliance'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Framework Compliance Grid</span>
                </button>

                {analysisResult && (
                  <button
                    type="button"
                    onClick={() => setViewTab('riskCards')}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                      viewTab === 'riskCards'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Clause Risk Audit ({analysisResult.findings.length})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Optional Time-Travel Diff Banner */}
            {(timeTravelData || isTimeTravelLoading) && (
              <div className="max-w-5xl mx-auto px-4">
                <TimeTravelDiff timeTravelData={timeTravelData} isLoading={isTimeTravelLoading} />
              </div>
            )}

            {/* Tab 1: 100% Offline Compliance Grid */}
            {viewTab === 'compliance' && complianceSummary && (
              <ComplianceDashboard summary={complianceSummary} onReset={handleReset} />
            )}

            {/* Tab 2: Detailed Clause Risk Dashboard */}
            {viewTab === 'riskCards' && analysisResult && (
              <RiskDashboard data={analysisResult} onReset={handleReset} />
            )}

          </div>
        )}

      </main>

    </div>
  );
}
