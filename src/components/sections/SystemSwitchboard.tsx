import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiLayers, FiCpu, FiCheck, FiTerminal, FiLayout, FiShare2 } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';

type SystemState = 'build' | 'design' | 'connect';

export const SystemSwitchboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SystemState>('build');

  const states = [
    {
      id: 'build' as SystemState,
      label: '01 / BUILD',
      title: 'Engineering That Scales',
      desc: 'Robust full-stack architecture, high-throughput APIs, and production-grade web platforms built to withstand real-world volume.',
      badge: 'TECHNICAL FOUNDATION',
      icon: FiCode,
    },
    {
      id: 'design' as SystemState,
      label: '02 / DESIGN',
      title: 'Interfaces People Remember',
      desc: 'Distinctive visual identities, bespoke design systems, and tactile UI interactions that turn complicated workflows into intuitive products.',
      badge: 'HUMAN INTERACTION',
      icon: FiLayers,
    },
    {
      id: 'connect' as SystemState,
      label: '03 / CONNECT',
      title: 'Everything Is Connected',
      desc: 'Decoupled services, event pipelines, custom API connectors, and automated workflows that unify your data, users, and external software.',
      badge: 'SYSTEM ORCHESTRATION',
      icon: FiShare2,
    },
  ];

  return (
    <section
      id="system"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#020B1C] text-[#F5F8FF] border-b border-white/[0.05] overflow-hidden"
    >
      {/* Background ambient lighting based on active mode */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 ${
          activeTab === 'build'
            ? 'bg-[#0878FF]/15'
            : activeTab === 'design'
            ? 'bg-[#08D7FF]/15'
            : 'bg-[#143DFF]/20'
        }`}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08D7FF]/10 text-[#08D7FF] border border-[#08D7FF]/20 text-xs font-mono mb-4">
              <span>02 / THE ARCHITECTURE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              BUILD. DESIGN. CONNECT.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3B8]">
            The three interconnected pillars that guide every line of code, component library, and digital product we release.
          </p>
        </div>

        {/* Interactive Horizontal Switchboard Controller */}
        <div className="relative border-b border-white/10 pb-4 mb-12">
          <div className="grid grid-cols-3 gap-2 sm:gap-6">
            {states.map((st) => {
              const Icon = st.icon;
              const isActive = activeTab === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveTab(st.id)}
                  className={`group relative text-left py-4 px-3 sm:px-6 rounded-2xl transition-all duration-300 focus:outline-none ${
                    isActive
                      ? 'bg-white/[0.06] border border-[#08D7FF]/30 shadow-lg'
                      : 'hover:bg-white/[0.02] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-[#08D7FF]' : 'text-[#64748B] group-hover:text-white'
                      }`}
                    />
                    <span
                      className={`font-mono text-xs tracking-wider uppercase transition-colors ${
                        isActive ? 'text-[#08D7FF] font-semibold' : 'text-[#64748B] group-hover:text-[#94A3B8]'
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                  <div
                    className={`font-display text-base sm:text-xl font-bold transition-colors ${
                      isActive ? 'text-white' : 'text-[#94A3B8] group-hover:text-white'
                    }`}
                  >
                    {st.id.toUpperCase()}
                  </div>

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#0878FF] via-[#08D7FF] to-[#0878FF]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Stage Display */}
        <div className="relative min-h-[460px] rounded-3xl bg-[#06132D]/70 border border-[#08D7FF]/20 p-6 sm:p-10 backdrop-blur-2xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            {activeTab === 'build' && (
              <motion.div
                key="build"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Content side */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#08D7FF] bg-[#08D7FF]/10 px-3 py-1 rounded-md border border-[#08D7FF]/20">
                    <FiTerminal className="w-3.5 h-3.5" />
                    <span>SYSTEM ARCHITECTURE</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
                    Production systems built for speed and resilient scale.
                  </h3>
                  <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                    We architect clean, testable software without legacy bloat. Type-safe across the wire, database queries optimized down to milliseconds, and zero unnecessary runtime dependencies.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[#64748B]">LATENCY</span>
                      <div className="text-white font-semibold text-sm">&lt; 120ms P95 API</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[#64748B]">TYPE SAFETY</span>
                      <div className="text-[#08D7FF] font-semibold text-sm">STRICT END-TO-END</div>
                    </div>
                  </div>
                </div>

                {/* Visual code / workspace simulation */}
                <div className="lg:col-span-6 bg-[#020B1C] border border-white/10 rounded-2xl p-5 font-mono text-xs text-[#94A3B8] shadow-inner space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[11px] text-[#64748B]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      <span className="ml-2 text-[#F5F8FF]">deployment.pipeline.ts</span>
                    </div>
                    <span className="text-emerald-400">● LIVE</span>
                  </div>

                  <pre className="text-[12px] leading-relaxed overflow-x-auto text-[#F5F8FF]/90">
                    <code>
                      <span className="text-[#08D7FF]">const</span> wavecrest = <span className="text-[#0878FF]">new</span> <span className="text-[#2FE4FF]">Engine</span>({'{'}<br />
                      {'  '}architecture: <span className="text-emerald-300">&apos;decoupled-microservices&apos;</span>,<br />
                      {'  '}reliability: <span className="text-amber-300">0.9999</span>,<br />
                      {'  '}latencyBudget: <span className="text-[#08D7FF]">&apos;sub-100ms&apos;</span>,<br />
                      {'  '}continuousDelivery: <span className="text-[#0878FF]">true</span><br />
                      {'}'});<br /><br />
                      <span className="text-[#64748B]">// Verified live build pipeline</span><br />
                      <span className="text-[#08D7FF]">await</span> wavecrest.<span className="text-[#0878FF]">deployToEdge</span>();
                    </code>
                  </pre>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-[#64748B]">STATUS: VERIFIED READY</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <FiCheck className="w-3.5 h-3.5" /> 100% PASSING
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'design' && (
              <motion.div
                key="design"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#08D7FF] bg-[#08D7FF]/10 px-3 py-1 rounded-md border border-[#08D7FF]/20">
                    <FiLayout className="w-3.5 h-3.5" />
                    <span>INTERACTION &amp; VISUAL SYSTEM</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
                    Every interaction crafted with intent and tactile feedback.
                  </h3>
                  <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                    We design systems that feel organic and responsive. From micro-gestures to typographic hierarchy, we eliminate friction and elevate brand prestige without gaudy clichés.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[#64748B]">FRAME RATE</span>
                      <div className="text-white font-semibold text-sm">60 FPS GPU ANIMATION</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[#64748B]">DESIGN SYSTEM</span>
                      <div className="text-[#08D7FF] font-semibold text-sm">ATOMIC TOKENS</div>
                    </div>
                  </div>
                </div>

                {/* Visual UI component mockup */}
                <div className="lg:col-span-6 bg-gradient-to-br from-[#06132D] to-[#020B1C] border border-[#08D7FF]/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
                      <HiOutlineSparkles className="w-4 h-4 text-[#08D7FF]" />
                      <span>COMPONENT PREVIEW</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#08D7FF]/10 text-[#08D7FF]">
                      INTERACTIVE
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#08D7FF]/40 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-[#94A3B8]">METRIC ACCELERATOR</span>
                        <span className="text-xs font-mono text-[#08D7FF]">+38.4%</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#0878FF] to-[#08D7FF] w-[78%]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                        <span className="text-[11px] font-mono text-[#64748B]">EASING</span>
                        <p className="text-xs font-bold text-white mt-1">cubic-bezier(.16,1,.3,1)</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                        <span className="text-[11px] font-mono text-[#64748B]">CONTRAST</span>
                        <p className="text-xs font-bold text-[#08D7FF] mt-1">WCAG AAA COMPLIANT</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'connect' && (
              <motion.div
                key="connect"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#08D7FF] bg-[#08D7FF]/10 px-3 py-1 rounded-md border border-[#08D7FF]/20">
                    <FiCpu className="w-3.5 h-3.5" />
                    <span>INTEGRATION &amp; WORKFLOW AUTOMATION</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
                    Seamless data pipelines that weave disjointed tools into one.
                  </h3>
                  <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                    Software shouldn&apos;t live in silos. We integrate payment processors, CRM engines, messaging gateways, and background worker queues into resilient automated meshes.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[#64748B]">PIPELINE SYNC</span>
                      <div className="text-white font-semibold text-sm">REAL-TIME WEBHOOKS</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[#64748B]">RELIABILITY</span>
                      <div className="text-[#08D7FF] font-semibold text-sm">AUTOMATIC RETRIES</div>
                    </div>
                  </div>
                </div>

                {/* Visual node mesh */}
                <div className="lg:col-span-6 bg-[#020B1C] border border-[#0878FF]/30 rounded-2xl p-6 shadow-2xl relative">
                  <div className="text-xs font-mono text-[#64748B] mb-4">MESH TOPOLOGY</div>
                  <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-[#08D7FF]/20 text-[#08D7FF]">
                      CLIENT APP
                    </div>
                    <div className="flex items-center justify-center text-[#0878FF]">⇄</div>
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-[#0878FF]/30 text-white">
                      CORE API
                    </div>
                  </div>

                  <div className="my-3 flex justify-center text-[#0878FF]">⇅</div>

                  <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[#94A3B8]">
                      PAYMENTS
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[#94A3B8]">
                      DATABASE
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[#94A3B8]">
                      WEBHOOKS
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                    <span>STATUS: 0 DROPPED EVENTS</span>
                    <span className="text-emerald-400">ALL NODES HEALTHY</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
