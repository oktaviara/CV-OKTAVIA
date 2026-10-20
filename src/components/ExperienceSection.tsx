import React, { useState } from 'react';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ExperienceSectionProps {
  language: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  const t = translations[language].experience;
  const items = activeTab === 'work' ? t.items : t.educationItems;

  return (
    <section className="py-24 bg-slate-50/70 border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
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

          {/* Tab Switcher */}
          <div className="flex items-center p-1 bg-slate-200/80 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('work')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'work'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t.workTab}</span>
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'education'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.educationTab}</span>
            </button>
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-medium text-sky-600 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {item.role}
              </h3>
              <p className="text-sm font-semibold text-slate-600 mb-4">
                {item.company}
              </p>

              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                {item.description}
              </p>

              {/* Achievements */}
              <div className="space-y-2 mb-6">
                {item.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                {item.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
