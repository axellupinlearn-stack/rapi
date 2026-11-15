'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Facebook, Twitter } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Fallback to window location if url not provided
  const shareUrl = typeof window !== 'undefined' ? (url || window.location.href) : (url || 'https://rapivoire.ci');

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`🔥 RAP IVOIRE : ${title}`);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-600 mr-1 flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5 text-brand-blue" />
        Partager :
      </span>

      {/* WhatsApp - Priority 1 in Côte d'Ivoire */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold shadow-xs transition-all duration-200"
        title="Partager sur WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>WhatsApp</span>
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1877F2] hover:bg-[#1567D3] text-white text-xs font-bold shadow-xs transition-all duration-200"
        title="Partager sur Facebook"
      >
        <Facebook className="w-4 h-4 fill-current" />
        <span className="hidden sm:inline">Facebook</span>
      </a>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-all duration-200"
        title="Partager sur X (Twitter)"
      >
        <Twitter className="w-4 h-4" />
        <span className="hidden sm:inline">X</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold shadow-xs transition-all duration-200"
        title="Copier le lien de l'article"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-bold">Lien copié !</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-slate-600" />
            <span>Copier le lien</span>
          </>
        )}
      </button>
    </div>
  );
}
