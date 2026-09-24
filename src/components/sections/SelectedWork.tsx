import React, { useState, useEffect, useRef } from 'react';
import { projects, type Project } from '../../data/projects';
import { ProjectVisualizer } from './work/ProjectVisualizer';
import { CaseStudyModal } from './work/CaseStudyModal';
import { HiOutlineArrowUpRight, HiArrowRight } from 'react-icons/hi2';
import gsap from 'gsap';

export const SelectedWork: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'CLIENT WORK' | 'IN-HOUSE VENTURE'>('ALL');
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const filteredProjects = projects.filter(
    (p) => filter === 'ALL' || p.category === filter
  );

  // Show 4 projects by default on the landing page, or all when expanded
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 2800);

    const mouse = { x: width * 0.5, y: height * 0.5 };
    const xTo = gsap.quickTo(mouse, 'x', { duration: 0.8, ease: 'power3.out' });
    const yTo = gsap.quickTo(mouse, 'y', { duration: 0.8, ease: 'power3.out' });

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleTouch = (e: TouchEvent) => {
      if (!canvas || e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      xTo(touch.clientX - rect.left);
      yTo(touch.clientY - rect.top);
    };

    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    let time = 0;

    const drawSpline = (points: { x: number; y: number }[], tension = 0.95) => {
      if (points.length < 2) return;
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = i > 0 ? points[i - 1] : { x: points[0].x - (points[1].x - points[0].x), y: points[0].y - (points[1].y - points[0].y) };
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = i < points.length - 2 ? points[i + 2] : { x: p2.x + (p2.x - p1.x), y: p2.y + (p2.y - p1.y) };

        const cp1x = p1.x + (p2.x - p0.x) / (6 * tension);
        const cp1y = p1.y + (p2.y - p0.y) / (6 * tension);
        const cp2x = p2.x - (p3.x - p1.x) / (6 * tension);
        const cp2y = p2.y - (p3.y - p1.y) / (6 * tension);

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
    };

    const render = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      const nx = (mouse.x / width - 0.5) * 2;
      const ny = (mouse.y / height - 0.5) * 2;

      const widthFactor = Math.min(1.0, Math.max(0.28, width / 1440));
      const isMobile = width < 768;

      const stroke1 = Math.round(120 * widthFactor);
      const stroke2 = Math.round(36 * widthFactor);
      const blur1 = Math.round(50 * widthFactor);
      const blur2 = Math.round(35 * widthFactor);

      let pts1: { x: number; y: number }[];
      let pts2: { x: number; y: number }[];

      if (isMobile) {
        pts1 = [
          { x: -width * 0.45, y: height * 0.05 + Math.sin(time * 0.5) * 20 },
          { x: width * 0.85 + nx * 20, y: height * 0.22 + Math.cos(time * 0.6) * 25 + ny * 20 },
          { x: width * 1.25, y: height * 0.42 + Math.sin(time * 0.7) * 25 },
          { x: width * 0.15 - nx * 20, y: height * 0.62 + Math.cos(time * 0.6) * 25 - ny * 18 },
          { x: width * 0.85 + nx * 20, y: height * 0.82 + Math.sin(time * 0.7) * 25 },
          { x: width * 1.45, y: height * 0.98 + Math.cos(time * 0.5) * 20 },
        ];

        pts2 = pts1.map((pt, i) => ({
          x: pt.x + (i % 2 === 0 ? 10 : -10),
          y: pt.y - 10 + Math.cos(time * 0.6 + i) * 12,
        }));
      } else {
        pts1 = [
          { x: -width * 0.40, y: height * 0.06 + Math.sin(time * 0.5) * 35 },
          { x: width * 0.25 + nx * 20, y: height * 0.22 + Math.cos(time * 0.6) * 45 - ny * 20 },
          { x: width * 0.68, y: height * 0.40 + Math.sin(time * 0.7) * 40 + ny * 25 },
          { x: width * 0.88 + nx * 25, y: height * 0.62 + Math.cos(time * 0.6) * 45 },
          { x: width * 0.45, y: height * 0.80 + Math.sin(time * 0.7) * 40 - ny * 25 },
          { x: width * 1.40, y: height * 0.95 + Math.cos(time * 0.5) * 35 },
        ];

        pts2 = pts1.map((pt, i) => ({
          x: pt.x + (i % 2 === 0 ? 15 : -15),
          y: pt.y - 18 + Math.cos(time * 0.6 + i) * 20,
        }));
      }

      // Ribbon 1
      ctx.save();
      ctx.beginPath();
      drawSpline(pts1, 0.95);

      const grad1 = ctx.createLinearGradient(0, 0, width, height);
      grad1.addColorStop(0, 'rgba(8, 120, 255, 0.20)');
      grad1.addColorStop(0.3, 'rgba(20, 61, 255, 0.55)');
      grad1.addColorStop(0.65, 'rgba(8, 120, 255, 0.65)');
      grad1.addColorStop(0.9, 'rgba(8, 215, 255, 0.35)');
      grad1.addColorStop(1, 'rgba(8, 120, 255, 0.15)');

      ctx.strokeStyle = grad1;
      ctx.lineWidth = stroke1;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(8, 120, 255, 0.45)';
      ctx.shadowBlur = blur1;
      ctx.stroke();
      ctx.restore();

      // Ribbon 2
      ctx.save();
      ctx.beginPath();
      drawSpline(pts2, 0.95);

      const grad2 = ctx.createLinearGradient(0, 0, width, height);
      grad2.addColorStop(0, 'rgba(8, 215, 255, 0.15)');
      grad2.addColorStop(0.3, 'rgba(8, 215, 255, 0.75)');
      grad2.addColorStop(0.7, 'rgba(47, 228, 255, 0.80)');
      grad2.addColorStop(0.95, 'rgba(8, 120, 255, 0.3)');
      grad2.addColorStop(1, 'rgba(8, 215, 255, 0.15)');

      ctx.strokeStyle = grad2;
      ctx.lineWidth = stroke2;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(8, 215, 255, 0.75)';
      ctx.shadowBlur = blur2;
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="work"
      className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#020B1C] text-[#F5F8FF] overflow-hidden"
    >
      {/* Background Continuous Flowing Wave Canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full opacity-65 transition-opacity duration-1000" />
      </div>

      {/* Ambient Radial Depth */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#0878FF]/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-[#08D7FF]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ========================================================= */}
        {/* STUDIO HEADER WITH MINIMALIST, SIMPLE CATEGORY TABS       */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-8 border-b border-white/10 pb-8">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-[-0.03em] leading-[0.98]">
              SHIPPED SYSTEMS.
            </h2>

            <p className="mt-4 text-lg sm:text-2xl text-[#94A3B8] font-normal leading-relaxed">
              Real products. Real systems. Shipped into the world.
            </p>
          </div>

          {/* Minimalist, Clean Category Selector */}
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

        {/* ========================================================= */}
        {/* BALANCED 2-COLUMN PROJECT GRID (4 FEATURED PROJECTS)      */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="group space-y-4"
              data-project-item
            >
              {/* Crisp Pure UI Image */}
              <ProjectVisualizer
                project={project}
                onOpenCaseStudy={setSelectedProject}
              />

              {/* Clean Typography & Details */}
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
                    {project.id === 'crownlith' ? (
                      <>
                        <span className="block">Crownlith Marine</span>
                        <span className="block">Logistics</span>
                      </>
                    ) : (
                      project.title
                    )}
                  </h3>
                </div>

                <p className="text-base text-[#94A3B8] leading-relaxed">
                  {project.tagline}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#08D7FF] hover:text-white transition-colors"
                  >
                    <span>VIEW CASE STUDY</span>
                    <HiOutlineArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* BOTTOM ACTION & MORE PROJECTS TOGGLE                      */}
        {/* ========================================================= */}
        <div className="pt-16 sm:pt-24 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {filteredProjects.length > 4 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-mono text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-2"
            >
              <span>{showAll ? 'SHOW LESS' : `+ ${filteredProjects.length - 4} MORE PROJECTS`}</span>
              <HiArrowRight className={`w-3.5 h-3.5 text-[#08D7FF] transition-transform duration-300 ${showAll ? '-rotate-90' : ''}`} />
            </button>
          )}

          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0878FF] to-[#08D7FF] text-[#020B1C] font-mono text-xs font-bold tracking-wider hover:brightness-110 shadow-[0_0_25px_rgba(8,215,255,0.35)] transition-all"
          >
            BUILD YOUR SYSTEM WITH US
          </a>
        </div>

      </div>

      {/* ========================================================= */}
      {/* CASE STUDY DEDICATED OVERLAY MODAL                        */}
      {/* ========================================================= */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
