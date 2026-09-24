export interface ServiceItem {
  number: string;
  discipline: string;
  title: string;
  summary: string;
  details: string;
  capabilities: string[];
  imageUrl: string;
}

export const services: ServiceItem[] = [
  {
    number: '01',
    discipline: 'PRODUCT ARCHITECTURE',
    title: 'Digital Products & Platforms',
    summary: 'Web apps, SaaS systems, and bespoke software built for real scale.',
    details: 'From initial prototype to production traffic, we build resilient software architectures designed around intuitive user workflows, low latency, and zero friction under load.',
    capabilities: ['Custom SaaS Platforms', 'Enterprise Web Apps', 'Cross-Platform Mobile', 'Cloud Infrastructure'],
    imageUrl: '/1.png',
  },
  {
    number: '02',
    discipline: 'VISUAL & INTERACTION DESIGN',
    title: 'Brand Systems & Interface Design',
    summary: 'Visual identities and digital interfaces engineered around human intuition.',
    details: 'We reject generic design templates. Every layout, typography system, micro-interaction, and tactile component is crafted to command brand trust and make complex actions effortless.',
    capabilities: ['Design Systems', 'Tactile UI/UX Design', 'Visual Brand Identity', 'Interactive Prototyping'],
    imageUrl: '/2.png',
  },
  {
    number: '03',
    discipline: 'DIGITAL FLAGSHIPS',
    title: 'Web Experiences & Digital Flagships',
    summary: 'High-performance websites that captivate visitors and drive immediate conversion.',
    details: 'Digital storefronts and studio sites built with fluid motion, responsive physics, and sub-second loading speeds that turn curious visitors into committed clients and partners.',
    capabilities: ['Cinematic Flagship Sites', 'Sub-Second Page Loads', 'High-Converting Funnels', 'Motion & Micro-Interactions'],
    imageUrl: '/3.png',
  },
  {
    number: '04',
    discipline: 'SYSTEM ARCHITECTURE',
    title: 'System Integration & Automation',
    summary: 'APIs, payment rails, and automated pipelines that remove operational friction.',
    details: 'We connect disjointed tools, payment gateways, CRM databases, and messaging channels into harmonious automated systems that work 24/7 without manual intervention.',
    capabilities: ['Payment Rails & Gateways', 'API Integrations', 'Automated Workflows', 'Database & CRM Sync'],
    imageUrl: '/4.png',
  },
];
