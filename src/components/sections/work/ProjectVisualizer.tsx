import React from 'react';
import type { Project } from '../../../data/projects';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';

interface ProjectVisualizerProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
  aspectRatio?: 'widescreen' | 'standard' | 'compact';
}

export const ProjectVisualizer: React.FC<ProjectVisualizerProps> = ({
  project,
  onOpenCaseStudy,
}) => {
  return (
    <div
      data-cursor="view"
      onClick={() => onOpenCaseStudy(project)}
      className="group relative w-full rounded-2xl sm:rounded-3xl bg-[#030D22] border border-white/10 hover:border-[#08D7FF]/50 transition-all duration-500 overflow-hidden shadow-2xl cursor-pointer"
    >
      {/* Pure Crisp UI Image - No Top Bar, No Shrinking */}
      <div className="relative w-full bg-[#020B1C] overflow-hidden">
        <img
          src={project.imageUrl}
          alt={`${project.title} Interface`}
          className="w-full h-auto object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02] filter contrast-[1.02] brightness-[1.01]"
          loading="lazy"
        />

        {/* Minimal Hover Overlay - Just Explore Case Study */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020B1C]/90 via-[#020B1C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-5 sm:p-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/20 text-white font-mono text-xs font-semibold shadow-lg">
            <span>Explore Case Study</span>
            <HiOutlineArrowUpRight className="w-3.5 h-3.5 text-[#08D7FF]" />
          </span>
        </div>
      </div>
    </div>
  );
};
