import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface TestimonialsSectionProps {
  language: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language }) => {
  const t = translations[language].testimonials;

  return (
    <section className="py-24 bg-white border-t border-slate-100 relative">
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

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/70 rounded-2xl p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-6 border-t border-slate-200/60">
                <div className="font-bold text-slate-900 text-sm">{item.clientName}</div>
                <div className="text-xs text-slate-600 font-medium">{item.role}</div>
                <div className="text-xs text-sky-600 font-medium mt-0.5">{item.company}</div>

                <div className="mt-3 text-[11px] text-slate-400 pt-2 border-t border-slate-200/40">
                  <span className="font-medium text-slate-500">
                    {language === 'id' ? 'Proyek:' : 'Delivered:'}{' '}
                  </span>
                  <span>{item.projectDelivered}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
