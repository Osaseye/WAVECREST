import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface WaveRibbonProps {
  className?: string;
  intensity?: number;
  interactive?: boolean;
}

export const WaveRibbon: React.FC<WaveRibbonProps> = ({
  className = '',
  intensity = 1,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Mouse / touch coordinates with GSAP quickTo spring physics
    const pointer = { x: width * 0.5, y: height * 0.5 };
    const xTo = gsap.quickTo(pointer, 'x', { duration: 0.8, ease: 'power3.out' });
    const yTo = gsap.quickTo(pointer, 'y', { duration: 0.8, ease: 'power3.out' });

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };

    const handleTouch = (e: TouchEvent) => {
      if (!interactive || !canvas || e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      xTo(touch.clientX - rect.left);
      yTo(touch.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    let time = 0;

    // Helper: Draw continuous C1-continuous spline through waypoints with zero sharp angles
    const drawSpline = (points: { x: number; y: number }[], tension = 1.0) => {
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
      time += 0.007 * intensity;
      ctx.clearRect(0, 0, width, height);

      // Normalized pointer delta from center (-1 to 1)
      const nx = (pointer.x / width - 0.5) * 2;
      const ny = (pointer.y / height - 0.5) * 2;

      // Viewport-adaptive stroke scale:
      // On mobile (390px), widthFactor ~ 0.28 -> ribbon 1 ~ 39px, ribbon 2 ~ 14px (slender & crisp)
      // On desktop (1440px), widthFactor = 1.0 -> ribbon 1 = 140px, ribbon 2 = 44px
      const widthFactor = Math.min(1.0, Math.max(0.28, width / 1440));
      const isMobile = width < 768;

      const stroke1 = Math.round(140 * widthFactor);
      const stroke2 = Math.round(44 * widthFactor);
      const stroke3 = Math.max(1.5, 2.5 * widthFactor);
      const blur1 = Math.round(60 * widthFactor);
      const blur2 = Math.round(40 * widthFactor);

      let pts1: { x: number; y: number }[];
      let pts2: { x: number; y: number }[];

      if (isMobile) {
        // =========================================================
        // MOBILE FLUID S-CURVE: WEAVING IN AND OUT OF THE SCREEN
        // Enters off-screen left, arcs across negative space, loops
        // out right, sweeps back in across lower half, and exits
        // =========================================================
        pts1 = [
          { x: -width * 0.25, y: height * 0.16 + Math.sin(time * 0.6) * 22 },
          { x: width * 0.85 + nx * 20, y: height * 0.36 + Math.cos(time * 0.8) * 30 + ny * 20 },
          { x: width * 1.25, y: height * 0.56 + Math.sin(time * 0.7) * 25 },
          { x: width * 0.20 - nx * 20, y: height * 0.76 + Math.cos(time * 0.6) * 30 - ny * 18 },
          { x: width * 1.20, y: height * 0.96 + Math.sin(time * 0.5) * 25 },
        ];

        pts2 = pts1.map((pt, i) => ({
          x: pt.x + (i % 2 === 0 ? 10 : -10),
          y: pt.y - 10 + Math.cos(time * 0.6 + i) * 12,
        }));
      } else {
        // =========================================================
        // DESKTOP HORIZONTAL CREST CURVATURE
        // =========================================================
        pts1 = [
          { x: -width * 0.15, y: height * 0.62 + Math.sin(time * 0.6) * 35 },
          { x: width * 0.22, y: height * 0.34 + Math.sin(time * 0.8) * 45 - ny * 30 },
          { x: width * 0.54 + nx * 25, y: height * 0.65 + Math.cos(time * 0.7) * 40 + ny * 25 },
          { x: width * 0.82, y: height * 0.36 + Math.sin(time * 0.6) * 45 - ny * 20 },
          { x: width * 1.15, y: height * 0.58 + Math.cos(time * 0.5) * 35 },
        ];

        pts2 = [
          { x: -width * 0.15, y: height * 0.56 + Math.cos(time * 0.7) * 30 },
          { x: width * 0.26, y: height * 0.30 + Math.cos(time * 0.8) * 40 + ny * 25 },
          { x: width * 0.56 + nx * 30, y: height * 0.58 + Math.sin(time * 0.7) * 35 - ny * 20 },
          { x: width * 0.85, y: height * 0.32 + Math.cos(time * 0.6) * 40 + ny * 20 },
          { x: width * 1.15, y: height * 0.52 + Math.sin(time * 0.6) * 30 },
        ];
      }

      // --- RIBBON 1: Deep Royal / Electric Blue Ribbon ---
      ctx.save();
      ctx.beginPath();
      drawSpline(pts1, 0.95);

      const grad1 = ctx.createLinearGradient(0, 0, width, height);
      grad1.addColorStop(0, 'rgba(8, 120, 255, 0.0)');
      grad1.addColorStop(0.2, 'rgba(20, 61, 255, 0.65)');
      grad1.addColorStop(0.6, 'rgba(8, 120, 255, 0.75)');
      grad1.addColorStop(0.88, 'rgba(8, 215, 255, 0.45)');
      grad1.addColorStop(1, 'rgba(8, 215, 255, 0.0)');

      ctx.strokeStyle = grad1;
      ctx.lineWidth = stroke1;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(8, 120, 255, 0.55)';
      ctx.shadowBlur = blur1;
      ctx.stroke();
      ctx.restore();

      // --- RIBBON 2: Cyan Crest Ribbon ---
      ctx.save();
      ctx.beginPath();
      drawSpline(pts2, 0.95);

      const grad2 = ctx.createLinearGradient(0, 0, width, height);
      grad2.addColorStop(0, 'rgba(8, 215, 255, 0.0)');
      grad2.addColorStop(0.25, 'rgba(8, 215, 255, 0.85)');
      grad2.addColorStop(0.65, 'rgba(47, 228, 255, 0.95)');
      grad2.addColorStop(0.9, 'rgba(8, 120, 255, 0.4)');
      grad2.addColorStop(1, 'rgba(8, 120, 255, 0.0)');

      ctx.strokeStyle = grad2;
      ctx.lineWidth = stroke2;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(8, 215, 255, 0.85)';
      ctx.shadowBlur = blur2;
      ctx.stroke();
      ctx.restore();

      // --- RIBBON 3: Precision Thin Crest Filament ---
      const pts3 = pts2.map((pt) => ({ x: pt.x, y: pt.y - (isMobile ? 6 : 12) }));

      ctx.save();
      ctx.beginPath();
      drawSpline(pts3, 0.95);

      ctx.strokeStyle = 'rgba(245, 248, 255, 0.85)';
      ctx.lineWidth = stroke3;
      ctx.shadowColor = '#08D7FF';
      ctx.shadowBlur = Math.round(18 * widthFactor);
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
  }, [intensity, interactive]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full opacity-90 transition-opacity duration-1000" />
    </div>
  );
};
