import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import { Navbar } from './components/common/Navbar';
import { CustomCursor } from './components/common/CustomCursor';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { SystemsPage } from './pages/SystemsPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { OffersPage } from './pages/OffersPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  useEffect(() => {
    // On touch devices / mobile screens, bypass Lenis so touch scrolling is native and responsive
    const isTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0);

    if (isTouch) {
      return;
    }

    // Initialize Lenis on desktop
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
    <BrowserRouter>
      {/* Scroll restoration helper across route transitions */}
      <ScrollToTop />

      <div className="relative min-h-screen bg-[#020B1C] text-[#F5F8FF] selection:bg-[#08D7FF] selection:text-[#020B1C] overflow-x-hidden antialiased">
        {/* Subtle interactive cursor aura ring */}
        <CustomCursor />

        {/* Floating minimal navigation pill */}
        <Navbar />

        {/* Route Pages Container */}
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/systems" element={<SystemsPage />} />
            <Route path="/work" element={<Navigate to="/systems" replace />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Deep Studio Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
