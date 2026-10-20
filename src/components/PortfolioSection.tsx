import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Eye } from 'lucide-react';
import { Language, ProjectItem } from '../types';
import { translations, sampleProjects } from '../data/translations';

interface PortfolioSectionProps {
  language: Language;
  onOpenProject: (project: ProjectItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  language,
  onOpenProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const t = translations[language].portfolio;
  const projects = sampleProjects[language];

  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'web', label: t.filterWeb },
    { id: 'ecommerce', label: t.filterEcommerce },
    { id: 'mobile', label: t.filterMobile },
    { id: 'system', label: t.filterSystem },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
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

          {/* Interactive Filter Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Project Image Frame with Hover Overlay */}
              <div
                className="relative aspect-16/9 bg-slate-100 overflow-hidden cursor-pointer"
                onClick={() => onOpenProject(project)}
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle scrim overlay on hover */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <span className="px-4 py-2 bg-white/95 text-slate-900 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.viewDetails}</span>
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata with typographic bullet */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                    <span className="font-semibold text-sky-600 uppercase tracking-wider">
                      {project.categoryLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </div>

                  <h3
                    onClick={() => onOpenProject(project)}
                    className="font-display text-2xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors cursor-pointer mb-3"
                  >
                    {project.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {project.summary}
                  </p>
                </div>

                {/* Footer with Tech Tags & Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[11px] font-medium text-slate-400 py-0.5">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenProject(project)}
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-sky-600 transition-colors py-1"
                    >
                      <span>{t.viewDetails}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
