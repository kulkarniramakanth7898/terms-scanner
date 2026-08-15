import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Cpu, Lock, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'About Us | TermsScanner',
  description: 'About TermsScanner: Mission, client-side zero-retention privacy architecture, and AI legal auditing technology.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <Header />

      <main className="mb-auto py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
            
            <div>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-800 mb-4 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Our Mission & Technology</span>
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                About TermsScanner
              </h1>
              <p className="text-sm text-slate-600 mt-2 font-medium">
                Democratizing legal & privacy risk intelligence with 100% client-side privacy protection.
              </p>
            </div>

            <hr className="border-slate-200" />

            <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-xl font-extrabold text-slate-900">Democratizing Contract Transparency</h2>
                <p>
                  TermsScanner was built to empower everyday consumers, software engineers, and businesses to understand complex terms of service, NDAs, and regulatory compliance rules without paying expensive hourly legal retainer fees.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-xl font-extrabold text-slate-900">100% Client-Side Privacy First</h2>
                <p>
                  We built TermsScanner with privacy at its core. When using our <strong>Instant Offline Scan</strong>, all PDF parsing and regex compliance evaluations occur strictly inside your web browser memory. Zero contract text is ever saved to disk or transmitted to external servers.
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <Cpu className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-extrabold text-slate-900 text-sm">Dual-Engine Flexibility</h3>
                  <p className="text-xs text-slate-600">
                    Seamlessly switch between zero-cost 100% offline regex checks and Google Gemini 2.5 Flash AI contextual analysis.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-extrabold text-slate-900 text-sm">Zero Server Uploads</h3>
                  <p className="text-xs text-slate-600">
                    PDF text extraction via client-side Web Workers guarantees your sensitive files remain strictly on your local device.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
