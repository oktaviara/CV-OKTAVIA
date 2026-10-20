import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter } from 'lucide-react';
import { Language, ProfileData } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  language: Language;
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ language, profile }) => {
  const t = translations[language].footer;
  const navT = translations[language].nav;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'AJ';

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Identity */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sky-400 font-extrabold text-xl tracking-tighter">//</span>
              <span className="text-sky-400 font-black text-xl tracking-tight">{initials}</span>
              <span className="text-white font-bold tracking-widest text-base sm:text-lg uppercase">
                {profile.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              {t.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <a href="#home" className="hover:text-white transition-colors">
              {navT.home}
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              {navT.about}
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              {navT.services}
            </a>
            <a href="#portfolio" className="hover:text-white transition-colors">
              {navT.portfolio}
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              {navT.contact}
            </a>
          </nav>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white uppercase tracking-wider transition-colors group cursor-pointer"
          >
            <span>{t.backToTop}</span>
            <div className="w-8 h-8 rounded-full bg-slate-900 group-hover:bg-sky-500 group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {profile.name}. {t.rights}
          </div>
          <div>
            {t.craftedWith}
          </div>
        </div>
      </div>
    </footer>
  );
};
