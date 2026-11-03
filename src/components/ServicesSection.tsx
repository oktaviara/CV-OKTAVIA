import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { translations } from '../data/translations';

interface ServicesSectionProps {
  language: Language;
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  language,
  onSelectService,
}) => {
  const t = translations[language].services;

  return (
    <section id="services" className="py-24 bg-pink-100/40 border-t border-pink-200/70 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="mb-3">
            <span className="text-xs font-bold tracking-widest text-pink-600 uppercase">
              {t.kicker}
            </span>
            <div className="w-10 h-0.5 bg-pink-500 mt-1.5" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mt-4 text-balance">
            {t.title}
          </h2>
          <p className="text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Services Grid (Clean 3-column cards with editorial numbers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.items.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="bg-white/95 rounded-2xl p-8 border border-pink-200/90 shadow-xs hover:shadow-md hover:shadow-pink-100/60 transition-all duration-300 flex flex-col justify-between group hover:border-pink-400"
            >
              <div>
                {/* Top Bar with Editorial Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-3xl font-bold text-pink-500 tabular-nums">
                    {service.number}
                  </span>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-9 h-9 rounded-full bg-pink-50 group-hover:bg-pink-500 group-hover:text-white flex items-center justify-center text-pink-700 transition-colors cursor-pointer"
                    title={t.inquireService}
                    aria-label={`Inquire about ${service.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Service Title & Tagline */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-4 leading-normal">
                  {service.tagline}
                </p>

                {/* Body Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="mb-6 pt-4 border-t border-pink-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-pink-900/60 block mb-3">
                    {t.deliverablesLabel}
                  </span>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-pink-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom: Tech Stack & Inquire Button */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-pink-900 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-200/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-pink-900 bg-pink-50/80 hover:bg-pink-500 hover:text-white rounded-lg border border-pink-200 transition-colors text-center cursor-pointer"
                >
                  {t.inquireService}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
