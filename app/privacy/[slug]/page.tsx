import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { POPULAR_SERVICES, getServiceBySlug } from '@/lib/services';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Database, 
  ArrowLeft, 
  Zap, 
  ArrowRight,
  Clock,
  Tag,
  CheckCircle2
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return POPULAR_SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | Terms Scanner',
    };
  }

  const redFlagsList = service.keyRedFlags.map(f => f.title).join(', ');

  return {
    metadataBase: new URL('https://termsscanner.in'),
    title: `${service.name} Privacy Policy & Terms Audit | Terms Scanner`,
    description: `Detailed privacy audit of ${service.name}. Risk Score: ${service.riskScore}/10. Key concerns: ${redFlagsList}. Spot hidden traps and data tracking.`,
    keywords: [
      `${service.name.toLowerCase()} privacy policy`,
      `${service.name.toLowerCase()} terms of service`,
      `${service.name.toLowerCase()} privacy audit`,
      `${service.name.toLowerCase()} data tracking`,
      `${service.name.toLowerCase()} red flags`,
      'terms scanner',
      'privacy policy analyzer'
    ],
    alternates: {
      canonical: `https://termsscanner.in/privacy/${service.slug}`,
    },
    openGraph: {
      title: `${service.name} Privacy & Terms Risk Audit (${service.riskScore}/10)`,
      description: service.summary,
      url: `https://termsscanner.in/privacy/${service.slug}`,
      siteName: 'Terms Scanner',
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.name} Privacy Policy Audit | Terms Scanner`,
      description: service.summary,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ServicePrivacyPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const isHighRisk = service.riskScore >= 7.5;
  const isMedRisk = service.riskScore >= 5.0 && service.riskScore < 7.5;

  const scoreBadgeBg = isHighRisk
    ? 'bg-rose-50 text-rose-700 border-rose-200'
    : isMedRisk
    ? 'bg-amber-50 text-amber-700 border-amber-200'
    : 'bg-emerald-50 text-emerald-700 border-emerald-200';

  const scoreBarBg = isHighRisk ? 'bg-rose-500' : isMedRisk ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* Header Navigation */}
      <Header />

      <main className="mb-auto py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link 
            href="/"
            className="inline-flex items-center space-x-1.5 font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Contract Scanner</span>
          </Link>
          <div className="flex items-center space-x-1 text-[11px] font-medium">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-slate-400">Privacy Audits</span>
            <span>/</span>
            <span className="font-bold text-slate-700">{service.name}</span>
          </div>
        </div>

        {/* Hero Card / Service Overview */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 flex items-center space-x-1">
                  <Tag className="w-3 h-3 text-slate-500" />
                  <span>{service.category}</span>
                </span>
                <span className="text-xs text-slate-400 font-medium flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Updated {service.lastUpdated}</span>
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {service.name} Privacy Audit
              </h1>
            </div>

            {/* Risk Score Pill */}
            <div className={`p-4 rounded-2xl border ${scoreBadgeBg} text-center shrink-0 shadow-sm min-w-[140px]`}>
              <span className="text-[10px] font-extrabold uppercase tracking-wider block opacity-80">
                Privacy Risk Score
              </span>
              <div className="text-3xl font-black mt-0.5">
                {service.riskScore} <span className="text-sm font-bold opacity-70">/ 10</span>
              </div>
              <span className="text-[11px] font-bold block mt-1">
                {isHighRisk ? '⚠️ High Concern' : isMedRisk ? '⚡ Moderate Concern' : '✓ Standard Risk'}
              </span>
            </div>
          </div>

          {/* Risk Bar Meter */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Overall Risk Level</span>
              <span>{(service.riskScore * 10).toFixed(0)}% Vulnerability</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div className={`h-full transition-all duration-700 ${scoreBarBg}`} style={{ width: `${service.riskScore * 10}%` }} />
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
              Executive Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {service.summary}
            </p>
          </div>
        </section>

        {/* SECTION 1: Key Red Flags & Clauses */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Key Red Flags & Problematic Clauses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.keyRedFlags.map((flag, idx) => (
              <div 
                key={idx} 
                className="p-5 bg-white border border-rose-100 hover:border-rose-300 rounded-2xl shadow-sm transition-all space-y-2"
              >
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <h3 className="text-sm font-bold text-slate-900">
                    {flag.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {flag.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Data Collected & Tracked */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Data Tracked & Collected by {service.name}
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            Below is a breakdown of device identifiers, telemetry, and personal telemetry metrics gathered according to official disclosures:
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {service.dataCollected.map((item, idx) => (
              <span 
                key={idx}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </section>

        {/* SECTION 3: Call-To-Action (Scan Your Custom Contract) */}
        <section className="p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-white/20 rounded-full text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Free Instant Scanner</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Want to Scan Your Own Terms or NDA?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Use our dual-engine scanner to analyze any contract, NDA, or privacy policy 100% offline or with Gemini AI.
            </p>
          </div>

          <Link
            href="/"
            className="px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all transform hover:scale-105 shrink-0 flex items-center space-x-2"
          >
            <span>Open Custom Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </main>

    </div>
  );
}
