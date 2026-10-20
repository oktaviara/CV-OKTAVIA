import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ArrowUpRight, Sparkles } from 'lucide-react';
import { Language, ProfileData } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  profile: ProfileData;
  activeSection: string;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  profile,
  activeSection,
  onOpenCustomizer,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'about', label: t.about },
    { id: 'services', label: t.services },
    { id: 'portfolio', label: t.portfolio },
    { id: 'contact', label: t.contact },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Extract initials for the logo
  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'AJ';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 py-3.5'
          : 'bg-white/80 backdrop-blur-xs py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with /AJ Monogram matching attachment */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('home');
          }}
          className="flex items-center gap-2 group whitespace-nowrap shrink-0 text-slate-900 tracking-wider font-bold transition-opacity hover:opacity-85"
        >
          <div className="flex items-center font-bold tracking-tighter text-xl">
            <span className="text-sky-500 font-extrabold mr-0.5">//</span>
            <span className="text-sky-500 font-black tracking-tight">{initials}</span>
          </div>
          <span className="text-base sm:text-lg font-semibold tracking-widest uppercase text-slate-900">
            {profile.name}
          </span>
        </a>

        {/* Zone 2: 5 Nav Links (Single-line, quiet typography) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`transition-colors uppercase whitespace-nowrap shrink-0 py-1 relative ${
                  isActive
                    ? 'text-sky-500 font-bold'
                    : 'text-slate-600 hover:text-slate-950 font-medium'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language Switcher & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Bilingual Switcher (ID / EN) */}
          <div
            className="flex items-center p-0.5 bg-slate-100 rounded-full border border-slate-200/80"
            role="group"
            aria-label="Language selection"
          >
            <button
              onClick={() => onLanguageChange('id')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1 ${
                language === 'id'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Bahasa Indonesia"
            >
              <span className="text-[10px]">🇮🇩</span>
              <span>ID</span>
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1 ${
                language === 'en'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="English"
            >
              <span className="text-[10px]">🇬🇧</span>
              <span>EN</span>
            </button>
          </div>

          {/* Quick Edit Profile trigger */}
          <button
            onClick={onOpenCustomizer}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Edit info portofolio / Customize portfolio"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span className="hidden xl:inline">{language === 'id' ? 'Sesuaikan' : 'Customize'}</span>
          </button>

          {/* Hire Me CTA Button */}
          <button
            onClick={() => scrollTo('contact')}
            className="hidden sm:inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 rounded-lg hover:bg-sky-600 transition-colors shadow-xs"
          >
            <span>{t.hireMe}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-950 focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left text-sm font-semibold tracking-wider uppercase py-2 border-b border-slate-50 transition-colors ${
                  activeSection === item.id ? 'text-sky-500 font-bold' : 'text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={onOpenCustomizer}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg"
              >
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>{language === 'id' ? 'Sesuaikan Data Profil' : 'Customize Profile Data'}</span>
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 rounded-lg hover:bg-sky-600 transition-colors shadow-xs"
              >
                {t.hireMe}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
