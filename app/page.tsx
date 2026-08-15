'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { InputCard } from '@/components/InputCard';
import { LoadingState } from '@/components/LoadingState';
import { RiskDashboard } from '@/components/RiskDashboard';
import { TimeTravelDiff } from '@/components/TimeTravelDiff';
import { AnalyzeResponsePayload, TimeTravelResponsePayload, ScanMode } from '@/lib/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ScanMode>('instant');
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponsePayload | null>(null);
  
  // Time Travel states
  const [isTimeTravelLoading, setIsTimeTravelLoading] = useState(false);
  const [timeTravelData, setTimeTravelData] = useState<TimeTravelResponsePayload | null>(null);

  // Error Banner
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAnalyze = async (payload: { type: 'url' | 'text'; content: string; mode: ScanMode; compareWithHistory?: boolean }) => {
    setIsLoading(true);
    setAnalysisResult(null);
    setTimeTravelData(null);
    setErrorMessage(null);

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
      setErrorMessage(err.message || 'An error occurred while analyzing the document.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
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

        {/* Input Card Container with Dual-Mode Toggle */}
        {!analysisResult && !isLoading && (
          <InputCard 
            onAnalyze={handleAnalyze} 
            isLoading={isLoading} 
            mode={mode} 
            setMode={setMode} 
          />
        )}

        {/* Dynamic Loading Scanner Animation */}
        {isLoading && <LoadingState mode={mode} />}

        {/* Error Notification */}
        {errorMessage && (
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

        {/* Results Section */}
        {analysisResult && (
          <div>
            {/* Optional Time-Travel Diff Banner */}
            {(timeTravelData || isTimeTravelLoading) && (
              <div className="max-w-5xl mx-auto px-4">
                <TimeTravelDiff timeTravelData={timeTravelData} isLoading={isTimeTravelLoading} />
              </div>
            )}

            {/* Risk Dashboard & Cards */}
            <RiskDashboard data={analysisResult} onReset={handleReset} />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} TermsScanner AI Auditor. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="/contact" className="hover:text-slate-300 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
