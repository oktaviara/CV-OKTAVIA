import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Check, Clock } from 'lucide-react';
import { Language, ProfileData } from '../types';
import { translations } from '../data/translations';

interface ContactSectionProps {
  language: Language;
  profile: ProfileData;
  prefilledSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  language,
  profile,
  prefilledSubject,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: prefilledSubject || '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const t = translations[language].contact;

  // React to prefilledSubject changes if passed
  React.useEffect(() => {
    if (prefilledSubject) {
      setFormData((prev) => ({
        ...prev,
        subject: prefilledSubject,
        message:
          prev.message ||
          (language === 'id'
            ? `Halo ${profile.name}, saya tertarik untuk mendiskusikan layanan ${prefilledSubject}.`
            : `Hi ${profile.name}, I am interested in discussing your ${prefilledSubject} service.`),
      }));
    }
  }, [prefilledSubject, language, profile.name]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handlePresetClick = (presetText: string, presetLabel: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: presetLabel,
      message: presetText,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate real network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 900);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50/80 border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="mb-3">
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">
              {t.kicker}
            </span>
            <div className="w-10 h-0.5 bg-sky-500 mt-1.5" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mt-4 text-balance">
            {t.title}
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact & Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                {t.orReachDirectly}
              </h3>

              {/* Email item with copy button */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Email
                    </span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm font-semibold text-slate-800 hover:text-sky-600 truncate block transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(profile.email, 'email')}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors shrink-0"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copiedItem === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone item with copy button & WhatsApp direct chat */}
              <div className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        {language === 'id' ? 'Telepon / WhatsApp' : 'Phone / WhatsApp'}
                      </span>
                      <a
                        href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
                        className="text-sm font-semibold text-slate-800 hover:text-sky-600 truncate block transition-colors"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(profile.phone, 'phone')}
                    className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors shrink-0"
                    title="Copy phone"
                    aria-label="Copy phone"
                  >
                    {copiedItem === 'phone' ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Direct WhatsApp Action Link */}
                <div className="pt-2 border-t border-slate-200/60 flex justify-end">
                  <a
                    href={`https://wa.me/${profile.phone.startsWith('0') ? '62' + profile.phone.slice(1) : profile.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      language === 'id'
                        ? `Halo ${profile.name}, saya ingin mendiskusikan proyek web...`
                        : `Hi ${profile.name}, I would like to discuss a web project...`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span>{language === 'id' ? 'Buka Obrolan WhatsApp' : 'Chat on WhatsApp'}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              {/* Location item */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {language === 'id' ? 'Lokasi & Zona Waktu' : 'Location & Timezone'}
                  </span>
                  <span className="text-sm font-semibold text-slate-800">
                    {profile.location}
                  </span>
                </div>
              </div>

              {/* Response Time Indicator */}
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-4 h-4 text-sky-500" />
                <span>{t.responseTime}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form with Quick Presets */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/90 shadow-xs">
              {/* Quick Presets Buttons */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  {t.quickPresetsTitle}
                </span>
                <div className="flex flex-wrap gap-2">
                  {t.presets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePresetClick(preset.text, preset.label)}
                      className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 rounded-lg border border-slate-200 transition-colors text-slate-700 text-left"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {t.formSuccessTitle}
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    {t.formSuccessMsg}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    {language === 'id' ? 'Kirim Pesan Lain' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        {t.formName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder={language === 'id' ? 'Nama Anda' : 'Your Name'}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-hidden text-sm text-slate-900 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        {t.formEmail} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-hidden text-sm text-slate-900 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      {t.formSubject}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder={language === 'id' ? 'Contoh: Proyek E-Commerce Baru' : 'e.g. New E-Commerce Web App'}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-hidden text-sm text-slate-900 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      {t.formMessage} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={t.formMessage}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-hidden text-sm text-slate-900 bg-slate-50/50 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{t.formSending}</span>
                    ) : (
                      <>
                        <span>{t.formSend}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
