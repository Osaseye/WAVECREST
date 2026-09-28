import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageWaveRibbon } from '../components/common/PageWaveRibbon';
import { HiOutlineAcademicCap, HiOutlineBriefcase } from 'react-icons/hi2';
import { FiCopy, FiCheck, FiCheckCircle, FiShare2, FiArrowRight } from 'react-icons/fi';

export const OffersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clients' | 'students'>('clients');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [calcBudget, setCalcBudget] = useState<number>(1500000); // 1.5M Naira default
  const navigate = useNavigate();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const referralCommission = Math.round(calcBudget * 0.1);

  return (
    <div className="relative min-h-screen bg-[#020B1C] text-[#F5F8FF] pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Signature Multi-Section Weaving Flow Wave Ribbon */}
      <PageWaveRibbon opacity={0.7} />

      {/* Ambient Lights */}
      <div className="absolute top-20 left-1/3 w-[650px] h-[650px] bg-[#0878FF]/10 rounded-full blur-[190px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[600px] h-[600px] bg-[#08D7FF]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Page Header - Clean, Floating Typography (No AI-Slop Pills, Layman English) */}
        <div className="max-w-4xl mb-14">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-[-0.03em] leading-tight">
            15% DISCOUNT <br />
            <span className="bg-gradient-to-r from-[#F5F8FF] via-[#08D7FF] to-[#0878FF] bg-clip-text text-transparent">
              + 10% CASH REFERRAL.
            </span>
          </h1>
          <p className="mt-4 text-lg sm:text-2xl text-[#94A3B8] font-normal leading-relaxed max-w-3xl">
            Save on your next software build. Whether you are launching a business app or finishing your university final year project, get 15% off. Introduce a project and earn 10% cash in return.
          </p>

          {/* Clean Segmented Toggle - Floating (No Heavy Outer Boxes) */}
          <div className="mt-10 inline-flex p-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('clients')}
              className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-display font-bold tracking-wide transition-all duration-300 ${
                activeTab === 'clients'
                  ? 'bg-gradient-to-r from-[#0878FF] to-[#08D7FF] text-[#020B1C] shadow-[0_0_20px_rgba(8,215,255,0.45)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <HiOutlineBriefcase className="w-4 h-4" />
              <span>For Businesses &amp; Founders</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase ${
                activeTab === 'clients' ? 'bg-[#020B1C]/25 text-[#020B1C]' : 'bg-[#08D7FF]/20 text-[#08D7FF]'
              }`}>
                15% OFF
              </span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-display font-bold tracking-wide transition-all duration-300 ${
                activeTab === 'students'
                  ? 'bg-gradient-to-r from-[#0878FF] to-[#08D7FF] text-[#020B1C] shadow-[0_0_20px_rgba(8,215,255,0.45)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <HiOutlineAcademicCap className="w-4 h-4" />
              <span>For University Students</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase ${
                activeTab === 'students' ? 'bg-[#020B1C]/25 text-[#020B1C]' : 'bg-[#08D7FF]/20 text-[#08D7FF]'
              }`}>
                15% OFF
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: CLIENTS & FOUNDERS - Floating Layout, No Boxed AI Slop Cards     */}
        {/* ========================================================================= */}
        {activeTab === 'clients' && (
          <div className="animate-in fade-in duration-400 mb-28 border-y border-white/10 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  15% Off Your First Software Build.
                </h2>

                <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                  Building a new web platform, mobile application, or automation system? Get an immediate 15% discount applied to your initial development milestone.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <FiCheckCircle className="w-5 h-5 text-[#08D7FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#CBD5E1]">
                      <strong>Full Product Scoping:</strong> System roadmap, database planning, and interface designs before coding.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiCheckCircle className="w-5 h-5 text-[#08D7FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#CBD5E1]">
                      <strong>Production Engineering:</strong> Fast, clean code built with modern frameworks and automated tests.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiCheckCircle className="w-5 h-5 text-[#08D7FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#CBD5E1]">
                      <strong>30 Days Free Warranty:</strong> Dedicated technical support after launch to ensure smooth operation.
                    </span>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={() => navigate('/contact?promo=CLIENT15&type=business')}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#0878FF] to-[#08D7FF] text-[#020B1C] font-bold text-sm tracking-tight hover:shadow-glow-cyan transition-all flex items-center justify-center gap-2"
                  >
                    <span>Claim 15% Client Discount</span>
                    <FiArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <div className="flex items-center justify-between sm:justify-start gap-2 px-5 py-3 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs">
                    <span className="text-[#64748B]">Promo Code:</span>
                    <span className="text-[#08D7FF] font-bold">CLIENT15</span>
                    <button
                      onClick={() => handleCopyCode('CLIENT15')}
                      className="p-1 text-[#94A3B8] hover:text-white transition-colors"
                      title="Copy code"
                    >
                      {copiedCode === 'CLIENT15' ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Qualification Steps (No Box Cards) */}
              <div className="lg:col-span-5 space-y-6 pt-6 lg:pt-0 lg:pl-6 lg:border-l border-white/10">
                <span className="font-mono text-xs uppercase tracking-widest text-[#08D7FF] font-bold block">
                  Simple 3-Step Process
                </span>

                <div className="space-y-6">
                  <div className="space-y-1">
                    <div className="font-display text-base font-bold text-white">1. Share Your Brief</div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]">
                      Fill out our short project form and apply code <span className="text-[#08D7FF] font-mono">CLIENT15</span>.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="font-display text-base font-bold text-white">2. Quick Scope Review</div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]">
                      We analyze your requirements and send a clear timeline and cost estimate within 24 hours.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="font-display text-base font-bold text-white">3. Direct Discount</div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]">
                      15% is deducted directly from your initial milestone invoice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: UNIVERSITY STUDENTS & FINAL YEAR PROJECTS - Floating Layout      */}
        {/* ========================================================================= */}
        {activeTab === 'students' && (
          <div className="animate-in fade-in duration-400 mb-28 border-y border-white/10 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  15% Off Final Year Project Outsourcing.
                </h2>

                <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                  Final year can be stressful. Let experienced engineers build your software project to academic standards, so you can focus on reading and defending with 100% confidence.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <FiCheckCircle className="w-5 h-5 text-[#08D7FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#CBD5E1]">
                      <strong>Complete Working Software:</strong> Web apps, mobile apps, AI models, and IoT hardware projects built to work flawlessly.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiCheckCircle className="w-5 h-5 text-[#08D7FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#CBD5E1]">
                      <strong>Documentation &amp; Diagrams:</strong> System Architecture, ERD diagrams, DFD charts, and chapters write-ups included.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiCheckCircle className="w-5 h-5 text-[#08D7FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#CBD5E1]">
                      <strong>Defense Coaching:</strong> We walk you through the codebase step by step so you know exactly how to answer your supervisor's questions.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FiCheckCircle className="w-5 h-5 text-[#08D7FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-[#CBD5E1]">
                      <strong>Student-Friendly Installments:</strong> Pay in flexible milestone stages structured around your semester budget.
                    </span>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={() => navigate('/contact?promo=STUDENT15&type=student')}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#0878FF] to-[#08D7FF] text-[#020B1C] font-bold text-sm tracking-tight hover:shadow-glow-cyan transition-all flex items-center justify-center gap-2"
                  >
                    <span>Claim 15% Student Discount</span>
                    <FiArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <div className="flex items-center justify-between sm:justify-start gap-2 px-5 py-3 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs">
                    <span className="text-[#64748B]">Promo Code:</span>
                    <span className="text-[#08D7FF] font-bold">STUDENT15</span>
                    <button
                      onClick={() => handleCopyCode('STUDENT15')}
                      className="p-1 text-[#94A3B8] hover:text-white transition-colors"
                      title="Copy code"
                    >
                      {copiedCode === 'STUDENT15' ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Student Project Types (Floating, No Box Cards) */}
              <div className="lg:col-span-5 space-y-6 pt-6 lg:pt-0 lg:pl-6 lg:border-l border-white/10">
                <span className="font-mono text-xs uppercase tracking-widest text-[#08D7FF] font-bold block">
                  Supported Project Fields
                </span>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="font-display text-base font-bold text-white">Computer Science &amp; Software</div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]">Web applications, mobile apps, database systems, management portals.</p>
                  </div>

                  <div className="space-y-1">
                    <div className="font-display text-base font-bold text-white">AI, Machine Learning &amp; Vision</div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]">Prediction models, image recognition, neural networks, natural language tools.</p>
                  </div>

                  <div className="space-y-1">
                    <div className="font-display text-base font-bold text-white">Hardware &amp; IoT Telemetry</div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]">Arduino, ESP32, Raspberry Pi, sensor telemetry connected to web dashboards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PROMINENT 10% CASH REFERRAL BONUS - Clean Floating Presentation          */}
        {/* ========================================================================= */}
        <div className="pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#08D7FF] font-semibold block">
                Cash Referral Program
              </span>

              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Earn 10% Cash For Every Project You Refer.
              </h2>

              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                Know someone who needs software built, or a fellow university student seeking final year project help? Refer them to Wavecrest. As soon as their project starts, you get <strong>10% of their project fee paid directly into your bank account</strong>.
              </p>

              {/* 3 Step Floating List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <span className="font-mono text-xs font-bold text-[#08D7FF]">01</span>
                  <h4 className="font-display text-base font-bold text-white">Recommend Us</h4>
                  <p className="text-xs sm:text-sm text-[#94A3B8]">Share our website or WhatsApp link with the client or student.</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/10">
                  <span className="font-mono text-xs font-bold text-[#08D7FF]">02</span>
                  <h4 className="font-display text-base font-bold text-white">They Mention You</h4>
                  <p className="text-xs sm:text-sm text-[#94A3B8]">They enter your name or phone number as their referrer.</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/10">
                  <span className="font-mono text-xs font-bold text-emerald-400">03</span>
                  <h4 className="font-display text-base font-bold text-white">Get Paid Cash</h4>
                  <p className="text-xs sm:text-sm text-[#94A3B8]">Direct cash transfer to your account upon project kickoff.</p>
                </div>
              </div>

              {/* Share Button */}
              <div className="pt-6 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    "Hey! If you need a software application, fintech platform, or your university final year project engineered, check out Wavecrest Solutions (https://wavecrestsolutions.com.ng). They're offering 15% off right now!"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm tracking-tight transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <FiShare2 className="w-4 h-4" />
                  <span>Share via WhatsApp</span>
                </a>

                <Link
                  to="/contact"
                  className="px-7 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-medium text-sm transition-colors"
                >
                  Register a Referral Direct
                </Link>
              </div>
            </div>

            {/* Interactive Calculator - Clean, Floating */}
            <div className="lg:col-span-5 space-y-6 pt-4 lg:pt-0 lg:pl-8 lg:border-l border-white/10">
              <span className="font-mono text-xs text-[#08D7FF] font-bold uppercase tracking-wider block">
                Instant Earnings Calculator
              </span>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#94A3B8]">Project Budget:</span>
                  <span className="text-white font-bold text-sm">
                    ₦{calcBudget.toLocaleString()}
                  </span>
                </div>

                <input
                  type="range"
                  min={250000}
                  max={5000000}
                  step={50000}
                  value={calcBudget}
                  onChange={(e) => setCalcBudget(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#08D7FF]"
                />

                <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
                  <span>₦250k (Student project)</span>
                  <span>₦5M (Enterprise)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-1">
                <span className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider block">
                  Your Direct 10% Cash Payout
                </span>
                <div className="font-display text-4xl sm:text-5xl font-black text-[#08D7FF] tracking-tight">
                  ₦{referralCommission.toLocaleString()}
                </div>
                <p className="text-xs font-mono text-emerald-400 pt-1">
                  Transferred directly to your Nigerian bank account or via international wire.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
