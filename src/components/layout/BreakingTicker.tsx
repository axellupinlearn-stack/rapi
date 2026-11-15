import React from 'react';
import Link from 'next/link';
import { Flame, Radio, Instagram, Youtube, Facebook } from 'lucide-react';

export default function BreakingTicker() {
  const breakingItems = [
    'Didi B annonce une tournée des stades en Afrique de l’Ouest pour 2027',
    'Himra dévoile un extrait exclusif de son prochain projet Drill Ivoire',
    'Suspect 95 prépare une série de concerts acoustiques au Palais de la Culture',
    'Team Paiya : "Coup du marteau" franchit le cap des 40 millions de vues',
    'Femua : La scène Rap Ivoire à l’honneur pour la nouvelle édition',
  ];

  return (
    <div className="bg-slate-100/90 border-b border-slate-200/90 text-xs text-slate-600 py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Live indicator + Ticker */}
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <div className="flex items-center gap-1.5 bg-brand-blue text-white shadow-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] shrink-0">
            <Radio className="w-3 h-3 text-white animate-pulse" />
            <span>FLASH ACTU</span>
          </div>

          <div className="overflow-hidden relative w-full h-5 flex items-center">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
              {breakingItems.map((item, index) => (
                <span key={index} className="inline-flex items-center gap-2 text-slate-800 font-medium hover:text-brand-blue transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
                  {item}
                </span>
              ))}
              {/* Duplicate for smooth infinite loop */}
              {breakingItems.map((item, index) => (
                <span key={`dup-${index}`} className="inline-flex items-center gap-2 text-slate-800 font-medium hover:text-brand-blue transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Date & Socials */}
        <div className="hidden lg:flex items-center gap-4 shrink-0 text-slate-500">
          <span className="text-[11px] font-semibold text-slate-600 border-r border-slate-300 pr-4">
            Abidjan, Côte d’Ivoire
          </span>
          <div className="flex items-center gap-3 text-slate-500">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors" aria-label="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors" aria-label="YouTube">
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-brand-blue transition-colors" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
