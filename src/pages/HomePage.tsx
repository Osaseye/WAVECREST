import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/sections/Hero';
import { Positioning } from '../components/sections/Positioning';
import { SelectedWork } from '../components/sections/SelectedWork';
import { Capabilities } from '../components/sections/Capabilities';
import { FinalCTA } from '../components/sections/FinalCTA';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import { FiGift, FiArrowRight } from 'react-icons/fi';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* 01: Hero (Dark Mode + Volumetric Wave Canvas) */}
      <Hero />

      {/* 02: The Kinetic Manifesto & Architecture (BUILD • DESIGN • CONNECT) */}
      <Positioning />

      {/* 03: Shipped Systems Showcase */}
      <div className="relative">
        <SelectedWork />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-8 flex justify-center">
          <Link
            to="/systems"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/[0.06] hover:bg-[#08D7FF]/15 border border-white/15 hover:border-[#08D7FF]/50 text-white font-semibold text-sm transition-all duration-300 shadow-lg backdrop-blur-md group"
          >
            <span>Explore All Shipped Systems &amp; Technical Case Studies</span>
            <HiOutlineArrowUpRight className="w-4 h-4 text-[#08D7FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 04: High-Yield Incentives & Referral Banner - Floating & Editorial */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#0878FF]/10 blur-[180px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-8">
          {/* Spotlight Promotional Banner: ₦50k Website */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#0878FF]/15 via-[#08D7FF]/10 to-transparent border border-[#08D7FF]/30 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_10px_35px_rgba(8,215,255,0.08)]">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#08D7FF]/20 border border-[#08D7FF]/40 text-[#08D7FF] font-mono text-[11px] font-bold uppercase tracking-wider">
                <span>⚡ Promotional Starter Tier</span>
              </div>
              <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Get a website now for as low as <span className="text-[#08D7FF]">₦50,000</span>.
              </h4>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Fast-track your business or personal brand with a clean, mobile-ready website, WhatsApp chat integration, and custom domain setup delivered within 48 to 72 hours.
              </p>
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto">
              <Link
                to="/contact?promo=WEBSITE50K&plan=starter"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#0878FF] to-[#08D7FF] text-[#020B1C] font-bold text-xs sm:text-sm tracking-tight hover:shadow-glow-cyan transition-all flex items-center justify-center gap-2"
              >
                <span>Get Started for ₦50,000</span>
                <FiArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#08D7FF] font-semibold">
                Studio Programs &bull; Limited Slots
              </span>
              <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                15% Off Your Next Build + 10% Cash Referral Bonus.
              </h3>
              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                Whether you are a founder launching a commercial product or a university student outsourcing your final year software project, claim 15% savings. Refer someone to Wavecrest and receive 10% cash upon project kickoff.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0 w-full sm:w-auto">
              <Link
                to="/offers"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#0878FF] to-[#08D7FF] text-[#020B1C] font-bold text-sm tracking-tight hover:shadow-glow-cyan transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>View 15% Discounts</span>
                <FiArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <Link
                to="/offers"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <FiGift className="w-4 h-4 text-[#08D7FF]" />
                <span>10% Referral Bonus</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 05: Capabilities / What We Move */}
      <div className="relative">
        <Capabilities />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-8 flex justify-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/[0.06] hover:bg-[#08D7FF]/15 border border-white/15 hover:border-[#08D7FF]/50 text-white font-semibold text-sm transition-all duration-300 shadow-lg backdrop-blur-md group"
          >
            <span>Learn More About Our Architecture &amp; Delivery Process</span>
            <HiOutlineArrowUpRight className="w-4 h-4 text-[#08D7FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 06: Cinematic Final CTA */}
      <FinalCTA />
    </div>
  );
};
