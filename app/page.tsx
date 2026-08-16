'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { UniversalScanner } from '@/components/UniversalScanner';
import { 
  ShieldCheck, 
  Zap, 
  Brain, 
  ArrowRight, 
  Lock, 
  AlertTriangle, 
  CreditCard, 
  Database, 
  Gavel, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

export default function Home() {
  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does the offline keyword scanner work?",
      a: "The Instant Offline Keyword Scanner runs 100% locally in your web browser using client-side JavaScript regular expressions (regex). No text or document data is ever sent to an external server or database, giving you total data privacy with zero network latency."
    },
    {
      q: "When should I use AI analysis vs. offline keyword search?",
      a: "Use the Instant Offline Keyword Scanner for lightning-fast, confidential audits of regulatory checklists (GDPR, HIPAA, CCPA, SOC 2, PCI-DSS) or immediate red-flag detection. Use the Deep AI Scan (Gemini) when you need nuanced legal contextual reasoning, summaries of obscure legalese, and customized counter-proposal clauses."
    },
    {
      q: "Is Terms Scanner free to use?",
      a: "Yes! Terms Scanner is 100% free for individual users, legal researchers, SaaS founders, and privacy-conscious consumers."
    },
    {
      q: "Is any of my pasted text stored or shared?",
      a: "No. For Instant Offline Scans, your text remains in your device's browser memory and never travels over the network. For Deep AI Scans, text is processed ephemerally solely to generate your audit result and is never stored, retained, or sold."
    },
    {
      q: "Can Terms Scanner replace formal legal counsel?",
      a: "No. Terms Scanner provides automated heuristic analysis and educational risk identification. It does not constitute formal legal advice or an attorney-client relationship. For high-stakes contracts or litigation, consult a licensed attorney."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      
      {/* Navbar */}
      <Header />

      {/* Main Content Area */}
      <main className="mb-auto pb-16">
        
        {/* Hero Banner */}
        <Hero />

        {/* Master Universal Dual-Engine Scanner */}
        <UniversalScanner defaultEngine="instant" defaultScanType="general" defaultFrameworks={['All']} />

        {/* SECTION 1: Dual-Engine Highlights */}
        <section className="max-w-5xl mx-auto px-4 my-16 space-y-8">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-bold text-blue-800 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Dual-Engine Scanning Architecture</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Two Powerful Engines Built for Total Legal Protection
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
              Choose between instant client-side privacy checks or contextual AI deep dives depending on your security needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Engine 1 Card */}
            <div className="p-7 bg-white border border-slate-200/90 rounded-3xl shadow-lg hover:shadow-xl transition-all space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-inner">
                <Zap className="w-6 h-6 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-md">
                  Engine 1: Client-Side Privacy
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  Instant Offline Keyword Scanner
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Runs 100% locally inside your browser using fast regular expressions (regex). Zero data leaves your device, guaranteeing instant results with zero network latency and total privacy.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center space-x-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% Local Browser Memory Execution</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant Regulatory Checks (GDPR, HIPAA, CCPA, SOC 2)</span>
                </li>
              </ul>
            </div>

            {/* Engine 2 Card */}
            <div className="p-7 bg-white border border-slate-200/90 rounded-3xl shadow-lg hover:shadow-xl transition-all space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-inner">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-100/80 px-2.5 py-0.5 rounded-md">
                  Engine 2: Contextual AI Deep Dive
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  AI Contextual Deep Dive
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Powered by Google Gemini 2.5 Flash AI to dissect dense legal contracts, summarize obscure liabilities, spot hidden traps, and generate specific counter-proposal clauses.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Context-Aware Red-Flag Detection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Automated Legal Counter-Proposals & Suggestions</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* SECTION 2: Feature Breakdown */}
        <section className="max-w-5xl mx-auto px-4 my-16 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Comprehensive Risk & Red-Flag Detection Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Our engines automatically scan and flag critical contract risks across four core vulnerability zones:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Feature 1 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-2">
              <div className="flex items-center space-x-3 mb-1">
                <div className="p-2 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Auto-Renewal & Billing Traps Detection
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flags hidden recurring subscription charges, mandatory advance cancellation notice windows, non-refundable fee clauses, and price escalation rights.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-2">
              <div className="flex items-center space-x-3 mb-1">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Data Selling, Profiling & Tracker Discovery
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Exposes sneaky disclosures regarding third-party data broker sharing, ad targeting waivers, user telemetry monetization, and biometric data tracking.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-2">
              <div className="flex items-center space-x-3 mb-1">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
                  <Gavel className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Forced Arbitration & Class-Action Waiver Flags
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Identifies binding mandatory arbitration clauses, jury trial waivers, class-action bans, and unfavorable out-of-state legal venue selections.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-2">
              <div className="flex items-center space-x-3 mb-1">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Intellectual Property & Content Ownership Transfer
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Warns when user-generated content, copyright, trademarks, or personal data rights are transferred via overly broad perpetual licenses.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 3: Specialized Compliance Auditor Cards */}
        <section className="max-w-5xl mx-auto px-4 my-16 space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-bold text-blue-800 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Specialized SEO Compliance Engines</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dedicated Regulatory Auditing Tools
            </h2>
            <p className="text-xs text-slate-600 max-w-xl mx-auto">
              Direct access to specialized pre-configured compliance auditors and legal checklist guides.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Tool 1: GDPR */}
            <Link
              href="/gdpr-checker"
              className="p-5 bg-white border border-slate-200 hover:border-emerald-500/80 rounded-2xl transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                    EU GDPR
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  GDPR Checker
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-3">
                  Audit privacy policies against Articles 6, 13, 14, 17 (Erasure), and 37 (DPO).
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 mt-4 block">
                Open GDPR Auditor →
              </span>
            </Link>

            {/* Tool 2: HIPAA */}
            <Link
              href="/hipaa-audit"
              className="p-5 bg-white border border-slate-200 hover:border-blue-500/80 rounded-2xl transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-50 text-blue-800 border border-blue-200">
                    US Healthcare
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                  HIPAA BAA Audit
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-3">
                  Check Business Associate Agreements (BAAs) and PHI security safeguards.
                </p>
              </div>
              <span className="text-[11px] font-bold text-blue-700 mt-4 block">
                Open HIPAA Auditor →
              </span>
            </Link>

            {/* Tool 3: CCPA */}
            <Link
              href="/ccpa-compliance"
              className="p-5 bg-white border border-slate-200 hover:border-amber-500/80 rounded-2xl transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-50 text-amber-800 border border-amber-200">
                    California
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                  CCPA / CPRA Auditor
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-3">
                  Verify &quot;Do Not Sell/Share&quot; disclosures and 12-month lookback clauses.
                </p>
              </div>
              <span className="text-[11px] font-bold text-amber-700 mt-4 block">
                Open CCPA Auditor →
              </span>
            </Link>

            {/* Tool 4: SOC 2 */}
            <Link
              href="/soc2-evaluator"
              className="p-5 bg-white border border-slate-200 hover:border-purple-500/80 rounded-2xl transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-50 text-purple-800 border border-purple-200">
                    SaaS Security
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors">
                  SOC 2 Evaluator
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-3">
                  Evaluate SaaS vendor agreements against AICPA Trust Services Criteria.
                </p>
              </div>
              <span className="text-[11px] font-bold text-purple-700 mt-4 block">
                Open SOC 2 Evaluator →
              </span>
            </Link>

          </div>
        </section>

        {/* SECTION 4: Accordion FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 my-16 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs text-slate-600 max-w-xl mx-auto">
              Everything you need to know about our Dual-Engine legal auditing platform.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>

    </div>
  );
}
