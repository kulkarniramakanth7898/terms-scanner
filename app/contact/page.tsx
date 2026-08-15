'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Mail, Send, CheckCircle2, MessageSquare, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.message) {
      setSubmitted(true);
    }
  };

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
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Contact Us
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Have questions, feedback, or enterprise inquiry about TermsScanner? We&apos;re here to help.
            </p>
          </div>

          <hr className="border-slate-800" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Contact Details Column */}
            <div className="space-y-6 text-sm text-slate-300">
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-blue-400 font-bold">
                  <Mail className="w-4 h-4" />
                  <span>Email Support</span>
                </div>
                <p className="text-xs text-slate-400">Our support team responds within 24 hours.</p>
                <a
                  href="mailto:support@termsscanner.in"
                  className="block text-sm font-semibold text-white hover:text-blue-400 transition-colors font-mono"
                >
                  support@termsscanner.in
                </a>
              </div>

              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-purple-400 font-bold">
                  <MessageSquare className="w-4 h-4" />
                  <span>Media & Partnerships</span>
                </div>
                <p className="text-xs text-slate-400">For press inquiries and commercial API integration.</p>
                <a
                  href="mailto:partners@termsscanner.in"
                  className="block text-sm font-semibold text-white hover:text-purple-400 transition-colors font-mono"
                >
                  partners@termsscanner.in
                </a>
              </div>

              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>Location</span>
                </div>
                <p className="text-xs text-slate-300">TermsScanner AI Labs</p>
                <p className="text-xs text-slate-400">Bengaluru, Karnataka, India</p>
              </div>
            </div>

            {/* Interactive Contact Form Column */}
            <div className="md:col-span-2">
              {submitted ? (
                <div className="p-8 bg-emerald-950/40 border border-emerald-800/80 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for contacting TermsScanner. Our team has received your inquiry and will respond to <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Feedback / Inquiry"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} TermsScanner. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="hover:text-slate-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-slate-300">
                Terms of Service
              </Link>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
