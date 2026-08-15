import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Mail, MapPin, MessageSquare } from 'lucide-react';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Contact Us | TermsScanner',
  description: 'Get in touch with the TermsScanner team. Location: Bengaluru, Karnataka, India. Emails: support@termsscanner.in & partners@termsscanner.in.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <Header />

      <main className="mb-auto py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
            
            <div>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-800 mb-4 shadow-sm">
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Customer Support & Partnerships</span>
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Contact TermsScanner
              </h1>
              <p className="text-sm text-slate-600 mt-2 font-medium">
                Have questions, partnership proposals, or feedback? Reach out to our team directly.
              </p>
            </div>

            <hr className="border-slate-200" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl w-fit border border-blue-200">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Email Support</h3>
                <p className="text-xs text-slate-600">
                  For customer help, technical inquiries, or general support:
                </p>
                <a href="mailto:support@termsscanner.in" className="text-sm font-mono font-bold text-blue-600 hover:underline block">
                  support@termsscanner.in
                </a>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl w-fit border border-indigo-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Headquarters Location</h3>
                <p className="text-xs text-slate-600">
                  TermsScanner Engineering & Research Hub:
                </p>
                <p className="text-sm font-bold text-slate-900">
                  Bengaluru, Karnataka, India
                </p>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
