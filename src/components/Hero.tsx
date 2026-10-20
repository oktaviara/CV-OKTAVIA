import React, { useState } from 'react';
import { Mail, Phone, ArrowDown, FileText, Check, ExternalLink } from 'lucide-react';
import { Language, ProfileData } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  language: Language;
  profile: ProfileData;
  onOpenCvModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, profile, onOpenCvModal }) => {
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const t = translations[language].hero;

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center overflow-hidden bg-white"
    >
      {/* Background radial soft blue arc matching the attachment */}
      <div
        className="absolute top-0 right-0 bottom-0 w-full lg:w-[65%] pointer-events-none hero-radial-backdrop"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Details from Attachment */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Kicker & Accent Line */}
            <div className="mb-4">
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-slate-500 uppercase">
                {language === 'id' ? 'HALO, NAMA SAYA' : 'HELLO, MY NAME IS'}
              </span>
              <div className="w-12 h-[2.5px] bg-slate-400 mt-2 rounded-full" />
            </div>

            {/* Huge Display Serif Name */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.08] mb-2 text-balance">
              {profile.name}
            </h1>

            {/* Subheading: Web Developer */}
            <p className="text-2xl sm:text-3xl font-medium text-slate-500 tracking-normal mb-8">
              {profile.role}
            </p>

            {/* Quick Contact Items with Cyan Rounded Outline Icons (exact attachment replica) */}
            <div className="flex flex-col gap-3.5 mb-10 max-w-md">
              {/* Email item */}
              <div className="flex items-center gap-3 group">
                <button
                  onClick={() => copyToClipboard(profile.email, 'email')}
                  className="w-8 h-8 rounded-md bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs hover:bg-sky-600 transition-colors cursor-pointer"
                  title="Salin email / Copy email"
                  aria-label="Copy email address"
                >
                  {copiedType === 'email' ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Mail className="w-4 h-4 text-white" />
                  )}
                </button>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-xs sm:text-sm font-semibold tracking-wider text-slate-700 hover:text-sky-600 transition-colors uppercase"
                  >
                    {profile.email}
                  </a>
                  {copiedType === 'email' && (
                    <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                      {language === 'id' ? 'Tersalin' : 'Copied'}
                    </span>
                  )}
                </div>
              </div>

              {/* Phone item */}
              <div className="flex items-center gap-3 group">
                <button
                  onClick={() => copyToClipboard(profile.phone, 'phone')}
                  className="w-8 h-8 rounded-md bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs hover:bg-sky-600 transition-colors cursor-pointer"
                  title="Salin nomor / Copy phone number"
                  aria-label="Copy phone number"
                >
                  {copiedType === 'phone' ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Phone className="w-4 h-4 text-white" />
                  )}
                </button>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-xs sm:text-sm font-semibold tracking-wider text-slate-700 hover:text-sky-600 transition-colors"
                  >
                    {profile.phone}
                  </a>
                  {copiedType === 'phone' && (
                    <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                      {language === 'id' ? 'Tersalin' : 'Copied'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons & Availability */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToPortfolio}
                className="px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-slate-900 rounded-lg hover:bg-sky-600 transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                {t.viewWork}
              </button>

              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200/80 active:scale-95"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>{t.downloadCv}</span>
              </button>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 hover:underline transition-colors"
              >
                <span>{t.contactMe}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Circular Portrait & Crescent Accent matching Attachment */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {/* Ambient subtle back ring glow */}
            <div className="w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-full bg-linear-to-tr from-sky-100/60 to-slate-200/40 absolute -z-10 blur-xl" />

            {/* Circular Portrait Frame */}
            <div className="relative group">
              <div className="w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-full overflow-hidden shadow-2xl ring-8 ring-white/90 bg-slate-900 relative transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Status pill beneath the avatar */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-full shadow-md border border-slate-100 flex items-center gap-2 whitespace-nowrap text-xs text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span className="font-medium">{t.availableForHire}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet scroll down indicator */}
        <div className="mt-16 pt-8 flex justify-center">
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 hover:text-slate-700 uppercase transition-colors"
          >
            <span>{t.scrollDown}</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
