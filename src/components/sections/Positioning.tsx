import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Positioning: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 1. Kinetic headline scroll illumination
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.kinetic-word');
        gsap.fromTo(
          words,
          { opacity: 0.2, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
              end: 'bottom 55%',
              scrub: 0.6,
            },
          }
        );
      }
    }, sectionRef);

    // 2. THE EXACT HERO-GRADE VOLUMETRIC CANVAS WAVE (Identical to Hero Ribbon Engine)
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxCanvas = canvas.getContext('2d');
    if (!ctxCanvas) return;

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

    // Helper: Draw continuous C1-continuous spline through waypoints with zero sharp angles
    const drawSpline = (points: { x: number; y: number }[], tension = 0.95) => {
      if (points.length < 2) return;
      ctxCanvas.moveTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = i > 0 ? points[i - 1] : { x: points[0].x - (points[1].x - points[0].x), y: points[0].y - (points[1].y - points[0].y) };
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = i < points.length - 2 ? points[i + 2] : { x: p2.x + (p2.x - p1.x), y: p2.y + (p2.y - p1.y) };

        const cp1x = p1.x + (p2.x - p0.x) / (6 * tension);
        const cp1y = p1.y + (p2.y - p0.y) / (6 * tension);
        const cp2x = p2.x - (p3.x - p1.x) / (6 * tension);
        const cp2y = p2.y - (p3.y - p1.y) / (6 * tension);

        ctxCanvas.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
      }
    };

    const render = () => {
      time += 0.006;
      ctxCanvas.clearRect(0, 0, width, height);

      const nx = (mouse.x / width - 0.5) * 2;
      const ny = (mouse.y / height - 0.5) * 2;

      // Viewport-adaptive stroke scale:
      const widthFactor = Math.min(1.0, Math.max(0.28, width / 1440));
      const isMobile = width < 768;

      const stroke1 = Math.round(135 * widthFactor);
      const stroke2 = Math.round(42 * widthFactor);
      const stroke3 = Math.max(1.5, 2.5 * widthFactor);
      const blur1 = Math.round(55 * widthFactor);
      const blur2 = Math.round(38 * widthFactor);

      let pts1: { x: number; y: number }[];
      let pts2: { x: number; y: number }[];

      if (isMobile) {
        // Mobile vertical weaving flow: enters and exits viewport edges
        pts1 = [
          { x: width * 1.45, y: height * 0.04 + Math.sin(time * 0.5) * 20 },
          { x: width * 0.20 - nx * 20, y: height * 0.18 + Math.cos(time * 0.6) * 25 + ny * 20 },
          { x: -width * 0.25, y: height * 0.36 + Math.sin(time * 0.7) * 20 },
          { x: width * 0.85 + nx * 25, y: height * 0.54 + Math.cos(time * 0.6) * 25 },
          { x: width * 1.25, y: height * 0.72 + Math.sin(time * 0.7) * 20 },
          { x: width * 0.20 - nx * 20, y: height * 0.88 + Math.cos(time * 0.6) * 25 + ny * 20 },
          { x: -width * 0.45, y: height * 0.98 + Math.sin(time * 0.5) * 20 },
        ];

        pts2 = pts1.map((pt, i) => ({
          x: pt.x + (i % 2 === 0 ? 10 : -10),
          y: pt.y - 10 + Math.cos(time * 0.6 + i) * 12,
        }));
      } else {
        pts1 = [
          { x: width * 1.40, y: height * 0.02 + Math.sin(time * 0.5) * 30 },
          { x: width * 0.76 + nx * 20, y: height * 0.12 + Math.cos(time * 0.6) * 45 + ny * 25 },
          { x: width * 0.40, y: height * 0.28 + Math.sin(time * 0.7) * 40 - ny * 20 },
          { x: width * 0.18 + nx * 25, y: height * 0.50 + Math.cos(time * 0.6) * 45 },
          { x: width * 0.48, y: height * 0.70 + Math.sin(time * 0.7) * 40 - ny * 25 },
          { x: width * 0.82 + nx * 20, y: height * 0.86 + Math.cos(time * 0.6) * 45 + ny * 20 },
          { x: width * 1.40, y: height * 0.98 + Math.sin(time * 0.5) * 30 },
        ];

        pts2 = [
          { x: width * 1.40, y: height * 0.02 - 15 + Math.cos(time * 0.6) * 25 },
          { x: width * 0.74 + nx * 25, y: height * 0.12 - 15 + Math.sin(time * 0.7) * 35 + ny * 20 },
          { x: width * 0.42, y: height * 0.28 - 15 + Math.cos(time * 0.6) * 35 - ny * 15 },
          { x: width * 0.20 + nx * 25, y: height * 0.50 - 15 + Math.sin(time * 0.7) * 35 },
          { x: width * 0.50, y: height * 0.70 - 15 + Math.cos(time * 0.6) * 35 - ny * 20 },
          { x: width * 0.80 + nx * 20, y: height * 0.86 - 15 + Math.sin(time * 0.7) * 35 + ny * 15 },
          { x: width * 1.40, y: height * 0.98 - 15 + Math.cos(time * 0.5) * 25 },
        ];
      }

      ctxCanvas.save();
      ctxCanvas.beginPath();
      drawSpline(pts1, 0.95);

      const grad1 = ctxCanvas.createLinearGradient(0, 0, width, height);
      grad1.addColorStop(0, 'rgba(8, 120, 255, 0.35)');
      grad1.addColorStop(0.2, 'rgba(20, 61, 255, 0.75)');
      grad1.addColorStop(0.55, 'rgba(8, 120, 255, 0.85)');
      grad1.addColorStop(0.85, 'rgba(8, 215, 255, 0.55)');
      grad1.addColorStop(1, 'rgba(8, 120, 255, 0.30)');

      ctxCanvas.strokeStyle = grad1;
      ctxCanvas.lineWidth = stroke1;
      ctxCanvas.lineCap = 'round';
      ctxCanvas.shadowColor = 'rgba(8, 120, 255, 0.55)';
      ctxCanvas.shadowBlur = blur1;
      ctxCanvas.stroke();
      ctxCanvas.restore();

      // --- RIBBON 2: Bright Cyan Crest Ribbon ---
      ctxCanvas.save();
      ctxCanvas.beginPath();
      drawSpline(pts2, 0.95);

      const grad2 = ctxCanvas.createLinearGradient(0, 0, width, height);
      grad2.addColorStop(0, 'rgba(8, 215, 255, 0.25)');
      grad2.addColorStop(0.25, 'rgba(8, 215, 255, 0.90)');
      grad2.addColorStop(0.65, 'rgba(47, 228, 255, 0.95)');
      grad2.addColorStop(0.85, 'rgba(8, 120, 255, 0.50)');
      grad2.addColorStop(1, 'rgba(8, 215, 255, 0.25)');

      ctxCanvas.strokeStyle = grad2;
      ctxCanvas.lineWidth = stroke2;
      ctxCanvas.lineCap = 'round';
      ctxCanvas.shadowColor = 'rgba(8, 215, 255, 0.85)';
      ctxCanvas.shadowBlur = blur2;
      ctxCanvas.stroke();
      ctxCanvas.restore();

      // --- RIBBON 3: Precision White Filament ---
      const pts3 = pts2.map((pt) => ({ x: pt.x, y: pt.y - (isMobile ? 6 : 10) }));

      ctxCanvas.save();
      ctxCanvas.beginPath();
      drawSpline(pts3, 0.95);

      ctxCanvas.strokeStyle = 'rgba(245, 248, 255, 0.80)';
      ctxCanvas.lineWidth = stroke3;
      ctxCanvas.shadowColor = '#08D7FF';
      ctxCanvas.shadowBlur = Math.round(18 * widthFactor);
      ctxCanvas.stroke();
      ctxCanvas.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      cancelAnimationFrame(animationFrameId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="system"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#020B1C] text-[#F5F8FF] overflow-hidden"
    >
      {/* CONTINUOUS HERO-GRADE VOLUMETRIC CANVAS WAVE */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full opacity-70 transition-opacity duration-1000" />
      </div>

      {/* Subtle Background Radial Depth */}
      <div className="absolute top-1/4 right-10 w-[600px] h-[600px] bg-[#0878FF]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-2/3 left-10 w-[600px] h-[600px] bg-[#08D7FF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* ========================================================= */}
        {/* EDITORIAL MANIFESTO HEADLINE (HIGH CONTRAST & WCAG AAA)    */}
        {/* ========================================================= */}
        <div className="mb-20 sm:mb-28 max-w-5xl">
          <h2
            ref={headlineRef}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-tight text-white"
          >
            <span className="inline-block">
              <span className="kinetic-word inline-block mr-2 sm:mr-3">IDEAS</span>
              <span className="kinetic-word inline-block mr-2 sm:mr-3">ARE</span>
              <span className="kinetic-word inline-block mr-3 sm:mr-4 text-[#94B2D7]">EASY.</span>
            </span>{' '}
            <span className="inline-block">
              <span className="kinetic-word inline-block mr-2 sm:mr-3 text-[#08D7FF]">BUILDING</span>
              <span className="kinetic-word inline-block mr-2 sm:mr-3 text-[#08D7FF]">THEM</span>
              <span className="kinetic-word inline-block bg-gradient-to-r from-[#08D7FF] via-[#0878FF] to-[#2FE4FF] bg-clip-text text-transparent">
                ISN&apos;T.
              </span>
            </span>
          </h2>

          <p className="mt-8 text-lg sm:text-2xl text-[#94A3B8] font-normal leading-relaxed max-w-3xl">
            Turning a great idea into a working digital product shouldn't be stressful or complicated. We partner with business owners and founders to design, build, and launch systems that delight your customers and grow your business.
          </p>
        </div>

        {/* ========================================================= */}
        {/* THE THREE PILLARS (EXPANDED VISUAL HEROES)                */}
        {/* ========================================================= */}
        <div className="space-y-28 sm:space-y-40">

          {/* ------------------------------------------------------- */}
          {/* STAGE: BUILD                                            */}
          {/* Left: Client Text | Right: BUILD.png Asset             */}
          {/* ------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Pure Typography */}
            <div className="lg:col-span-5 space-y-6 lg:pr-4">
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                BUILD.
              </h3>

              <p className="text-xl sm:text-2xl font-display font-semibold text-white/90 leading-snug">
                Turning your vision into a real, dependable product.
              </p>

              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                You bring the idea, we handle all the technology. From fast, secure hosting to smooth customer accounts and payments, we build rock-solid digital platforms that work reliably every single day as your business grows.
              </p>
            </div>

            {/* Right Column: BUILD.png Image Asset */}
            <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end lg:pl-4">
              <div className="relative group w-full max-w-2xl lg:ml-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#0878FF]/25 to-[#08D7FF]/25 rounded-3xl blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                <img
                  src="/BUILD.png"
                  alt="Wavecrest Build - Turning Ideas into Working Products"
                  className="relative w-full h-auto object-contain rounded-2xl filter drop-shadow-[0_25px_60px_rgba(8,120,255,0.3)] transform group-hover:scale-[1.02] transition-all duration-500"
                />
              </div>
            </div>

          </div>

          {/* ------------------------------------------------------- */}
          {/* STAGE: DESIGN                                           */}
          {/* Left: DESIGN.png Asset | Right: Client Text            */}
          {/* ------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: DESIGN.png Image Asset */}
            <div className="lg:col-span-7 order-2 lg:order-1 relative flex items-center justify-center lg:justify-start lg:pr-4">
              <div className="relative group w-full max-w-2xl lg:mr-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#08D7FF]/25 to-[#0878FF]/25 rounded-3xl blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                <img
                  src="/DESIGN.png"
                  alt="Wavecrest Design - Beautiful and Intuitive Interfaces"
                  className="relative w-full h-auto object-contain rounded-2xl filter drop-shadow-[0_25px_60px_rgba(8,215,255,0.3)] transform group-hover:scale-[1.02] transition-all duration-500"
                />
              </div>
            </div>

            {/* Right Column: Pure Typography */}
            <div className="lg:col-span-5 space-y-6 lg:pl-4 order-1 lg:order-2">
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                DESIGN.
              </h3>

              <p className="text-xl sm:text-2xl font-display font-semibold text-white/90 leading-snug">
                Simple, beautiful, and effortless for your customers.
              </p>

              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                Great design isn't just about looking good — it's about making your product easy to use. We craft clean, modern interfaces for web and mobile that build instant trust with your customers and make buying or interacting seamless.
              </p>
            </div>

          </div>

          {/* ------------------------------------------------------- */}
          {/* STAGE: CONNECT                                          */}
          {/* Left: Client Text | Right: CONNECT.png Asset           */}
          {/* ------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Pure Typography */}
            <div className="lg:col-span-5 space-y-6 lg:pr-4">
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                CONNECT.
              </h3>

              <p className="text-xl sm:text-2xl font-display font-semibold text-white/90 leading-snug">
                All your tools, payments, and data working as one.
              </p>

              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                Your digital product shouldn't operate in silos. We connect your website or app to online payments, instant customer notifications, inventory, and analytics — giving you a centralized hub where everything runs smoothly.
              </p>
            </div>

            {/* Right Column: CONNECT.png Image Asset */}
            <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end lg:pl-6">
              <div className="relative group w-full max-w-2xl lg:ml-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#0878FF]/25 to-[#08D7FF]/25 rounded-3xl blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
                <img
                  src="/CONNECT.png"
                  alt="Wavecrest Connect - Unified Business Ecosystem"
                  className="relative w-full h-auto object-contain rounded-2xl filter drop-shadow-[0_25px_60px_rgba(8,120,255,0.3)] transform group-hover:scale-[1.02] transition-all duration-500"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
