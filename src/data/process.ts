export interface ProcessStage {
  step: string;
  name: string;
  duration: string;
  headline: string;
  description: string;
  deliverables: string[];
}

export const processStages: ProcessStage[] = [
  {
    step: '01',
    name: 'DISCOVER',
    duration: 'Week 1',
    headline: 'Uncover the core leverage point.',
    description: 'We diagnose your product goals, technical constraints, and audience psychology. We eliminate the noise so we only build what creates momentum.',
    deliverables: ['Technical Scope', 'Problem Definition', 'User Flow Matrix'],
  },
  {
    step: '02',
    name: 'DEFINE',
    duration: 'Week 1–2',
    headline: 'Architect before executing.',
    description: 'We map out the system architecture, database schema, tech stack, and milestone roadmap to ensure zero surprises down the line.',
    deliverables: ['System Architecture', 'Information Architecture', 'Sprint Schedule'],
  },
  {
    step: '03',
    name: 'DESIGN',
    duration: 'Week 2–3',
    headline: 'Craft interfaces people remember.',
    description: 'We establish a bespoke visual language, typography, and interactive components. Every transition and gesture is tuned for precision.',
    deliverables: ['High-Fidelity UI', 'Component Library', 'Interactive Prototype'],
  },
  {
    step: '04',
    name: 'BUILD',
    duration: 'Week 3–5',
    headline: 'Engineered for velocity and scale.',
    description: 'Clean, type-safe, production-ready code. We build iteratively with continuous integration, performance benchmarks, and rigorous testing.',
    deliverables: ['Production Codebase', 'API Layer', 'Security & Speed Audit'],
  },
  {
    step: '05',
    name: 'LAUNCH',
    duration: 'Week 6+',
    headline: 'Deploy into the wild.',
    description: 'Smooth staging-to-production cutover, analytics telemetry, DNS setup, and post-launch support to ensure uninterrupted momentum.',
    deliverables: ['Live Deployment', 'Telemetry Dashboard', 'Handoff & Documentation'],
  },
];
