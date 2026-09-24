import React, { useState, useEffect } from 'react';
import { RiGithubLine, RiTwitterXLine, RiLinkedinLine, RiInstagramLine } from 'react-icons/ri';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { SolutionsModal } from '../sections/solutions/SolutionsModal';

export const Footer: React.FC = () => {
  const [lagosTime, setLagosTime] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [activeSolutionId, setActiveSolutionId] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      try {
        const time = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setLagosTime(time);
      } catch {
        setLagosTime('WAT (UTC+1)');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#01060F] text-[#94A3B8] border-t border-white/[0.08] pt-20 pb-12 px-4 sm:px-6 lg:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================= */}
        {/* MAIN 3-COLUMN FOOTER DIRECTORY (STUDIO SECTION REMOVED)   */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 pb-16 border-b border-white/[0.08]">
          
          {/* Column 1: Brand Ethos & Social Icons (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#" className="inline-flex items-center gap-3 group">
              <img
                src="/icon.png"
                alt="Wavecrest"
                className="w-9 h-9 object-contain drop-shadow-[0_0_15px_rgba(8,215,255,0.4)]"
              />
              <span className="font-display text-2xl font-black text-white tracking-tight group-hover:text-[#08D7FF] transition-colors">
                WAVECREST
              </span>
            </a>

            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              Engineering high-performance digital platforms, financial rails, and mission-critical software systems that scale businesses.
            </p>

            {/* Social Icons Directly Under Brand Info */}
            <div className="pt-1 flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-[#08D7FF]/20 border border-white/10 hover:border-[#08D7FF]/50 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <RiTwitterXLine className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-[#08D7FF]/20 border border-white/10 hover:border-[#08D7FF]/50 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <RiLinkedinLine className="w-4 h-4" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-[#08D7FF]/20 border border-white/10 hover:border-[#08D7FF]/50 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <RiGithubLine className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-[#08D7FF]/20 border border-white/10 hover:border-[#08D7FF]/50 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <RiInstagramLine className="w-4 h-4" />
              </a>
            </div>

            {/* Studio Operating Clock */}
            <div className="pt-2 flex items-center gap-2.5 font-mono text-xs text-[#64748B]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[#94A3B8]">LAGOS: {lagosTime || 'WAT'}</span>
              <span>·</span>
              <span>REMOTE GLOBAL</span>
            </div>
          </div>

          {/* Column 2: Solutions & Architecture Briefings (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <span className="font-display text-sm font-bold text-white uppercase tracking-wider block">
                Solutions &amp; Architecture
              </span>
              <p className="text-xs text-[#64748B]">
                Click any solution to view architectural approach &amp; FAQs.
              </p>
            </div>

            <ul className="space-y-3 text-sm text-[#CBD5E1]">
              <li>
                <button
                  onClick={() => setActiveSolutionId('fintech')}
                  className="hover:text-[#08D7FF] transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="text-[#08D7FF] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Fintech &amp; Payment Rails</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSolutionId('logistics')}
                  className="hover:text-[#08D7FF] transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="text-[#08D7FF] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Freight &amp; Logistics Platforms</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSolutionId('ai')}
                  className="hover:text-[#08D7FF] transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="text-[#08D7FF] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>AI &amp; Warehouse Telemetry</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSolutionId('marketplace')}
                  className="hover:text-[#08D7FF] transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="text-[#08D7FF] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Digital Marketplaces &amp; Escrow</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSolutionId('enterprise')}
                  className="hover:text-[#08D7FF] transition-colors text-left flex items-center gap-1.5 group"
                >
                  <span className="text-[#08D7FF] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  <span>Enterprise Web &amp; Custom Systems</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter Subscription & Direct Contact (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-display text-sm font-bold text-white uppercase tracking-wider block">
              Stay in the Flow
            </span>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Periodic engineering insights, architecture patterns, and product dispatches from our studio.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                <FiCheck className="w-4 h-4 flex-shrink-0" />
                <span>You are subscribed to studio engineering dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter work email..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#08D7FF] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-[#08D7FF] text-[#020B1C] font-mono text-xs font-extrabold hover:brightness-110 shadow-[0_0_20px_rgba(8,215,255,0.4)] transition-all flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>Join</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-3 text-xs font-mono text-[#64748B] space-y-1.5">
              <div>
                Direct: <a href="mailto:support@wavecrestsolutions.com.ng" className="text-[#08D7FF] hover:underline font-semibold">support@wavecrestsolutions.com.ng</a>
              </div>
              <div>Office: Lagos, Nigeria · Worldwide Dispatch</div>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM LEGAL & COPYRIGHT BAR                              */}
        {/* ========================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
          <p>&copy; {new Date().getFullYear()} Wavecrest Solutions. All rights reserved.</p>
          <p className="text-[#64748B]">Operating Worldwide · Lagos, Nigeria</p>
        </div>

      </div>

      {/* Solutions & Architecture Briefing Modal */}
      <SolutionsModal
        solutionId={activeSolutionId}
        onClose={() => setActiveSolutionId(null)}
        onOpenContact={scrollToContact}
      />
    </footer>
  );
};
