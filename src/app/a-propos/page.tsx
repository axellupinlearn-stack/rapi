import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Users, Target, ArrowRight } from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';

export const metadata = {
  title: 'À Propos de RAP IVOIRE — Manifeste & Équipe',
  description: 'Découvrez la mission, la vision et l’équipe éditoriale de RAP IVOIRE, le média digital de référence de la culture urbaine ivoirienne.',
};

export default function AProposPage() {
  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <BrandLogo size="xl" showTagline={false} variant="blue" />
        </div>
        <h1 className="font-editorial text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          PLUS QU’UN MÉDIA, UN MOUVEMENT
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          RAP IVOIRE a été fondé avec une ambition claire : offrir au rap et à la culture hip-hop ivoirienne la vitrine d’excellence et de prestige qu’ils méritent.
        </p>
      </div>

      {/* Manifesto Card */}
      <div className="bg-white border border-slate-200 p-8 sm:p-12 rounded-3xl shadow-xs space-y-6">
        <h2 className="font-editorial text-2xl sm:text-3xl font-black text-brand-blue">
          Notre Manifeste
        </h2>
        <div className="space-y-4 leading-relaxed text-sm sm:text-base text-slate-700">
          <p>
            Depuis Abidjan, capitale créative de l’Afrique de l’Ouest francophone, une révolution sonore s’est propagée au monde entier. Le rap ivoirien ne copie plus personne : il dicte les tendances, invente ses danses, propage son argot nouchi et emplit les plus grandes salles.
          </p>
          <p>
            RAP IVOIRE est né pour documenter cette histoire en train de s’écrire. Nous refusons les raccourcis faciles et le sensationnalisme creux. Notre équipe de journalistes, de critiques et de passionnés analyse la musique avec la rigueur d’un média international de référence.
          </p>
          <blockquote className="border-l-4 border-brand-blue pl-4 py-2 italic font-semibold text-slate-900 bg-blue-50/60 rounded-r-xl">
            « Célébrer l’excellence, propulser les talents émergents, préserver l’héritage et connecter la diaspora. »
          </blockquote>
        </div>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 text-center shadow-xs">
          <Award className="w-8 h-8 text-brand-blue mx-auto" />
          <h3 className="font-editorial font-bold text-lg text-slate-900">Rigueur Éditoriale</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Des analyses poussées, des enquêtes de fond et des interviews vérités avec les acteurs du milieu.</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 text-center shadow-xs">
          <Target className="w-8 h-8 text-brand-blue mx-auto" />
          <h3 className="font-editorial font-bold text-lg text-slate-900">Tremplin pour Talents</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Une mise en lumière constante des jeunes artistes issus de toutes les communes d’Abidjan et de l’intérieur.</p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 text-center shadow-xs">
          <Users className="w-8 h-8 text-emerald-600 mx-auto" />
          <h3 className="font-editorial font-bold text-lg text-slate-900">Communauté Ouverte</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Un studio de publication ouvert aux rédacteurs et contributeurs passionnés de toute la Côte d’Ivoire.</p>
        </div>
      </div>

      {/* CTA to Studio */}
      <div className="text-center pt-4">
        <Link
          href="/studio"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
        >
          <span>Accéder au Studio Éditorial</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
