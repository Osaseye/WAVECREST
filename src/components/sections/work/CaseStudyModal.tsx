import React, { useEffect } from 'react';
import type { Project } from '../../../data/projects';
import { HiOutlineArrowUpRight, HiArrowLeft } from 'react-icons/hi2';
import { FiCheckCircle } from 'react-icons/fi';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Lock body scroll while modal is active
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      className="fixed inset-0 z-[99999] overflow-y-auto bg-[#020B1C]/95 backdrop-blur-3xl animate-in fade-in duration-300"
    >
      <div className="min-h-screen px-4 sm:px-6 lg:px-12 py-6 sm:py-10 max-w-5xl mx-auto flex flex-col">
        
        {/* ========================================================= */}
        {/* TOP BAR: BREADCRUMBS (LEFT) & BACK BUTTON (RIGHT)         */}
        {/* ========================================================= */}
        <div className="flex items-center justify-between gap-4 pb-8 sm:pb-12 border-b border-white/10 mb-8 sm:mb-12">
          {/* Breadcrumbs on Left */}
          <div className="flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
            <button
              onClick={onClose}
              className="hover:text-white transition-colors"
            >
              Work
            </button>
            <span className="text-[#64748B]">/</span>
            <span className="text-white font-semibold truncate max-w-[200px] sm:max-w-none">
              {project.title}
            </span>
          </div>

          {/* Back button on Right */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono font-medium text-white transition-all duration-200"
          >
            <HiArrowLeft className="w-3.5 h-3.5 text-[#08D7FF]" />
            <span className="hidden sm:inline">Back to main website</span>
            <span className="sm:hidden">Back</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* PROJECT EDITORIAL HEADER                                  */}
        {/* ========================================================= */}
        <div className="space-y-6 mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#64748B]">
            <span className="text-[#08D7FF] font-semibold">{project.discipline}</span>
            <span>·</span>
            <span>{project.category}</span>
          </div>

          <div className="flex items-center gap-4">
            {project.iconUrl && (
              <img
                src={project.iconUrl}
                alt=""
                className="h-10 sm:h-12 w-auto object-contain flex-shrink-0"
              />
            )}
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              {project.title}
            </h1>
          </div>

          <p className="text-lg sm:text-2xl text-[#94A3B8] font-normal leading-relaxed max-w-3xl">
            {project.tagline}
          </p>
        </div>

        {/* ========================================================= */}
        {/* FULL-WIDTH CRISP UI SHOWCASE (NO FAKE BROWSER TITLEBAR)   */}
        {/* ========================================================= */}
        <div className="mb-14 sm:mb-20 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#030D22] shadow-[0_25px_80px_rgba(0,0,0,0.8)]">
          <img
            src={project.imageUrl}
            alt={`${project.title} Live UI Showcase`}
            className="w-full h-auto object-cover object-top filter contrast-[1.02] brightness-[1.01]"
          />
        </div>

        {/* ========================================================= */}
        {/* CLEAN EDITORIAL NARRATIVE & OVERVIEW                      */}
        {/* ========================================================= */}
        <div className="space-y-12 mb-16 sm:mb-24">
          
          {/* Main Story Overview */}
          <div className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              About the Project
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#CBD5E1] leading-relaxed max-w-4xl font-normal">
              {project.overview.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Key Capabilities */}
          <div className="space-y-6 pt-4 border-t border-white/10">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Key Capabilities Delivered
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {project.keyFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-5 rounded-2xl bg-white/[0.03] border border-white/5"
                >
                  <FiCheckCircle className="w-5 h-5 text-[#08D7FF] flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-[#E2E8F0] leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM ACTION BAR (OPEN LIVE WEBSITE - NO RAW URL)        */}
        {/* ========================================================= */}
        <div className="mt-auto pt-10 pb-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors"
          >
            <HiArrowLeft className="w-4 h-4" />
            <span>Return to portfolio</span>
          </button>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#0878FF] to-[#08D7FF] text-[#020B1C] font-mono text-xs font-bold tracking-wider hover:brightness-110 shadow-[0_0_30px_rgba(8,215,255,0.4)] transition-all"
          >
            <span>OPEN LIVE WEBSITE</span>
            <HiOutlineArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

      </div>
    </div>
  );
};
