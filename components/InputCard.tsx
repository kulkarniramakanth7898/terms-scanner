'use client';

import React, { useState, useRef } from 'react';
import { Globe, Upload, FileText, Sparkles, AlertCircle, FileCode, Clock, ArrowRight, Check } from 'lucide-react';
import { extractTextFromPDF } from '@/lib/pdf-parser';
import { SAMPLE_DOCUMENTS } from '@/lib/sample-docs';
import { SampleDoc } from '@/lib/types';

interface InputCardProps {
  onAnalyze: (payload: { type: 'url' | 'text'; content: string; compareWithHistory?: boolean }) => void;
  isLoading: boolean;
}

export const InputCard: React.FC<InputCardProps> = ({ onAnalyze, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'url' | 'pdf' | 'text' | 'samples'>('url');
  
  // URL Tab State
  const [url, setUrl] = useState('');
  const [compareWithHistory, setCompareWithHistory] = useState(true);
  
  // PDF Tab State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfExtractionProgress, setPdfExtractionProgress] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  
  // Text Tab State
  const [rawText, setRawText] = useState('');
  
  // Error state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle URL submit
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!url || !url.trim()) {
      setErrorMsg('Please enter a valid website URL.');
      return;
    }

    onAnalyze({
      type: 'url',
      content: url.trim(),
      compareWithHistory
    });
  };

  // Handle PDF upload and extraction
  const handleFileProcess = async (file: File) => {
    setErrorMsg(null);
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMsg('Please select a valid .pdf file.');
      return;
    }

    setSelectedFile(file);
    setPdfExtractionProgress('Extracting text natively in browser...');

    try {
      const extractedText = await extractTextFromPDF(file);
      setPdfExtractionProgress(`Successfully extracted ${extractedText.length.toLocaleString()} characters.`);
      
      // Submit extracted text to audit engine
      onAnalyze({
        type: 'text',
        content: extractedText
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to extract text from PDF.');
      setPdfExtractionProgress('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  // Handle Raw Text submit
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!rawText || rawText.trim().length < 20) {
      setErrorMsg('Please paste a longer document or contract excerpt (at least 20 characters).');
      return;
    }

    onAnalyze({
      type: 'text',
      content: rawText.trim()
    });
  };

  // Handle Sample selection
  const handleSelectSample = (sample: SampleDoc) => {
    setErrorMsg(null);
    if (sample.url) {
      setUrl(sample.url);
    }
    setRawText(sample.text);

    onAnalyze({
      type: 'text',
      content: sample.text
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl shadow-blue-950/30 overflow-hidden backdrop-blur-xl transition-all">
        
        {/* Tab Navigation Header */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => { setActiveTab('url'); setErrorMsg(null); }}
            className={`flex items-center space-x-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all shrink-0 ${
              activeTab === 'url'
                ? 'border-blue-500 text-blue-400 bg-slate-900/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Paste Website URL</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('pdf'); setErrorMsg(null); }}
            className={`flex items-center space-x-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all shrink-0 ${
              activeTab === 'pdf'
                ? 'border-blue-500 text-blue-400 bg-slate-900/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document (PDF)</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('text'); setErrorMsg(null); }}
            className={`flex items-center space-x-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all shrink-0 ${
              activeTab === 'text'
                ? 'border-blue-500 text-blue-400 bg-slate-900/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Paste Raw Text</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('samples'); setErrorMsg(null); }}
            className={`flex items-center space-x-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all shrink-0 ${
              activeTab === 'samples'
                ? 'border-blue-500 text-blue-400 bg-slate-900/80'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Sample Contracts</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6">
          
          {/* TAB 1: PASTE WEBSITE URL */}
          {activeTab === 'url' && (
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Enter Privacy Policy or Terms of Service URL
                </label>
                <div className="relative flex items-center">
                  <Globe className="absolute left-4 w-5 h-5 text-slate-500 pointer-events-none" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/privacy-policy"
                    disabled={isLoading}
                    className="w-full pl-12 pr-32 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !url.trim()}
                    className="absolute right-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-lg shadow-md shadow-blue-600/30 transition-all disabled:opacity-50 flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Scan URL</span>
                  </button>
                </div>
              </div>

              {/* Time-Travel Toggle */}
              <div className="flex items-center space-x-2 pt-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  id="timeTravelCheck"
                  checked={compareWithHistory}
                  onChange={(e) => setCompareWithHistory(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded bg-slate-950 border-slate-700 focus:ring-blue-500"
                />
                <label htmlFor="timeTravelCheck" className="cursor-pointer flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>
                    Enable <strong>Wayback Time-Travel</strong> (Compare with 1-Year-Ago Policy Snapshot)
                  </span>
                </label>
              </div>
            </form>
          )}

          {/* TAB 2: UPLOAD DOCUMENT (PDF) */}
          {activeTab === 'pdf' && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  isDragOver
                    ? 'border-blue-500 bg-blue-950/20 scale-[0.99]'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/80'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />
                <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-950/60 border border-blue-800/50 flex items-center justify-center text-blue-400 mb-3 shadow-inner">
                  <Upload className="w-7 h-7" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Drop your PDF contract or NDA here
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  100% Client-Side PDF parsing with <code className="text-blue-300 bg-slate-900 px-1 py-0.5 rounded">pdfjs-dist</code>. Your document is processed locally in your browser.
                </p>

                {selectedFile && (
                  <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1.5 bg-blue-950/90 border border-blue-700/60 rounded-lg text-xs font-semibold text-blue-200">
                    <FileCode className="w-4 h-4 text-blue-400" />
                    <span>{selectedFile.name}</span>
                    <span className="text-slate-400">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                  </div>
                )}

                {pdfExtractionProgress && (
                  <p className="mt-2 text-xs font-medium text-emerald-400 animate-pulse">
                    {pdfExtractionProgress}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PASTE RAW TEXT */}
          {activeTab === 'text' && (
            <form onSubmit={handleTextSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Paste Agreement Text
                </label>
                <textarea
                  rows={6}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste the terms of service, NDA, or privacy policy agreement text here..."
                  disabled={isLoading}
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono leading-relaxed"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading || rawText.trim().length < 20}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Audit Text</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: SAMPLE PRESETS */}
          {activeTab === 'samples' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 mb-3">
                Click any sample contract below to test PrivacyLens immediately with realistic predatory clauses:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SAMPLE_DOCUMENTS.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className="p-4 bg-slate-950/70 border border-slate-800 hover:border-blue-500/60 rounded-xl cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-950/40 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          sample.type === 'contract' ? 'bg-rose-950 text-rose-300 border border-rose-800/60' :
                          sample.type === 'nda' ? 'bg-purple-950 text-purple-300 border border-purple-800/60' :
                          'bg-amber-950 text-amber-300 border border-amber-800/60'
                        }`}>
                          {sample.type}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <h4 className="text-sm font-bold text-white mt-2 group-hover:text-blue-300 transition-colors">
                        {sample.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {sample.description}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center space-x-1 text-[11px] text-blue-400 font-semibold">
                      <span>Click to scan sample</span>
                      <Check className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mt-4 p-3.5 bg-rose-950/80 border border-rose-800/80 rounded-xl text-rose-200 text-xs flex items-center space-x-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
