import React from 'react';
import { X, ExternalLink, Github, CheckCircle, ArrowRight } from 'lucide-react';
import { ProjectItem, Language } from '../types';
import { translations } from '../data/translations';

interface ProjectModalProps {
  project: ProjectItem | null;
  language: Language;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  language,
  onClose,
  onContactClick,
}) => {
  if (!project) return null;

  const t = translations[language].portfolio;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-pink-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs px-6 sm:px-8 py-5 border-b border-pink-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-pink-600">{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center text-pink-700 hover:text-pink-950 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Project Title */}
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              {project.title}
            </h3>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              {project.summary}
            </p>
          </div>

          {/* Project Image */}
          <div className="rounded-xl overflow-hidden aspect-16/9 bg-pink-50 border border-pink-100">
            <img
              src={project.thumbnail}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                {language === 'id' ? 'Tantangan & Kebutuhan' : 'Core Challenge'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="bg-pink-50/70 p-5 rounded-xl border border-pink-200/70">
              <h4 className="text-xs font-bold uppercase tracking-wider text-pink-900 mb-2">
                {language === 'id' ? 'Solusi Rekayasa' : 'Engineering Solution'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Impact Callout */}
          <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                {t.projectOutcome}
              </h5>
              <p className="text-xs sm:text-sm text-emerald-800 mt-1">
                {project.impact}
              </p>
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {t.technologiesUsed}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-pink-50 text-pink-900 border border-pink-200/70 rounded-lg text-xs font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs in Modal */}
          <div className="pt-6 border-t border-pink-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors shadow-xs shadow-pink-200"
                >
                  <span>{t.liveDemo}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-pink-900 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors border border-pink-200"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{t.viewCode}</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-pink-600 hover:text-pink-700 hover:underline cursor-pointer"
            >
              <span>{language === 'id' ? 'Ingin sistem serupa? Hubungi saya' : 'Need a similar build? Let\'s talk'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
