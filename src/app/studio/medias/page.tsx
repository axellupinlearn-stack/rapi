'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Copy, Check, Trash2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { MediaFile } from '@/lib/types';

export default function StudioMediasPage() {
  const [medias, setMedias] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load existing media
  const loadMedia = () => {
    // In our seed, logo and default media are listed
    fetch('/api/articles')
      .then(() => {
        // We can fetch or provide the initial media
        setMedias([
          {
            id: 'med-logo',
            name: 'logo-rap-ivoire.jpg',
            url: '/images/logo-rap-ivoire.jpg',
            size: 64903,
            type: 'image/jpeg',
            dimensions: '1000x1000',
            createdAt: '2026-11-11T19:40:00Z',
          },
          {
            id: 'med-didi',
            name: 'didi-b-live.jpg',
            url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
            size: 245000,
            type: 'image/jpeg',
            dimensions: '1200x800',
            createdAt: '2026-11-10T12:00:00Z',
          },
          {
            id: 'med-himra',
            name: 'himra-concert.jpg',
            url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
            size: 198000,
            type: 'image/jpeg',
            dimensions: '1200x800',
            createdAt: '2026-11-09T14:00:00Z',
          },
          {
            id: 'med-suspect',
            name: 'suspect-95-studio.jpg',
            url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
            size: 220000,
            type: 'image/jpeg',
            dimensions: '1200x800',
            createdAt: '2026-11-08T10:00:00Z',
          },
        ]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.success && data.media) {
          setMedias((prev) => [data.media, ...prev]);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Erreur lors du téléversement.');
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-dark-border">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
            Médiathèque & Fichiers
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Stockage cloud optimisé pour les images d’articles, bannières et pochettes
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-light text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-brand-blue/30 transition-all">
          <Upload className="w-4 h-4 text-brand-cyan" />
          <span>{uploading ? 'Téléversement...' : 'Importer des Fichiers'}</span>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Drop Zone Box */}
      <div className="border-2 border-dashed border-slate-800 hover:border-brand-cyan/50 bg-[#080B11]/50 rounded-3xl p-8 text-center space-y-3 transition-colors">
        <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 text-brand-cyan flex items-center justify-center mx-auto">
          <ImageIcon className="w-6 h-6" />
        </div>
        <div>
          <p className="font-bold text-sm text-white">
            Glissez-déposez vos photos ici ou cliquez sur Importer
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Formats acceptés : WebP, JPEG, PNG, AVIF (Max 10 Mo par fichier)
          </p>
        </div>
      </div>

      {/* Media Grid */}
      <div className="space-y-4">
        <h2 className="font-editorial text-lg font-bold text-white">
          Fichiers Récents ({medias.length})
        </h2>

        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">Chargement...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {medias.map((med) => (
              <div
                key={med.id}
                className="group bg-brand-dark-surface border border-brand-dark-border hover:border-brand-blue/50 rounded-2xl overflow-hidden p-3 space-y-2.5 transition-all shadow-md"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/60">
                  <Image src={med.url} alt={med.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-xs text-white truncate" title={med.name}>
                    {med.name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {(med.size / 1024).toFixed(0)} Ko • {med.dimensions || 'Image'}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyUrl(med.url, med.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-cyan hover:underline"
                  >
                    {copiedId === med.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier l'URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
