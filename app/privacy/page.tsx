import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { POPULAR_SERVICES } from '@/lib/services';
import { ShieldCheck, ArrowRight, Database, Lock } from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://termsscanner.in'),
  title: 'Popular Web Service Privacy Audits & Risk Index | Terms Scanner',
  description: 'Explore comprehensive privacy policy audits, hidden clause breakdowns, and risk scores for TikTok, OpenAI, Instagram, Zoom, Discord, and WhatsApp.',
  alternates: {
    canonical: 'https://termsscanner.in/privacy',
  },
};

export default function PrivacyIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <Header />

      <main className="mb-auto py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-800 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Programmatic Platform Risk Directory</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Popular Web Service & App Privacy Audits
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            Browse in-depth privacy policy assessments, data tracking analysis, and risk scores for popular digital apps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_SERVICES.map((service) => {
            const isHigh = service.riskScore >= 7.5;
            const badgeClass = isHigh
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : 'bg-amber-50 text-amber-700 border-amber-200';

            return (
              <Link
                key={service.slug}
                href={`/privacy/${service.slug}`}
                className="p-6 bg-white border border-slate-200 hover:border-blue-500 rounded-3xl transition-all shadow-sm hover:shadow-md group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      {service.category}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${badgeClass}`}>
                      {service.riskScore} / 10 Risk
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.name} Privacy Audit
                  </h2>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {service.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-all">
                  <span>View Full Breakdown</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
