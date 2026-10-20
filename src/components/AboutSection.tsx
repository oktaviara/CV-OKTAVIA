import React from 'react';
import { FileText, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import { Language, ProfileData } from '../types';
import { translations, skillsList } from '../data/translations';

interface AboutSectionProps {
  language: Language;
  profile: ProfileData;
  onOpenCvModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  language,
  profile,
  onOpenCvModal,
}) => {
  const t = translations[language].about;

  return (
    <section id="about" className="py-24 bg-white relative">
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

        {/* 2-Column Split: Bio & Philosophy on Left, Skills & Methodology on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-5 h-5 text-sky-500" />
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
                  {language === 'id' ? 'Filosofi Rekayasa' : 'Engineering Philosophy'}
                </h3>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base italic">
                "{t.corePhilosophy}"
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              {profile.bioFull.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Core Values / Soft Skills */}
            <div className="pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>{t.softSkillsTitle}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.softSkills.map((skill, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download / View CV Button */}
            <div className="pt-4">
              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-sky-600 rounded-lg transition-colors shadow-xs active:scale-95"
              >
                <FileText className="w-4 h-4" />
                <span>{t.downloadCvButton}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Technical Arsenal Grid */}
          <div className="lg:col-span-6">
            <div className="bg-slate-50/60 border border-slate-200/80 p-8 rounded-2xl shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  {t.techSkillsTitle}
                </h3>
                <span className="text-xs font-medium text-slate-500">
                  {language === 'id' ? 'Tingkat Kemahiran' : 'Proficiency'}
                </span>
              </div>

              <div className="space-y-5">
                {skillsList.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">{skill.name}</span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          ({skill.category})
                        </span>
                      </div>
                      <span className="text-xs font-mono font-medium text-slate-600 tabular-nums">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-sky-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Footer Note */}
              <div className="mt-8 pt-4 border-t border-slate-200/60 text-xs text-slate-500 flex items-center justify-between">
                <span>
                  {language === 'id'
                    ? 'Diuji dalam aplikasi produksi berskala nyata'
                    : 'Battle-tested across production grade applications'}
                </span>
                <span className="font-semibold text-sky-600">TypeScript / React 19</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
