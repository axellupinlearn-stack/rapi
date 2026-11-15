'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, Music, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Soumission de morceau / clip',
    message: '',
    link: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Soumission de morceau / clip',
        message: '',
        link: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="font-editorial text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          CONTACT & SOUMISSIONS
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Vous êtes un artiste, un manager, un beatmaker ou une marque ? Écrivez à la rédaction de RAP IVOIRE.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Coordinates (Col 5) */}
        <div className="md:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xs">
          <h2 className="font-editorial text-xl font-bold text-slate-900">
            La Rédaction à Abidjan
          </h2>

          <div className="space-y-4 text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Bureaux Éditoriaux</p>
                <p className="text-xs text-slate-600">Cocody Angré 8ème Tranche, Abidjan, Côte d’Ivoire</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Email Rédaction & Presse</p>
                <p className="text-xs text-slate-600">contact@rapivoire.ci</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">WhatsApp Rédaction</p>
                <p className="text-xs text-slate-600">+225 07 00 00 00 00</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <p className="text-xs font-bold text-brand-blue uppercase tracking-wider">
              Délais de réponse
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Toutes les soumissions musicales sont écoutées par notre comité d’écoute sous 48h à 72h.
            </p>
          </div>
        </div>

        {/* Contact Form (Col 7) */}
        <div className="md:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Votre Nom / Pseudo</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex : Junior Konan"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Votre Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@artiste.ci"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Objet du message</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-brand-blue cursor-pointer"
              >
                <option value="Soumission de morceau / clip">Soumission de morceau / clip officiel</option>
                <option value="Demande d'interview">Demande d'interview ou portrait</option>
                <option value="Partenariat & Publicité">Partenariat & Espaces publicitaires</option>
                <option value="Proposition de contribution éditoriale">Rejoindre l'équipe des rédacteurs</option>
                <option value="Autre demande">Autre demande</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lien d'écoute / Clip YouTube / Drive (Optionnel)</label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://youtu.be/... ou lien streaming"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Votre Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Présentez brièvement votre projet, l'artiste, l'histoire du morceau ou votre proposition..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {submitted ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  Message envoyé avec succès à la rédaction !
                </span>
              ) : <span />}

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Envoyer</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
