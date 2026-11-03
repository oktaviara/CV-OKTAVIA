import React, { useState } from 'react';
import { X, Sparkles, RotateCcw, Check, UserCheck } from 'lucide-react';
import { Language, ProfileData } from '../types';
import { translations, defaultProfile } from '../data/translations';

interface ProfileCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  profile: ProfileData;
  onSaveProfile: (newProfile: ProfileData) => void;
}

export const ProfileCustomizerModal: React.FC<ProfileCustomizerModalProps> = ({
  isOpen,
  onClose,
  language,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const t = translations[language].customizer;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    setFormData(defaultProfile);
  };

  const handleApplyUserIdentity = () => {
    setFormData({
      ...formData,
      name: 'Oktavia Ramadani',
      role: 'Web Developer',
      email: 'oktaviararamadani38@gmail.com',
      phone: '085951396782',
      location: 'Cilacap, Jawa Tengah, Indonesia',
      avatarUrl: defaultProfile.avatarUrl,
      availability: language === 'id' ? 'Tersedia untuk Proyek & Kontrak' : 'Available for Projects & Contracts',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-pink-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs px-6 py-5 border-b border-pink-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{t.title}</h3>
              <p className="text-[11px] text-pink-900/60">{t.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center text-pink-700 hover:text-pink-950 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Presets */}
          <div className="bg-pink-50/70 border border-pink-200/80 p-4 rounded-xl space-y-2">
            <span className="text-xs font-bold text-pink-900 uppercase tracking-wider block">
              {language === 'id' ? 'Preset Identitas Cepat:' : 'Quick Identity Presets:'}
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleApplyUserIdentity}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-pink-900 border border-pink-200 rounded-lg text-xs font-semibold hover:bg-pink-100/50 transition-colors shadow-2xs cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-pink-600" />
                <span>Oktavia Ramadani (Cilacap)</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-700 border border-pink-200 rounded-lg text-xs font-semibold hover:bg-pink-50 transition-colors shadow-2xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>{language === 'id' ? 'Atur Ulang ke Default' : 'Reset to Default'}</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t.nameLabel}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-pink-200 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-hidden bg-pink-50/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t.roleLabel}
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-pink-200 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-hidden bg-pink-50/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t.emailLabel}
                </label>
                <input
                  type="text"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-pink-200 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-hidden bg-pink-50/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t.phoneLabel}
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-pink-200 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-hidden bg-pink-50/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {language === 'id' ? 'Lokasi & Ketersediaan' : 'Location & Availability'}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-pink-200 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-hidden bg-pink-50/20 mb-2"
                placeholder="e.g. Jakarta, Indonesia"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-pink-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-pink-900 transition-colors cursor-pointer"
              >
                {t.resetDefaults}
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors shadow-xs shadow-pink-200 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>{language === 'id' ? 'Tersimpan!' : 'Saved!'}</span>
                  </>
                ) : (
                  <span>{t.saveChanges}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
