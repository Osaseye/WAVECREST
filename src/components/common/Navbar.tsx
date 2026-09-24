import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'System', href: '#system' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-5 sm:pt-6 transition-all duration-500 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-out ${
          scrolled
            ? 'w-full max-w-3xl px-5 py-2.5 rounded-full bg-[#06132D]/85 backdrop-blur-xl border border-[#08D7FF]/20 shadow-2xl shadow-[#020B1C]/80'
            : 'w-full max-w-7xl px-2 sm:px-4 py-3 bg-transparent'
        }`}
      >
        {/* Brand Mark + Name */}
        <a href="#" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img
              src="/icon.png"
              alt="Wavecrest Mark"
              className="w-8 h-8 object-contain drop-shadow-[0_0_12px_rgba(8,215,255,0.4)]"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base font-bold tracking-tight text-[#F5F8FF] group-hover:text-[#08D7FF] transition-colors">
              WAVECREST
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-[#94A3B8] hover:text-[#F5F8FF] hover:bg-white/5 rounded-full transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Action CTA */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <a
            href="#contact"
            className="whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#0878FF] to-[#08D7FF] text-[#020B1C] hover:shadow-glow-cyan transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Start a Project</span>
            <HiOutlineArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-[#F5F8FF] hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Slide-down Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto fixed inset-x-4 top-20 bg-[#06132D]/95 backdrop-blur-2xl border border-[#08D7FF]/20 rounded-3xl p-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-[#F5F8FF] hover:text-[#08D7FF] py-2 border-b border-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#0878FF] to-[#08D7FF] text-[#020B1C]"
            >
              <span>Start a Project</span>
              <HiOutlineArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
