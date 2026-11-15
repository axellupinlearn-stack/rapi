import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Compass, Flame, BookOpen, Shirt, Music } from 'lucide-react';

export const metadata = {
  title: 'Culture Urbaine & Nouchi — RAP IVOIRE',
  description: 'L’histoire du rap ivoirien, la street culture, la mode streetwear abidjanaise, l’argot nouchi et les danses urbaines de Côte d’Ivoire.',
};

export default function CulturePage() {
  const pillars = [
    {
      title: 'L’Argot Nouchi, la Langue du Mouvement',
      desc: 'Né dans les cours communes et les gares de gbaka, le nouchi est devenu le ciment linguistique du rap ivoire. De "gaou" à "kpata", en passant par "paiya", décryptage de ce dialecte urbain qui conquiert le monde.',
      icon: BookOpen,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Streetwear Abidjanais & Sape Urbaine',
      desc: 'Les rappeurs ivoiriens ont créé leurs propres codes vestimentaires. Entre marques de créateurs ivoiriens, fripes légendaires d’Adjamé et grillz scintillants, Abidjan dicte sa loi stylistique.',
      icon: Shirt,
      image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Danses de Rue : Du Logobi au Maïmouna & Paiya',
      desc: 'En Côte d’Ivoire, le rap ne s’écoute pas assis : il se danse. Du mapouka des origines au kpangor, puis au maïmouna et à la déferlante Paiya de Zagba le Requin, analyse d’une symbiose physique totale.',
      icon: Flame,
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'L’Histoire : Des Pionniers RAS à la Trap Nouchi',
      desc: 'Des cassettes des années 90 aux zéniths internationaux de Didi B et aux millions de vues d’Himra : la grande rétrospective du hip-hop ivoirien.',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="space-y-4 pb-6 border-b border-slate-200 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-brand-blue border border-blue-200">
          <Sparkles className="w-4 h-4" />
          <span>L’ÂME D’ABIDJAN</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          CULTURE URBAINE & NOUCHI
        </h1>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Le rap en Côte d’Ivoire est bien plus qu’un genre musical. C’est une philosophie de vie, un lexique, une mode, une gestuelle et une identité collective.
        </p>
      </div>

      {/* Grid of Culture Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <article
              key={idx}
              className="group bg-white border border-slate-200 hover:border-brand-blue/50 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md text-brand-blue shadow-md">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <h2 className="font-editorial text-2xl font-black text-slate-900 group-hover:text-brand-blue transition-colors">
                  {item.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Lexique Nouchi Interactive Card */}
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-slate-50 border border-blue-200 p-8 rounded-3xl space-y-6 shadow-xs">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-brand-blue" />
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            Le Mini-Lexique Rap Ivoire & Nouchi
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <span className="font-editorial font-bold text-brand-blue text-lg">Paiya</span>
            <p className="text-xs text-slate-600 leading-relaxed">Faire la fête sans retenue, profiter de la vie au maximum (popularisé par Team Paiya).</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <span className="font-editorial font-bold text-brand-blue text-lg">NFTR</span>
            <p className="text-xs text-slate-600 leading-relaxed">"No Faux Tout Réel" — le crédo d’authenticité absolue créé par Himra et la jeunesse de Marcory.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <span className="font-editorial font-bold text-brand-blue text-lg">Shogun</span>
            <p className="text-xs text-slate-600 leading-relaxed">Titre honorifique désignant le chef ou le patron du game, incarné par Didi B.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <span className="font-editorial font-bold text-brand-blue text-lg">Syndicat</span>
            <p className="text-xs text-slate-600 leading-relaxed">Mouvement de défense des intérêts des hommes créé avec humour et brio par Suspect 95.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
