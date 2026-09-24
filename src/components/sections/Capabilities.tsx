import React, { useEffect, useRef } from 'react';
import { services, type ServiceItem } from '../../data/services';
import gsap from 'gsap';

export const Capabilities: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 2000);

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

      const stroke1 = Math.round(110 * widthFactor);
      const stroke2 = Math.round(30 * widthFactor);
      const blur1 = Math.round(50 * widthFactor);
      const blur2 = Math.round(30 * widthFactor);

      let pts1: { x: number; y: number }[];
      let pts2: { x: number; y: number }[];

      if (isMobile) {
        pts1 = [
          { x: -width * 0.45, y: height * 0.08 + Math.sin(time * 0.5) * 20 },
          { x: width * 0.85 + nx * 20, y: height * 0.28 + Math.cos(time * 0.6) * 25 + ny * 20 },
          { x: width * 1.25, y: height * 0.52 + Math.sin(time * 0.7) * 25 },
          { x: width * 0.15 - nx * 20, y: height * 0.74 + Math.cos(time * 0.6) * 25 - ny * 18 },
          { x: width * 1.45, y: height * 0.94 + Math.sin(time * 0.5) * 20 },
        ];

        pts2 = pts1.map((pt, i) => ({
          x: pt.x + (i % 2 === 0 ? 10 : -10),
          y: pt.y - 10 + Math.cos(time * 0.6 + i) * 12,
        }));
      } else {
        pts1 = [
          { x: -width * 0.40, y: height * 0.12 + Math.sin(time * 0.5) * 35 },
          { x: width * 0.35 + nx * 20, y: height * 0.30 + Math.cos(time * 0.6) * 45 - ny * 20 },
          { x: width * 0.72 - nx * 15, y: height * 0.58 + Math.sin(time * 0.7) * 40 + ny * 20 },
          { x: width * 0.38 + nx * 25, y: height * 0.82 + Math.cos(time * 0.5) * 35 },
          { x: width * 1.40, y: height * 0.92 + Math.sin(time * 0.6) * 40 },
        ];

        pts2 = pts1.map((pt, i) => ({
          x: pt.x + (i % 2 === 0 ? 12 : -12),
          y: pt.y - 14 + Math.cos(time * 0.6 + i) * 18,
        }));
      }

      // Ribbon 1: Deep Blue Glow
      ctx.save();
      ctx.beginPath();
      drawSpline(pts1, 0.95);

      const grad1 = ctx.createLinearGradient(0, 0, width, height);
      grad1.addColorStop(0, 'rgba(8, 120, 255, 0.15)');
      grad1.addColorStop(0.35, 'rgba(20, 61, 255, 0.50)');
      grad1.addColorStop(0.7, 'rgba(8, 120, 255, 0.60)');
      grad1.addColorStop(1, 'rgba(8, 215, 255, 0.20)');

      ctx.strokeStyle = grad1;
      ctx.lineWidth = stroke1;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(8, 120, 255, 0.40)';
      ctx.shadowBlur = blur1;
      ctx.stroke();
      ctx.restore();

      // Ribbon 2: Cyan Edge
      ctx.save();
      ctx.beginPath();
      drawSpline(pts2, 0.95);

      const grad2 = ctx.createLinearGradient(0, 0, width, height);
      grad2.addColorStop(0, 'rgba(8, 215, 255, 0.15)');
      grad2.addColorStop(0.4, 'rgba(8, 215, 255, 0.80)');
      grad2.addColorStop(0.8, 'rgba(47, 228, 255, 0.85)');
      grad2.addColorStop(1, 'rgba(8, 120, 255, 0.15)');

      ctx.strokeStyle = grad2;
      ctx.lineWidth = stroke2;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(8, 215, 255, 0.70)';
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
      id="services"
      className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#020B1C] text-[#F5F8FF] overflow-hidden"
    >
      {/* Background Continuous Flowing Wave Canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full opacity-65 transition-opacity duration-1000" />
      </div>

      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#0878FF]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#08D7FF]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ========================================================= */}
        {/* SECTION HEADER: BOLD, EDITORIAL, NO BADGES                */}
        {/* ========================================================= */}
        <div className="mb-16 sm:mb-20 border-b border-white/10 pb-8">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-[-0.03em] leading-[0.98]">
            WHAT WE MOVE.
          </h2>
          <p className="mt-4 text-lg sm:text-2xl text-[#94A3B8] font-normal leading-relaxed max-w-3xl">
            Four tightly integrated disciplines. Engineered for velocity, clarity, and real-world results.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2-COLUMN SHOWCASE (PLAYBOOK FROM SELECTED WORK)           */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
          {services.map((srv: ServiceItem) => (
            <div
              key={srv.number}
              className="group space-y-5"
            >
              {/* Visual Showcase Viewport Plate */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#EEF1F7] border border-white/10 group-hover:border-[#08D7FF]/40 transition-all duration-500 shadow-2xl flex items-center justify-center p-3 sm:p-5">
                <img
                  src={srv.imageUrl}
                  alt={srv.title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out rounded-xl sm:rounded-2xl"
                  loading="lazy"
                />
              </div>

              {/* Discipline Metadata & Typography */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-xs font-mono text-[#64748B]">
                  <span className="text-[#08D7FF] font-semibold">{srv.number} · {srv.discipline}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#08D7FF] transition-colors leading-snug">
                  {srv.title}
                </h3>

                <p className="text-base text-[#94A3B8] leading-relaxed">
                  {srv.details}
                </p>

                {/* Clean capability badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {srv.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-[#94A3B8] group-hover:text-white group-hover:border-[#08D7FF]/30 transition-all"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
