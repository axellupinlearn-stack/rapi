'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlusCircle, Users, CheckCircle2, MapPin } from 'lucide-react';
import { Artist } from '@/lib/types';

export default function StudioArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newArtist, setNewArtist] = useState({
    name: '',
    realName: '',
    commune: 'Cocody',
    genre: 'Drill Ivoire',
    bio: '',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    popularTracks: 'Track 1, Track 2',
  });
  const [success, setSuccess] = useState(false);

  const loadArtists = () => {
    fetch('/api/artistes')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setArtists(data.artists);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadArtists();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtist.name) return;

    const baseSlug = newArtist.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload = {
      id: `art-${Date.now()}`,
      slug: baseSlug,
      name: newArtist.name,
      realName: newArtist.realName,
      commune: newArtist.commune,
      genre: newArtist.genre,
      bio: newArtist.bio,
      photo: newArtist.photo,
      popularTracks: newArtist.popularTracks.split(',').map((t) => t.trim()),
      discography: [{ title: 'Premier Projet', year: '2024', type: 'EP' }],
    };

    try {
      const res = await fetch('/api/artistes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setSuccess(true);
        loadArtists();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-dark-border">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
            Gestion du Répertoire des Artistes
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {artists.length} artistes répertoriés
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-light text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30"
        >
          <PlusCircle className="w-4 h-4 text-brand-cyan" />
          <span>Ajouter un Artiste</span>
        </button>
      </div>

      {success && (
        <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Fiche artiste enregistrée !</span>
        </div>
      )}

      {/* Artists Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {artists.map((art) => (
          <div
            key={art.id}
            className="bg-brand-dark-surface border border-brand-dark-border p-4 rounded-2xl flex items-center gap-4"
          >
            <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-brand-blue shrink-0">
              <Image src={art.photo} alt={art.name} fill className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-sm text-white truncate">{art.name}</h3>
              <p className="text-xs text-brand-cyan truncate">{art.genre}</p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{art.commune}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Artist */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-brand-dark-surface border border-slate-700 p-6 rounded-2xl max-w-md w-full space-y-4">
            <h3 className="font-editorial text-lg font-bold text-white">Ajouter un Artiste</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nom d’artiste</label>
                <input
                  type="text"
                  required
                  value={newArtist.name}
                  onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
                  placeholder="Ex : Lil Ivoire"
                  className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Commune / Ville</label>
                <input
                  type="text"
                  required
                  value={newArtist.commune}
                  onChange={(e) => setNewArtist({ ...newArtist, commune: e.target.value })}
                  placeholder="Ex : Yopougon"
                  className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Genre Musical</label>
                <input
                  type="text"
                  required
                  value={newArtist.genre}
                  onChange={(e) => setNewArtist({ ...newArtist, genre: e.target.value })}
                  placeholder="Ex : Drill Ivoire"
                  className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Biographie</label>
                <textarea
                  rows={3}
                  value={newArtist.bio}
                  onChange={(e) => setNewArtist({ ...newArtist, bio: e.target.value })}
                  placeholder="Présentation de l'artiste..."
                  className="w-full bg-[#080B11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-blue text-xs font-bold text-white"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
