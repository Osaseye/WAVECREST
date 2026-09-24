import React, { useState, useEffect, useRef } from 'react';
import { FiMail, FiCheck, FiSend } from 'react-icons/fi';
import gsap from 'gsap';

export const FinalCTA: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
      const stroke2 = Math.round(34 * widthFactor);
      const blur1 = Math.round(50 * widthFactor);
      const blur2 = Math.round(35 * widthFactor);

      let pts1: { x: number; y: number }[];
      let pts2: { x: number; y: number }[];

      if (isMobile) {
        pts1 = [
          { x: -width * 0.25, y: height * 0.25 + Math.sin(time * 0.5) * 20 },
          { x: width * 0.85 + nx * 20, y: height * 0.50 + Math.cos(time * 0.6) * 25 + ny * 20 },
          { x: width * 1.25, y: height * 0.75 + Math.sin(time * 0.7) * 25 },
          { x: width * 0.15 - nx * 20, y: height * 0.95 + Math.cos(time * 0.5) * 20 },
        ];

        pts2 = pts1.map((pt, i) => ({
          x: pt.x + (i % 2 === 0 ? 10 : -10),
          y: pt.y - 10 + Math.cos(time * 0.6 + i) * 12,
        }));
      } else {
        pts1 = [
          { x: -width * 0.1, y: height * 0.55 + Math.sin(time * 0.5) * 35 },
          { x: width * 0.28 + nx * 25, y: height * 0.35 + Math.cos(time * 0.6) * 45 - ny * 20 },
          { x: width * 0.68 - nx * 20, y: height * 0.70 + Math.sin(time * 0.7) * 45 + ny * 25 },
          { x: width * 1.15, y: height * 0.45 + Math.cos(time * 0.5) * 35 },
        ];

        pts2 = pts1.map((pt, i) => ({
          x: pt.x + (i % 2 === 0 ? 15 : -15),
          y: pt.y - 16 + Math.cos(time * 0.6 + i) * 20,
        }));
      }

      // Ribbon 1: Deep Blue Glow
      ctx.save();
      ctx.beginPath();
      drawSpline(pts1, 0.95);

      const grad1 = ctx.createLinearGradient(0, 0, width, height);
      grad1.addColorStop(0, 'rgba(8, 120, 255, 0.12)');
      grad1.addColorStop(0.35, 'rgba(20, 61, 255, 0.60)');
      grad1.addColorStop(0.7, 'rgba(8, 120, 255, 0.70)');
      grad1.addColorStop(1, 'rgba(8, 215, 255, 0.15)');

      ctx.strokeStyle = grad1;
      ctx.lineWidth = stroke1;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(8, 120, 255, 0.45)';
      ctx.shadowBlur = blur1;
      ctx.stroke();
      ctx.restore();

      // Ribbon 2: Cyan Crest
      ctx.save();
      ctx.beginPath();
      drawSpline(pts2, 0.95);

      const grad2 = ctx.createLinearGradient(0, 0, width, height);
      grad2.addColorStop(0, 'rgba(8, 215, 255, 0.15)');
      grad2.addColorStop(0.4, 'rgba(8, 215, 255, 0.85)');
      grad2.addColorStop(0.8, 'rgba(47, 228, 255, 0.90)');
      grad2.addColorStop(1, 'rgba(8, 120, 255, 0.15)');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#020B1C] text-[#F5F8FF] overflow-hidden"
    >
      {/* Background Continuous Flowing Wave Canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full opacity-65 transition-opacity duration-1000" />
      </div>

      {/* Ambient Radial Depth */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-[#0878FF]/10 rounded-full blur-[190px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#08D7FF]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Floating Brand Mark */}
        <div className="inline-flex justify-center mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative group">
            <div className="absolute inset-0 bg-[#08D7FF]/25 rounded-full blur-2xl group-hover:bg-[#08D7FF]/40 transition-all duration-500" />
            <img
              src="/icon.png"
              alt="Wavecrest"
              className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(8,215,255,0.4)]"
            />
          </div>
        </div>

        {/* The Big Punchline Question */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
          HAVE SOMETHING <br />
          <span className="bg-gradient-to-r from-[#F5F8FF] via-[#08D7FF] to-[#0878FF] bg-clip-text text-transparent">
            WORTH BUILDING?
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[#94A3B8] leading-relaxed mb-12">
          Tell us what you are creating. We will review your requirements, assess feasibility, and respond with honest scope and timelines within 24 hours.
        </p>

        {/* Clean, Crisp Contact Form */}
        <div className="max-w-xl mx-auto bg-[#041026]/90 border border-white/15 rounded-3xl p-6 sm:p-9 backdrop-blur-2xl text-left shadow-[0_25px_90px_rgba(0,0,0,0.85)]">
          {submitted ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                <FiCheck className="w-7 h-7" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Transmission Received</h3>
              <p className="text-sm text-[#94A3B8] max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out, <span className="text-white font-semibold">{name || 'there'}</span>. A lead architect will review your brief and follow up directly at <span className="text-[#08D7FF] font-semibold">{email}</span> within 24 hours.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors"
                >
                  Send Another Brief
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 text-base sm:text-sm focus:outline-none focus:border-[#08D7FF] transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@acmecorp.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 text-base sm:text-sm focus:outline-none focus:border-[#08D7FF] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                  Project Brief &amp; Scope
                </label>
                <textarea
                  rows={4}
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  placeholder="Tell us about what you want to build, key goals, timeline, or scope..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 text-base sm:text-sm focus:outline-none focus:border-[#08D7FF] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0878FF] via-[#08B2FF] to-[#08D7FF] text-[#020B1C] font-mono text-xs font-extrabold tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(8,215,255,0.4)] hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>LET&apos;S MAKE IT MOVE</span>
                <FiSend className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              <div className="pt-3 flex items-center justify-center gap-2 text-xs font-mono text-[#64748B]">
                <FiMail className="w-3.5 h-3.5 text-[#08D7FF]" />
                <span>Or email directly:</span>
                <a
                  href="mailto:support@wavecrestsolutions.com.ng"
                  className="text-white hover:text-[#08D7FF] underline font-semibold transition-colors"
                >
                  support@wavecrestsolutions.com.ng
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
