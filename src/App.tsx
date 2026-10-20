import React, { useState, useEffect } from 'react';
import { Language, ProfileData, ProjectItem } from './types';
import { defaultProfile } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsRibbon } from './components/StatsRibbon';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { ProfileCustomizerModal } from './components/ProfileCustomizerModal';
import { Footer } from './components/Footer';

export default function App() {
  // Language state (defaulting to Indonesian as requested by the user prompt)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return saved === 'en' || saved === 'id' ? saved : 'id';
  });

  // Profile data (allows live personalization)
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('portfolio_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.name !== 'Alex James') {
          return {
            ...defaultProfile,
            ...parsed,
            bioShort: defaultProfile.bioShort,
            bioFull: defaultProfile.bioFull,
          };
        }
      } catch {
        return defaultProfile;
      }
    }
    return defaultProfile;
  });

  // Modal and section interaction states
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [prefilledSubject, setPrefilledSubject] = useState<string>('');

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;
  };

  const handleSaveProfile = (newProfile: ProfileData) => {
    setProfile(newProfile);
    localStorage.setItem('portfolio_profile', JSON.stringify(newProfile));
  };

  const handleSelectService = (serviceTitle: string) => {
    setPrefilledSubject(serviceTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Section observer for updating active nav state
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans-clean flex flex-col antialiased selection:bg-sky-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        profile={profile}
        activeSection={activeSection}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section matching the user's attachment */}
        <Hero
          language={language}
          profile={profile}
          onOpenCvModal={() => setIsCvModalOpen(true)}
        />

        {/* Quantifiable Stats Ribbon */}
        <StatsRibbon language={language} />

        {/* About Section & Skills Matrix */}
        <AboutSection
          language={language}
          profile={profile}
          onOpenCvModal={() => setIsCvModalOpen(true)}
        />

        {/* Services & Deliverables */}
        <ServicesSection
          language={language}
          onSelectService={handleSelectService}
        />

        {/* Selected Works & Case Studies */}
        <PortfolioSection
          language={language}
          onOpenProject={(project) => setSelectedProject(project)}
        />

        {/* Experience & Education Milestones */}
        <ExperienceSection language={language} />

        {/* Verified Client Testimonials */}
        <TestimonialsSection language={language} />

        {/* Interactive Contact & Direct Communication */}
        <ContactSection
          language={language}
          profile={profile}
          prefilledSubject={prefilledSubject}
        />
      </main>

      {/* Footer */}
      <Footer language={language} profile={profile} />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        language={language}
        onClose={() => setSelectedProject(null)}
        onContactClick={() => {
          setSelectedProject(null);
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <ResumeModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        language={language}
        profile={profile}
      />

      <ProfileCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        language={language}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  );
}
