import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { Language, ProfileData } from '../types';
import { translations, skillsList } from '../data/translations';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  profile: ProfileData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  language,
  profile,
}) => {
  if (!isOpen) return null;

  const t = translations[language].about;
  const expT = translations[language].experience;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header toolbar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">{t.cvModalTitle}</span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500">{profile.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'id' ? 'Cetak / Simpan PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Close CV modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable CV Content */}
        <div className="p-8 sm:p-12 space-y-8 bg-white text-slate-900 print:p-0">
          {/* Header */}
          <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
                {profile.name}
              </h1>
              <p className="text-lg font-medium text-sky-600 mt-1">
                {profile.role}
              </p>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {language === 'id' ? 'Ringkasan Profesional' : 'Professional Summary'}
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {profile.bioShort} {profile.bioFull[0]}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {language === 'id' ? 'Kompetensi Teknis' : 'Technical Proficiencies'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 rounded text-xs font-medium text-slate-800"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              {language === 'id' ? 'Riwayat Pengalaman' : 'Work Experience'}
            </h2>
            <div className="space-y-6">
              {expT.items.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.role} · <span className="font-semibold text-slate-700">{item.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-500">{item.period}</span>
                  </div>
                  <p className="text-xs text-slate-600">{item.description}</p>
                  <ul className="space-y-1 pt-1">
                    {item.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="text-sky-500 font-bold">›</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {language === 'id' ? 'Pendidikan Formal & Sertifikasi' : 'Education & Credentials'}
            </h2>
            <div className="space-y-4">
              {expT.educationItems.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{edu.role}</span>
                    <span className="text-slate-600"> — {edu.company}</span>
                  </div>
                  <span className="font-mono text-slate-500">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
