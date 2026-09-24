import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/common/Navbar';
import { CustomCursor } from './components/common/CustomCursor';
import { Hero } from './components/sections/Hero';
import { Positioning } from './components/sections/Positioning';
import { SelectedWork } from './components/sections/SelectedWork';
import { Capabilities } from './components/sections/Capabilities';
import { About } from './components/sections/About';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/common/Footer';

export default function App() {
  useEffect(() => {
    // On touch devices / mobile screens, bypass Lenis so touch scrolling is 100% native, instant, and frictionless
    const isTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0);

    if (isTouch) {
      return;
    }

    // Initialize snappy, responsive Lenis on desktop
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020B1C] text-[#F5F8FF] selection:bg-[#08D7FF] selection:text-[#020B1C] overflow-x-hidden antialiased">
      {/* Subtle interactive cursor aura ring */}
      <CustomCursor />

      {/* Floating minimal navigation pill */}
      <Navbar />

      {/* Main Experience: Dark -> Light -> Dark Orchestration */}
      <main>
        {/* 01: Hero (Dark Mode + Signature Wave) */}
        <Hero />

        {/* 02: The Kinetic Manifesto & Architecture (BUILD • DESIGN • CONNECT) */}
        <Positioning />

        {/* 03: Selected Work: Client + Proprietary (Light Mode Canvas) */}
        <SelectedWork />

        {/* 04: Capabilities / What We Move */}
        <Capabilities />

        {/* 05: About Wavecrest Solutions */}
        <About />

        {/* 06: Cinematic Final CTA */}
        <FinalCTA />
      </main>

      {/* Deep Studio Footer */}
      <Footer />
    </div>
  );
}
