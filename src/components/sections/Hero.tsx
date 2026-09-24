import React, { useEffect, useRef } from 'react';
import { WaveRibbon } from '../common/WaveRibbon';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Orchestrated Entrance Timeline: Ribbon surges first before text emerges
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Masked headline text reveal (delayed so ribbon emerges first)
      tl.fromTo(
        '.hero-line-inner',
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.15 },
        0.75
      );

      // Narrative text & action buttons staggered rise
      tl.fromTo(
        '.hero-fade-in',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: 'power3.out' },
        1.15
      );

      // 2. ScrollTrigger Scrubbing on Scroll (Content gently fades and pulls back)
      if (heroRef.current && contentRef.current) {
        gsap.to(contentRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
          y: -60,
          opacity: 0.15,
          scale: 0.97,
          ease: 'none',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] sm:h-screen sm:min-h-[620px] sm:max-h-[1080px] flex flex-col justify-start sm:justify-center px-5 sm:px-6 lg:px-12 bg-[#020B1C] text-[#F5F8FF] overflow-hidden"
    >
      {/* Background Interactive Ribbon Wave System */}
      <WaveRibbon intensity={1} interactive={true} />

      {/* Subtle Background Radial Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(8,215,255,0.07)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(20,61,255,0.09)_0%,transparent_60%)] pointer-events-none" />

      {/* Hero Content Container - Lifted up on mobile to eliminate dead space and fill the viewport */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-start pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-4 my-auto sm:my-0 will-change-transform"
      >
        {/* Monumental Syne Headline (Locked to 2 Punchy Lines with Fluid Scaling) */}
        <div className="mb-4 sm:mb-5 max-w-full">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.25rem] font-extrabold tracking-[-0.035em] leading-[0.96] text-white">
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">WE BUILD</span>
            </span>
            <span className="block overflow-hidden mt-1 sm:mt-2">
              <span className="hero-line-inner block bg-gradient-to-r from-[#F5F8FF] via-[#08D7FF] to-[#0878FF] bg-clip-text text-transparent">
                WHAT MOVES.
              </span>
            </span>
          </h1>
        </div>

        {/* Narrative Underline - Expanded & Sized to Fill Mobile Viewport Cadence */}
        <p className="hero-fade-in max-w-2xl text-lg sm:text-lg md:text-xl text-[#CBD5E1] font-normal leading-relaxed mb-8 sm:mb-6">
          We engineer custom web platforms, mobile applications, and resilient digital systems for ambitious businesses worldwide. Built for velocity, designed with tactile precision, and engineered to scale seamlessly from day one.
        </p>

        {/* Dual Actions - Stacks cleanly on mobile for thumb targets, side-by-side on desktop */}
        <div className="hero-fade-in flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#0878FF] via-[#08B2FF] to-[#08D7FF] text-[#020B1C] font-bold text-sm tracking-tight shadow-[0_0_30px_rgba(8,215,255,0.4)] hover:shadow-[0_0_45px_rgba(8,215,255,0.65)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Start a Project</span>
            <HiOutlineArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-[#08D7FF]/50 text-[#F5F8FF] font-semibold text-sm tracking-tight transition-all duration-300 backdrop-blur-md"
          >
            <span>See Selected Work</span>
          </a>
        </div>
      </div>
    </section>
  );
};
