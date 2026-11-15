'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { authenticate } from '@/lib/auth';
import BrandLogo from '@/components/ui/BrandLogo';

export default function StudioLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await authenticate(email, password);
      if (res.success) {
        router.push('/studio');
      } else {
        setError(res.error || 'Erreur d’authentification.');
      }
    } catch {
      setError('Impossible de joindre le service d’authentification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06090F] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0B0F19] border border-brand-dark-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo size="lg" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-blue/20 text-brand-cyan border border-brand-cyan/30 mb-2">
              <Lock className="w-3 h-3" />
              <span>Accès Réservé aux Accrédités</span>
            </div>
            <h1 className="font-editorial text-2xl font-black text-white">
              Studio Éditorial
            </h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Cet espace est strictement privé et dédié à l'administration, la rédaction et la gestion du média RAP IVOIRE.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-950/80 border border-rose-500/50 rounded-xl text-xs text-rose-300 font-semibold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Adresse e-mail de connexion
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#080B11] border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#080B11] border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-brand-cyan font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-brand-blue-light hover:to-brand-blue text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 flex items-center justify-center gap-2 transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-brand-cyan" />
            <span>{loading ? 'Connexion en cours...' : 'Se Connecter au Studio'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800">
          <Link href="/" className="text-xs text-slate-400 hover:text-brand-cyan transition-colors">
            ← Retourner sur le site public RAP IVOIRE
          </Link>
        </div>
      </div>
    </div>
  );
}
