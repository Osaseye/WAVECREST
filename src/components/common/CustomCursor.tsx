import React, { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'view' | 'open' | 'play' | 'pointer';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const render = () => {
      // Smooth lerp for outer ring (0.22 trailing)
      ringX += (targetX - ringX) * 0.22;
      ringY += (targetY - ringY) * 0.22;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Instantaneous 1:1 precision positioning for center dot
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      setIsVisible(true);
      document.body.classList.add('custom-cursor-active');

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Project Cards / Work Items -> VIEW ↗
      if (
        target.closest('[data-cursor="view"]') ||
        target.closest('.project-card') ||
        target.closest('#work a') ||
        target.closest('[data-project-item]')
      ) {
        setMode('view');
      }
      // 2. Media / Video previews -> PLAY ▶
      else if (
        target.closest('[data-cursor="play"]') ||
        target.closest('.video-preview') ||
        target.closest('video')
      ) {
        setMode('play');
      }
      // 3. CTAs / Main Action buttons -> OPEN ↗
      else if (
        target.closest('[data-cursor="open"]') ||
        target.closest('a[href^="#contact"]') ||
        target.closest('button[type="submit"]') ||
        target.closest('.cta-button')
      ) {
        setMode('open');
      }
      // 4. Standard interactive targets -> pointer ring
      else if (target.closest('a, button, [role="button"], input, select, textarea')) {
        setMode('pointer');
      } else {
        setMode('default');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      document.body.classList.remove('custom-cursor-active');
    };

    const onMouseEnter = () => {
      setIsVisible(true);
      document.body.classList.add('custom-cursor-active');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  const isPill = mode === 'view' || mode === 'open' || mode === 'play';

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[2147483647] transition-opacity duration-200 hidden md:block ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Precision Center Cyan Point (Dot) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          className={`w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-[#08D7FF] shadow-[0_0_8px_#08D7FF,0_0_16px_#08D7FF] transition-opacity duration-150 ${
            isPill ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* 2. Trailing Outer Ring / Contextual Pill */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        {isPill ? (
          /* Contextual Dark Navy Pill with Cyan Border */
          <div className="w-max -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#020B1C]/95 border border-[#08D7FF] text-[#08D7FF] font-mono text-[11px] font-bold tracking-wider shadow-[0_0_25px_rgba(8,215,255,0.6)] backdrop-blur-md whitespace-nowrap">
            {mode === 'view' && <span>VIEW ↗</span>}
            {mode === 'open' && <span>OPEN ↗</span>}
            {mode === 'play' && <span>PLAY ▶</span>}
          </div>
        ) : (
          /* Precision Thin Cyan Ring */
          <div
            className={`rounded-full border transition-all duration-200 ${
              mode === 'pointer'
                ? 'w-10 h-10 -ml-5 -mt-5 border-[#08D7FF] bg-[#08D7FF]/20 shadow-[0_0_20px_rgba(8,215,255,0.5)] scale-110'
                : 'w-7 h-7 -ml-3.5 -mt-3.5 border-[#08D7FF]/80 bg-[#08D7FF]/10 shadow-[0_0_12px_rgba(8,215,255,0.3)]'
            }`}
          />
        )}
      </div>
    </div>
  );
};
