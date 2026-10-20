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
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-sky-600">{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
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
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
            <img
              src={project.thumbnail}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[380px] object-cover"
            />
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                {language === 'id' ? 'Tantangan Proyek' : 'The Challenge'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="bg-sky-50/50 p-5 rounded-xl border border-sky-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 mb-2">
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
                  className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs in Modal */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 rounded-lg hover:bg-sky-600 transition-colors shadow-xs"
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
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
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
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline"
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
