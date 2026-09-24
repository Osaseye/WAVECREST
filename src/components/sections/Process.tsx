import React, { useState } from 'react';
import { processStages, type ProcessStage } from '../../data/process';
import { SectionHeader } from '../common/SectionHeader';
import { FiCheckCircle, FiClock } from 'react-icons/fi';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="process"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#06132D] text-[#F5F8FF] border-t border-[#08D7FF]/15 overflow-hidden"
    >
      {/* Background glow node */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-[#0878FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          theme="dark"
          number="05"
          tag="THE PROCESS"
          title="From Idea to Impact."
          subtitle="How we work together: a disciplined, five-stage delivery engine built to eliminate ambiguity and ship on schedule."
        />

        {/* Traveling Wave Pipeline Bar */}
        <div className="relative mb-12 sm:mb-16">
          <div className="hidden lg:grid grid-cols-5 gap-4 relative z-10">
            {processStages.map((st: ProcessStage, idx) => {
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;
              return (
                <button
                  key={st.step}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-4 rounded-2xl transition-all duration-300 border focus:outline-none ${
                    isActive
                      ? 'bg-[#0B1E45] border-[#08D7FF] shadow-glow-cyan'
                      : isPast
                      ? 'bg-white/[0.04] border-[#0878FF]/40 text-white'
                      : 'bg-white/[0.02] border-white/5 text-[#64748B] hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isActive ? 'text-[#08D7FF]' : isPast ? 'text-[#0878FF]' : 'text-[#64748B]'
                      }`}
                    >
                      {st.step}
                    </span>
                    <span className="font-mono text-[10px] text-[#64748B] flex items-center gap-1">
                      <FiClock className="w-3 h-3" />
                      {st.duration}
                    </span>
                  </div>
                  <div
                    className={`font-display text-sm font-bold tracking-tight ${
                      isActive ? 'text-white' : 'text-[#94A3B8]'
                    }`}
                  >
                    {st.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Connected wave line behind the buttons (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 pointer-events-none -z-0" />
        </div>

        {/* Active Stage Detailed Spotlight */}
        <div className="rounded-3xl bg-[#020B1C]/90 border border-[#08D7FF]/20 p-8 sm:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none font-display text-8xl font-black text-[#08D7FF]">
            {processStages[activeStep].step}
          </div>

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08D7FF]/10 text-[#08D7FF] border border-[#08D7FF]/20 text-xs font-mono">
              <span>STAGE {processStages[activeStep].step} &bull; {processStages[activeStep].name}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
              {processStages[activeStep].headline}
            </h3>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              {processStages[activeStep].description}
            </p>

            <div className="pt-6 border-t border-white/10">
              <span className="text-xs font-mono text-[#64748B] block mb-3 uppercase tracking-wider">
                Key Stage Deliverables
              </span>
              <div className="flex flex-wrap gap-3">
                {processStages[activeStep].deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white"
                  >
                    <FiCheckCircle className="w-3.5 h-3.5 text-[#08D7FF]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation controller buttons for mobile */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between lg:hidden">
            <button
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className="px-4 py-2 rounded-xl bg-white/5 text-xs font-mono disabled:opacity-30"
            >
              &larr; PREVIOUS
            </button>
            <span className="text-xs font-mono text-[#64748B]">
              {activeStep + 1} / {processStages.length}
            </span>
            <button
              onClick={() => setActiveStep((prev) => Math.min(processStages.length - 1, prev + 1))}
              disabled={activeStep === processStages.length - 1}
              className="px-4 py-2 rounded-xl bg-white/5 text-xs font-mono disabled:opacity-30"
            >
              NEXT &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
