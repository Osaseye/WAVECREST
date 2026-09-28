import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, type Project } from '../data/projects';
import { ProjectVisualizer } from '../components/sections/work/ProjectVisualizer';
import { CaseStudyModal } from '../components/sections/work/CaseStudyModal';
import { PageWaveRibbon } from '../components/common/PageWaveRibbon';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';

export const SystemsPage: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'CLIENT WORK' | 'IN-HOUSE VENTURE'>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(
    (p) => filter === 'ALL' || p.category === filter
  );

  return (
    <div className="relative min-h-screen bg-[#020B1C] text-[#F5F8FF] pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Signature Multi-Section Weaving Flow Wave Ribbon */}
      <PageWaveRibbon opacity={0.7} />

      {/* Ambient Radial Depth */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-[#0878FF]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[550px] h-[550px] bg-[#08D7FF]/10 rounded-full blur-[190px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Studio Header With Clean, Minimalist Text Category Tabs - Matching Home Page Exactly */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-8 border-b border-white/10 pb-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-[-0.03em] leading-[0.98]">
              SHIPPED SYSTEMS.
            </h1>
            <p className="mt-4 text-lg sm:text-2xl text-[#94A3B8] font-normal leading-relaxed">
              Real products. Real systems. Shipped into the world.
            </p>
          </div>

          {/* Minimalist Text Tabs with Clean Underline (No Pills, No Box Container) */}
          <div className="flex items-center gap-6 sm:gap-8 font-mono text-xs tracking-wider self-start lg:self-auto pb-1">
            {(['ALL', 'CLIENT WORK', 'IN-HOUSE VENTURE'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`pb-1.5 border-b-2 transition-all duration-200 select-none ${
                  filter === cat
                    ? 'border-[#08D7FF] text-white font-semibold'
                    : 'border-transparent text-[#64748B] hover:text-[#94A3B8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Clean, Floating Project Grid - Exactly Like Home Page (No Cards, No Badges On Image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group space-y-4"
            >
              {/* Pure UI Image Visualizer - Zero Badges Overlaid */}
              <ProjectVisualizer
                project={project}
                onOpenCaseStudy={setSelectedProject}
              />

              {/* Clean Typography Details */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3 text-xs font-mono text-[#64748B]">
                  <span className="text-[#08D7FF] font-semibold">{project.discipline}</span>
                </div>

                <div className="flex items-start gap-3">
                  {project.iconUrl && (
                    <img
                      src={project.iconUrl}
                      alt=""
                      className="h-6 sm:h-7 w-auto object-contain flex-shrink-0 mt-1"
                    />
                  )}
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#08D7FF] transition-colors cursor-pointer leading-snug"
                  >
                    {project.title}
                  </h3>
                </div>

                <p className="text-base text-[#94A3B8] leading-relaxed">
                  {project.tagline}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#08D7FF] hover:text-white transition-colors"
                  >
                    <span>VIEW CASE STUDY</span>
                    <HiOutlineArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#64748B] hover:text-[#08D7FF] transition-colors"
                  >
                    Live System &rarr;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Bottom Section: Start A Project (No Box Container, No AI-Slop Pills) */}
        <div className="mt-28 pt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Have something worth building?
            </h3>
            <p className="text-base text-[#94A3B8] leading-relaxed">
              We review your specifications, evaluate technical feasibility, and respond with an honest scope and timeline within 24 hours.
            </p>
          </div>

          <Link
            to="/contact"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#0878FF] via-[#08B2FF] to-[#08D7FF] text-[#020B1C] font-bold text-sm tracking-tight shadow-[0_0_30px_rgba(8,215,255,0.4)] hover:shadow-[0_0_45px_rgba(8,215,255,0.65)] transition-all flex items-center gap-2 flex-shrink-0"
          >
            <span>Start a Project</span>
            <HiOutlineArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>

      {/* Case Study Full Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
