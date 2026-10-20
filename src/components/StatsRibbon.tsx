import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface StatsRibbonProps {
  language: Language;
}

export const StatsRibbon: React.FC<StatsRibbonProps> = ({ language }) => {
  const t = translations[language].stats;

  return (
    <section className="border-y border-slate-100 bg-slate-50/70 py-10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {t.items.map((item, index) => (
            <div key={index} className="flex flex-col">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight tabular-nums">
                {item.value}
              </span>
              <span className="text-sm font-semibold text-slate-800 mt-1">
                {item.label}
              </span>
              <span className="text-xs text-slate-500 mt-0.5">
                {item.sublabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
