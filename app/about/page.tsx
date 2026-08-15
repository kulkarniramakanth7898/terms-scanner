import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Cpu, Scale, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | TermsScanner',
  description: 'Learn about TermsScanner AI legal & compliance auditor with 100% offline client-side parsing.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400" />
            <span>Back to TermsScanner</span>
          </Link>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-white tracking-tight">TermsScanner</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          
          <div>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-950/80 border border-blue-800/60 rounded-full text-xs font-semibold text-blue-300 mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>About Our Technology</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              About TermsScanner
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Empowering consumers and enterprises with instant, zero-latency, 100% offline legal risk detection.
            </p>
          </div>

          <hr className="border-slate-800" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
              <Lock className="w-6 h-6 text-emerald-400" />
              <h3 className="text-base font-bold text-white">100% Local Privacy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                PDF files and document text are parsed inside your browser. Zero document text is stored on our servers.
              </p>
            </div>

            <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
              <Scale className="w-6 h-6 text-blue-400" />
              <h3 className="text-base font-bold text-white">Multi-Framework Audit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instant regex evaluation for GDPR, HIPAA, CCPA, SOC 2, and PCI-DSS compliance clauses.
              </p>
            </div>

            <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
              <Cpu className="w-6 h-6 text-purple-400" />
              <h3 className="text-base font-bold text-white">Dual-Mode AI Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose between zero-cost instant regex rule scanning and Gemini 2.5 Flash deep semantic AI analysis.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold text-white">Our Mission</h2>
            <p>
              Legal contracts, Terms of Service, and Privacy Policies are often intentionally convoluted. TermsScanner was created to equalize the playing field by translating legal jargon into plain English, flagging predatory clauses, and evaluating compliance against international data protection standards.
            </p>
          </div>

          {/* Footer Links */}
          <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} TermsScanner. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/privacy-policy" className="hover:text-slate-300">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-slate-300">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-slate-300">
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
