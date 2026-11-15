'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Instagram, Youtube, Facebook, CheckCircle2, Lock, ArrowUpRight } from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#07090F] border-t border-white/5 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <BrandLogo size="md" variant="white" />
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              RAP IVOIRE est la plateforme numérique de référence dédiée au rap ivoirien, à la trap nouchi, à la drill abidjanaise et à toute la culture hip-hop de Côte d’Ivoire. Du bitume d’Abidjan aux scènes internationales.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-all hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-all hover:scale-105"
                aria-label="TikTok"
              >
                <span className="text-xs font-bold font-mono">TK</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-all hover:scale-105"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-all hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-cyan"></span>
              Rubriques
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/actualites" className="hover:text-white transition-colors">
                  Actualités & Flashs
                </Link>
              </li>
              <li>
                <Link href="/artistes" className="hover:text-white transition-colors">
                  Répertoire des Artistes
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-white transition-colors">
                  Clips & Freestyles
                </Link>
              </li>
              <li>
                <Link href="/culture" className="hover:text-white transition-colors">
                  Culture Nouchi & Street
                </Link>
              </li>
              <li>
                <Link href="/actualites?category=Interviews" className="hover:text-white transition-colors">
                  Interviews & Portraits
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Le Média & Pro */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
              Informations
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/a-propos" className="hover:text-white transition-colors">
                  À Propos du Média
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Soumettre un Morceau / Clip
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Dossiers de Presse & Partenariats
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Publicité
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-cyan"></span>
              Newsletter VIP
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Recevez les exclusivités rap ivoire chaque vendredi directement dans votre boîte mail.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="votre@email.ci"
                  required
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-colors"
                />
                <button
                  type="submit"
                  aria-label="S'inscrire à la newsletter"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-brand-blue hover:bg-brand-blue-light text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Inscription confirmée !</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar with Discreet Private Studio Access for Owner */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} RAP IVOIRE. Tous droits réservés. Abidjan, Côte d’Ivoire.</p>
          <div className="flex items-center gap-6">
            <Link href="/a-propos" className="hover:text-slate-300 transition-colors">
              Mentions Légales
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Contact
            </Link>
            {/* Discreet Link strictly for the site owners */}
            <Link
              href="/studio"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-brand-cyan transition-colors"
              title="Accès réservé aux propriétaires"
            >
              <Lock className="w-3 h-3" />
              <span>Accès Rédaction</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
