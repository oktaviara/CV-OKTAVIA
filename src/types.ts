export type Language = 'id' | 'en';

export interface ProfileData {
  name: string;
  role: string;
  greeting: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  avatarUrl: string;
  bioShort: string;
  bioFull: string[];
  resumeDownloadUrl?: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; note: string }[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'web' | 'ecommerce' | 'mobile' | 'system';
  categoryLabel: string;
  thumbnail: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  year: string;
  featured?: boolean;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  projectDelivered: string;
}

export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    services: string;
    portfolio: string;
    contact: string;
    hireMe: string;
    switchLang: string;
  };
  hero: {
    greeting: string;
    viewWork: string;
    downloadCv: string;
    contactMe: string;
    scrollDown: string;
    availableForHire: string;
  };
  stats: {
    title: string;
    items: StatItem[];
  };
  about: {
    kicker: string;
    title: string;
    subtitle: string;
    experienceYears: string;
    experienceLabel: string;
    corePhilosophy: string;
    techSkillsTitle: string;
    softSkillsTitle: string;
    softSkills: string[];
    downloadCvButton: string;
    cvModalTitle: string;
    cvModalDesc: string;
  };
  services: {
    kicker: string;
    title: string;
    subtitle: string;
    inquireService: string;
    deliverablesLabel: string;
    items: ServiceItem[];
  };
  portfolio: {
    kicker: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterWeb: string;
    filterEcommerce: string;
    filterMobile: string;
    filterSystem: string;
    viewDetails: string;
    liveDemo: string;
    viewCode: string;
    caseStudy: string;
    technologiesUsed: string;
    projectOutcome: string;
  };
  experience: {
    kicker: string;
    title: string;
    subtitle: string;
    workTab: string;
    educationTab: string;
    items: ExperienceItem[];
    educationItems: ExperienceItem[];
  };
  testimonials: {
    kicker: string;
    title: string;
    subtitle: string;
    items: TestimonialItem[];
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formSend: string;
    formSending: string;
    formSuccessTitle: string;
    formSuccessMsg: string;
    quickPresetsTitle: string;
    presets: { label: string; text: string }[];
    orReachDirectly: string;
    copyNotification: string;
    responseTime: string;
  };
  footer: {
    tagline: string;
    backToTop: string;
    rights: string;
    craftedWith: string;
  };
  customizer: {
    triggerButton: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    roleLabel: string;
    emailLabel: string;
    phoneLabel: string;
    photoLabel: string;
    useDefaultAlex: string;
    useUserPhoto: string;
    resetDefaults: string;
    saveChanges: string;
    savedToast: string;
  };
}
