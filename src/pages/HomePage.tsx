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

        <div className="relative z-10 max-w-7xl mx-auto border-y border-white/10 py-14 flex flex-col lg:flex-row items-center justify-between gap-8">
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
