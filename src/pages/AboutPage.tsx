import React from 'react';
import { Link } from 'react-router-dom';
import { About } from '../components/sections/About';
import { PageWaveRibbon } from '../components/common/PageWaveRibbon';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import { FiGlobe } from 'react-icons/fi';

export const AboutPage: React.FC = () => {
  const principles = [
    {
      num: '01',
      title: 'Direct Collaboration',
      desc: 'You work directly with senior engineers who understand your product goals. No layers of account managers, no lost context.',
    },
    {
      num: '02',
      title: 'High Velocity & Precision',
      desc: 'We launch functional systems rapidly without cutting corners on software architecture, database design, or visual detail.',
    },
    {
      num: '03',
      title: 'Rock-Solid Reliability',
      desc: 'From payments to logistics coordination, our software is tested to operate smoothly 24/7 without unexpected downtime.',
    },
    {
      num: '04',
      title: 'Clear & Honest Communication',
      desc: 'Straightforward timelines, predictable sprint milestones, and transparent updates throughout the development journey.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#020B1C] text-[#F5F8FF] pt-24 pb-24 overflow-hidden">
      {/* Signature Multi-Section Weaving Flow Wave Ribbon */}
      <PageWaveRibbon opacity={0.7} />

      {/* 01: Core Studio Story with single unified continuous wave */}
      <About showCanvas={false} />

      {/* 02: How We Work - Pure Floating Editorial Layout (NO Cards, NO Badges) */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How We Build &amp; Partner.
          </h2>
          <p className="mt-4 text-base sm:text-xl text-[#94A3B8] leading-relaxed">
            We operate as a dedicated engineering partner for your business, focusing on what matters: delivering real software that creates commercial value.
          </p>
        </div>

        {/* Clean Floating Principles - Borderless Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-24">
          {principles.map((p) => (
            <div
              key={p.num}
              className="space-y-3 pt-6 border-t border-white/10"
            >
              <div className="font-mono text-sm font-bold text-[#08D7FF]">
                {p.num}
              </div>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                {p.title}
              </h3>
              <p className="text-base text-[#94A3B8] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Studio Footprint - Floating with Clean Globe Icon (NO Tables, NO Boxed Cards) */}
        <div className="py-16 border-y border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 mb-24">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#08D7FF]/10 flex items-center justify-center flex-shrink-0 text-[#08D7FF]">
              <FiGlobe className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Based in Lagos. Shipping Worldwide.
              </h3>
              <p className="text-sm sm:text-base text-[#94A3B8]">
                We build for ambitious clients and founders across North America, Europe, Africa, and beyond.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-medium text-sm transition-colors flex-shrink-0"
          >
            Get In Touch &rarr;
          </Link>
        </div>

        {/* Floating Bottom Conversion (NO Boxed Card Container) */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to work with Wavecrest?
            </h3>
            <p className="text-base text-[#94A3B8] leading-relaxed">
              Let's talk about what you are building. Send us a message and we will respond within 24 hours.
            </p>
          </div>

          <Link
            to="/contact"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#0878FF] via-[#08B2FF] to-[#08D7FF] text-[#020B1C] font-bold text-sm tracking-tight shadow-[0_0_30px_rgba(8,215,255,0.4)] hover:shadow-[0_0_45px_rgba(8,215,255,0.65)] transition-all flex items-center gap-2 flex-shrink-0"
          >
            <span>Start a Project</span>
            <HiOutlineArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </section>
    </div>
  );
};
