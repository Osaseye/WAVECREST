import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  showCanvas?: boolean;
}

export const About: React.FC<AboutProps> = ({ showCanvas = true }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 1. Scroll-reveal entrance animation for text and pillars
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        const revealItems = sectionRef.current.querySelectorAll('.about-reveal-item');
        gsap.fromTo(
          revealItems,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    if (!showCanvas) {
      return () => ctx.revert();
    }

    // 2. Continuous flowing ribbon canvas
    const canvas = canvasRef.current;
    if (!canvas) return () => ctx.revert();
    const ctxCanvas = canvas.getContext('2d');
    if (!ctxCanvas) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 900);

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
      time += 0.005;
      ctxCanvas.clearRect(0, 0, width, height);

      const nx = (mouse.x / width - 0.5) * 2;
      const ny = (mouse.y / height - 0.5) * 2;

      const widthFactor = Math.min(1.0, Math.max(0.28, width / 1440));
      const isMobile = width < 768;

      const stroke1 = Math.round(100 * widthFactor);
      const stroke2 = Math.round(26 * widthFactor);
      const blur1 = Math.round(45 * widthFactor);
      const blur2 = Math.round(30 * widthFactor);

      let pts1: { x: number; y: number }[];
      let pts2: { x: number; y: number }[];

      if (isMobile) {
        // Enters cleanly through the left boundary and exits far through the right boundary
        pts1 = [
          { x: -width * 0.45, y: height * 0.20 + Math.sin(time * 0.5) * 25 },
          { x: width * 0.25 - nx * 15, y: height * 0.45 + Math.cos(time * 0.6) * 30 + ny * 15 },
          { x: width * 0.75 + nx * 15, y: height * 0.68 + Math.sin(time * 0.7) * 30 - ny * 15 },
          { x: width * 1.45, y: height * 0.90 + Math.cos(time * 0.5) * 25 },
        ];

        pts2 = pts1.map((pt, i) => ({
          x: pt.x + (i % 2 === 0 ? 8 : -8),
          y: pt.y - 8 + Math.cos(time * 0.6 + i) * 10,
        }));
      } else {
        pts1 = [
          { x: -width * 0.45, y: height * 0.45 + Math.sin(time * 0.5) * 30 },
          { x: width * 0.35 + nx * 20, y: height * 0.65 + Math.cos(time * 0.6) * 35 - ny * 15 },
          { x: width * 0.70 - nx * 15, y: height * 0.35 + Math.sin(time * 0.7) * 35 + ny * 20 },
          { x: width * 1.45, y: height * 0.55 + Math.cos(time * 0.5) * 30 },
        ];

        pts2 = pts1.map((pt, i) => ({
          x: pt.x + (i % 2 === 0 ? 10 : -10),
          y: pt.y - 12 + Math.cos(time * 0.6 + i) * 15,
        }));
      }

      // Ribbon 1: Deep Blue Glow
      ctxCanvas.save();
      ctxCanvas.beginPath();
      drawSpline(pts1, 0.95);

      const grad1 = ctxCanvas.createLinearGradient(0, 0, width, height);
      grad1.addColorStop(0, 'rgba(8, 120, 255, 0.15)');
      grad1.addColorStop(0.4, 'rgba(20, 61, 255, 0.55)');
      grad1.addColorStop(0.7, 'rgba(8, 120, 255, 0.65)');
      grad1.addColorStop(1, 'rgba(8, 215, 255, 0.20)');

      ctxCanvas.strokeStyle = grad1;
      ctxCanvas.lineWidth = stroke1;
      ctxCanvas.lineCap = 'round';
      ctxCanvas.shadowColor = 'rgba(8, 120, 255, 0.40)';
      ctxCanvas.shadowBlur = blur1;
      ctxCanvas.stroke();
      ctxCanvas.restore();

      // Ribbon 2: Cyan Edge
      ctxCanvas.save();
      ctxCanvas.beginPath();
      drawSpline(pts2, 0.95);

      const grad2 = ctxCanvas.createLinearGradient(0, 0, width, height);
      grad2.addColorStop(0, 'rgba(8, 215, 255, 0.15)');
      grad2.addColorStop(0.5, 'rgba(8, 215, 255, 0.85)');
      grad2.addColorStop(1, 'rgba(8, 120, 255, 0.15)');

      ctxCanvas.strokeStyle = grad2;
      ctxCanvas.lineWidth = stroke2;
      ctxCanvas.lineCap = 'round';
      ctxCanvas.shadowColor = 'rgba(8, 215, 255, 0.70)';
      ctxCanvas.shadowBlur = blur2;
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
      id="about"
      className="relative pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-12 bg-transparent text-[#F5F8FF] overflow-hidden"
    >
      {/* Background Continuous Flowing Wave Canvas */}
      {showCanvas && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full opacity-65 transition-opacity duration-1000" />
        </div>
      )}

      {/* Ambient Radial Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0878FF]/10 rounded-full blur-[190px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Crisp Editorial Headline - No Floating Icon Above, Clean 2 Lines */}
        <div className="about-reveal-item space-y-4">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
            BUILT FOR WHAT <br />
            <span className="bg-gradient-to-r from-[#F5F8FF] via-[#08D7FF] to-[#0878FF] bg-clip-text text-transparent">
              MOVES FORWARD.
            </span>
          </h2>
        </div>

        {/* Short, Direct Studio Notes */}
        <div className="about-reveal-item max-w-2xl mx-auto space-y-4 text-base sm:text-xl text-[#94A3B8] leading-relaxed">
          <p>
            We are a software engineering studio based in Lagos, building custom digital platforms for businesses around the world. We work directly with founders and teams to turn ideas into fast, reliable software that people love using.
          </p>
        </div>

        {/* Minimal Floating 3-Pillar Row (No Boxes) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 max-w-3xl mx-auto text-left">
          <div className="about-reveal-item space-y-1.5 pt-4 border-t border-white/15">
            <span className="text-xs font-mono text-[#08D7FF] font-semibold block uppercase">
              How We Work
            </span>
            <h4 className="text-white text-base font-bold">Direct Partnership</h4>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              You collaborate directly with the engineers designing and building your product.
            </p>
          </div>

          <div className="about-reveal-item space-y-1.5 pt-4 border-t border-white/15">
            <span className="text-xs font-mono text-[#08D7FF] font-semibold block uppercase">
              Reliability
            </span>
            <h4 className="text-white text-base font-bold">Clean Code</h4>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Fast, well-tested code and solid databases designed to scale smoothly.
            </p>
          </div>

          <div className="about-reveal-item space-y-1.5 pt-4 border-t border-white/15">
            <span className="text-xs font-mono text-[#08D7FF] font-semibold block uppercase">
              Reach
            </span>
            <h4 className="text-white text-base font-bold">Lagos &amp; Worldwide</h4>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Operating out of Lagos, delivering high-performance software globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
