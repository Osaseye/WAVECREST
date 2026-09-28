import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { PageWaveRibbon } from '../components/common/PageWaveRibbon';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import { FiCheck, FiCpu, FiCode, FiShield, FiTrendingUp } from 'react-icons/fi';

export const ServicesPage: React.FC = () => {
  const architecturalFeatures = [
    {
      icon: <FiCode className="w-4 h-4 text-[#08D7FF]" />,
      title: 'Web & Mobile Applications',
      desc: 'Fast, responsive web apps and mobile applications engineered to handle high traffic effortlessly.',
    },
    {
      icon: <FiCpu className="w-4 h-4 text-[#08D7FF]" />,
      title: 'Payments & Financial Systems',
      desc: 'Seamless checkout systems, automated accounting ledgers, and secure payment rails.',
    },
    {
      icon: <FiShield className="w-4 h-4 text-[#08D7FF]" />,
      title: 'Security & Cloud Uptime',
      desc: 'Reliable cloud setup with end-to-end security, data protection, and 99.9% uptime reliability.',
    },
    {
      icon: <FiTrendingUp className="w-4 h-4 text-[#08D7FF]" />,
      title: 'Workflow Automation & AI',
      desc: 'Automate repetitive tasks, inventory management, and business telemetry to save hours every day.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#020B1C] text-[#F5F8FF] pt-32 pb-24 overflow-hidden">
      {/* Signature Multi-Section Weaving Flow Wave Ribbon */}
      <PageWaveRibbon opacity={0.7} />

      {/* Ambient Radial Lights */}
      <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-[#0878FF]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[550px] h-[550px] bg-[#08D7FF]/10 rounded-full blur-[190px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero - Clean, Floating Typography (Single Line Heading, Layman-Friendly English, No Pills) */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-[-0.03em] leading-none whitespace-nowrap">
            WHAT WE DO.
          </h1>
          <p className="mt-5 text-lg sm:text-2xl text-[#94A3B8] font-normal leading-relaxed max-w-3xl">
            We build custom websites, mobile applications, and software systems that help businesses work faster and grow with confidence.
          </p>
        </div>

        {/* Floating Visual Showcase Banner */}
        <div className="mb-24 relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.7)] group">
          <img
            src="/services-hero.jpg"
            alt="Wavecrest Software Architecture"
            className="w-full h-[280px] sm:h-[400px] object-cover object-center filter brightness-95 contrast-105 group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020B1C] via-[#020B1C]/40 to-transparent flex items-end p-8 sm:p-12">
            <div className="space-y-2 max-w-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#08D7FF] font-semibold">
                High-Performance Systems
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Engineered for speed, built to scale.
              </h3>
            </div>
          </div>
        </div>

        {/* 4 Core Services - Clean Floating Layout (NO Card Containers) */}
        <div className="space-y-16 sm:space-y-24 mb-28">
          {services.map((srv, idx) => (
            <div
              key={srv.number}
              className={`flex flex-col ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } items-center gap-10 lg:gap-16 pb-16 border-b border-white/10`}
            >
              {/* Floating Media Preview */}
              <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src={srv.imageUrl}
                  alt={srv.title}
                  className="w-full h-[260px] sm:h-[320px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020B1C]/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 font-mono text-xs font-bold text-white/80 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/15">
                  {srv.number} // {srv.discipline}
                </span>
              </div>

              {/* Editorial Description Content */}
              <div className="w-full lg:w-1/2 space-y-5">
                <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {srv.title}
                </h3>

                <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                  {srv.details}
                </p>

                {/* Capabilities list */}
                <div className="pt-2 flex flex-wrap gap-2.5">
                  {srv.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono text-[#CBD5E1] bg-white/[0.03] border border-white/10 flex items-center gap-1.5"
                    >
                      <FiCheck className="w-3.5 h-3.5 text-[#08D7FF]" />
                      <span>{cap}</span>
                    </span>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[#08D7FF] hover:underline"
                  >
                    <span>Request scope for this service</span>
                    <HiOutlineArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clean, Floating Engineering Highlights (NO Cards) */}
        <div className="mb-24 pt-8">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built to scale without headaches.
            </h2>
            <p className="mt-2 text-base text-[#94A3B8]">
              We write clean, well-tested code that your team can easily maintain and scale as your customer base expands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {architecturalFeatures.map((feat, idx) => (
              <div key={idx} className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  {feat.icon}
                  <h4 className="font-display text-base font-bold text-white">
                    {feat.title}
                  </h4>
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Clean, Floating Bottom Call To Action (NO Boxed Card) */}
        <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Have a project in mind?
            </h3>
            <p className="text-base text-[#94A3B8] leading-relaxed">
              Tell us what you are looking to build. We will review your goals and provide an honest, actionable scope within 24 hours.
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
      </div>
    </div>
  );
};
