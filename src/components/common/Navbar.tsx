import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { HiOutlineArrowUpRight, HiOutlineSparkles } from 'react-icons/hi2';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Systems', path: '/systems' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Offers', path: '/offers', badge: '15% OFF' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 sm:pt-6 transition-all duration-500 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-out ${
          scrolled
            ? 'w-full max-w-4xl px-5 py-2.5 rounded-full bg-[#06132D]/90 backdrop-blur-xl border border-[#08D7FF]/25 shadow-2xl shadow-[#020B1C]/80'
            : 'w-full max-w-7xl px-3 sm:px-5 py-3.5 bg-transparent'
        }`}
      >
        {/* Brand Mark + Name */}
        <Link to="/" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img
              src="/icon.png"
              alt="Wavecrest Mark"
              className="w-8 h-8 object-contain drop-shadow-[0_0_14px_rgba(8,215,255,0.45)]"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base font-bold tracking-tight text-[#F5F8FF] group-hover:text-[#08D7FF] transition-colors">
              WAVECREST
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-[#08D7FF]/15 border border-[#08D7FF]/30 shadow-[0_0_12px_rgba(8,215,255,0.2)]'
                    : 'text-[#94A3B8] hover:text-[#F5F8FF] hover:bg-white/5 border border-transparent'
                }`
              }
            >
              <span>{link.name}</span>
              {link.badge && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold tracking-wider uppercase bg-gradient-to-r from-[#08D7FF] to-[#0878FF] text-[#020B1C]">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right Action CTA */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <Link
            to="/contact"
            className="whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#0878FF] to-[#08D7FF] text-[#020B1C] hover:shadow-glow-cyan transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Start a Project</span>
            <HiOutlineArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
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
        <div className="md:hidden pointer-events-auto fixed inset-x-4 top-20 bg-[#06132D]/95 backdrop-blur-2xl border border-[#08D7FF]/25 rounded-3xl p-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#F5F8FF] hover:text-[#08D7FF] py-2 border-b border-white/5 transition-colors"
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between text-base font-medium py-2 border-b border-white/5 transition-colors ${
                    isActive ? 'text-[#08D7FF] font-semibold' : 'text-[#94A3B8] hover:text-white'
                  }`
                }
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-[#08D7FF] to-[#0878FF] text-[#020B1C]">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}

            {/* Special highlight for referral bonus in mobile menu */}
            <div className="p-3 my-1 rounded-2xl bg-gradient-to-r from-[#08D7FF]/10 to-[#0878FF]/10 border border-[#08D7FF]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HiOutlineSparkles className="w-4 h-4 text-[#08D7FF]" />
                <span className="text-xs text-white font-medium">10% Referral Bonus Program</span>
              </div>
              <Link
                to="/offers"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] font-semibold text-[#08D7FF] underline"
              >
                Learn more
              </Link>
            </div>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#0878FF] to-[#08D7FF] text-[#020B1C]"
            >
              <span>Start a Project</span>
              <HiOutlineArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
