'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Send, CheckCircle2, Flame } from 'lucide-react';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 border border-blue-400/40 p-8 sm:p-12 shadow-xl text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-sm">
              <Flame className="w-3.5 h-3.5 fill-current text-white" />
              <span>REJOINS LE MOUVEMENT</span>
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              NE MANQUE AUCUN HIT DU RAP IVOIRE
            </h2>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Recevez les analyses exclusives, les coulisses des tournages de clips, les sorties de projets et les interviews des artistes directement sur votre messagerie.
            </p>

            <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre adresse email..."
                className="flex-1 bg-white/10 border border-white/30 rounded-xl px-4 py-3.5 text-sm text-white placeholder-blue-200 focus:outline-none focus:border-white focus:bg-white/20 backdrop-blur-sm transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-blue-50 text-brand-blue font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 shrink-0"
              >
                <Send className="w-4 h-4 text-brand-blue" />
                <span>S'abonner</span>
              </button>
            </form>

            {submitted && (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Vous êtes désormais inscrit à la newsletter officielle de RAP IVOIRE !</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
