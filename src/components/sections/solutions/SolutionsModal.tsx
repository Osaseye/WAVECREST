import React, { useEffect, useState } from 'react';
import { HiArrowLeft, HiOutlineArrowUpRight } from 'react-icons/hi2';
import { FiCheckCircle, FiChevronDown, FiHelpCircle } from 'react-icons/fi';

export interface SolutionDetail {
  id: string;
  title: string;
  category: string;
  tagline: string;
  summary: string;
  challenges: string[];
  capabilities: string[];
  relevantProjects: { name: string; link: string }[];
  faqs: { question: string; answer: string }[];
}

export const solutionsData: Record<string, SolutionDetail> = {
  fintech: {
    id: 'fintech',
    title: 'Fintech Infrastructure & Payment Rails',
    category: 'Financial Engineering',
    tagline: 'Centralized transaction gateways, real-time settlement engines, and automated ledgers.',
    summary: 'High-growth digital companies cannot afford payment failures, manual bookkeeping errors, or delayed settlement reconciliations. We engineer bank-grade financial infrastructure that unifies multi-channel payment acceptance with an immutable double-entry ledger, giving your treasury complete visibility and compliance.',
    challenges: [
      'Disjointed checkout gateways causing dropped transactions and high churn',
      'Manual end-of-month reconciliations prone to human bookkeeping errors',
      'Complex multi-currency payouts and volatile settlement delays',
      'Regulatory compliance requirements and strict audit trail demands',
    ],
    capabilities: [
      'Unified multi-channel payment gateway integration with smart routing',
      'Automated double-entry internal ledger engine and audit logs',
      'Real-time transaction settlement and wallet balance architecture',
      'Bank-grade encryption, PCI-DSS compliance, and fraud heuristics',
    ],
    relevantProjects: [
      { name: 'Qivo (Centralized Payment Gateway & Ledger)', link: '#work' },
    ],
    faqs: [
      {
        question: 'How do you ensure transaction security and data protection?',
        answer: 'We design all financial systems using end-to-end payload encryption, isolated vault architectures for sensitive credentials, and tamper-evident audit logs that meet enterprise compliance standards.',
      },
      {
        question: 'Can you integrate local Nigerian and international payment methods?',
        answer: 'Yes. We build custom payment routers supporting bank transfers, cards, dynamic virtual accounts, and international gateway fallbacks for seamless authorization.',
      },
      {
        question: 'What is the typical deployment timeline for a custom financial system?',
        answer: 'A production-grade custom gateway or ledger MVP is typically architected, tested, and deployed to production within 6 to 10 weeks.',
      },
    ],
  },
  logistics: {
    id: 'logistics',
    title: 'Freight & Logistics Platforms',
    category: 'Supply Chain & Dispatch',
    tagline: 'Intercity haulage networks, automated driver dispatch, and real-time cargo GPS telemetry.',
    summary: 'Overland and maritime freight operations demand high-reliability coordination between shippers, vessel operators, and trucking fleets. We build comprehensive logistics operating systems that automate load matching, provide live transit milestones, issue digital bills of lading, and streamline client quoting.',
    challenges: [
      'Opaque transit statuses leaving shippers and clients in the dark',
      'Manual, phone-based driver dispatch causing inefficient truck utilization',
      'Paper proof-of-delivery documents that get lost or delayed',
      'Complex offshore chartering quotes requiring manual back-and-forth',
    ],
    capabilities: [
      'Automated cargo dispatch portals and route allocation engines',
      'Real-time GPS tracking and geofenced transit milestone alerts',
      'Digital bill of lading and instant electronic delivery sign-off',
      'Multi-hub fleet management dashboard with driver payout automation',
    ],
    relevantProjects: [
      { name: 'Zoport Logistics (Nationwide Freight Haulage)', link: '#work' },
      { name: 'Crownlith Marine Logistics (Offshore Cargo & Vessels)', link: '#work' },
    ],
    faqs: [
      {
        question: 'Does the tracking system work on low-bandwidth mobile networks?',
        answer: 'Yes. Our driver apps and tracking portals use optimized telemetry protocols that consume minimal data and sync reliably even across intermittent 2G/3G connections.',
      },
      {
        question: 'Can enterprise clients book and pay for bulk freight online?',
        answer: 'We integrate self-service commercial portals allowing verified corporate clients to submit cargo manifests, receive instant quotes, and pay via invoice or online transfer.',
      },
    ],
  },
  ai: {
    id: 'ai',
    title: 'AI Stock Intelligence & Warehousing',
    category: 'Enterprise Intelligence',
    tagline: 'Predictive stock forecasting, automated reorder thresholds, and warehouse telemetry.',
    summary: 'Carrying dead inventory ties up critical working capital, while unexpected stockouts destroy revenue and customer loyalty. We develop intelligent warehouse and inventory telemetry systems that analyze sales velocity, forecast replenishment deadlines in advance, and balance multi-location stock automatically.',
    challenges: [
      'Unpredictable demand spikes leading to lost sales from stockouts',
      'Excessive capital locked in slow-moving or obsolete SKUs',
      'Discrepancies between physical warehouse counts and online store channels',
      'Manual purchase order creation slowing down supplier replenishment',
    ],
    capabilities: [
      'Predictive AI demand models analyzing historical seasonality and velocity',
      'Automated supplier reorder alerts before critical depletion thresholds',
      'Multi-location warehouse stock balancing and audit discrepancy logging',
      'Barcode and QR batch receiving tools for mobile warehouse floor staff',
    ],
    relevantProjects: [
      { name: 'Inventra (AI Warehouse & Stock Telemetry)', link: '#work' },
    ],
    faqs: [
      {
        question: 'How accurate is the predictive AI stock forecasting?',
        answer: 'By training predictive regression models on your sales history, seasonality, and supplier lead times, our systems typically forecast stock depletion within a 3-day variance window.',
      },
      {
        question: 'Does it integrate with existing ERPs or e-commerce platforms?',
        answer: 'Yes. We engineer bidirectional sync connectors for custom databases, Shopify, WooCommerce, and proprietary inventory databases.',
      },
    ],
  },
  marketplace: {
    id: 'marketplace',
    title: 'Digital Marketplaces & Escrow Commerce',
    category: 'Digital Commerce',
    tagline: 'High-trust buyer-seller exchanges, escrow protection, and rapid multi-vendor catalogs.',
    summary: 'Trust is the defining currency of any digital marketplace. We design and build end-to-end commerce hubs with escrow-backed checkout protection, verified merchant badges, and automated payout splits, providing buyers and sellers with total confidence.',
    challenges: [
      'Buyer hesitation and scam fears in peer-to-peer digital transactions',
      'Complicated vendor onboarding and manual inventory catalog sync',
      'Dispute resolution bottlenecks when orders go unfulfilled',
      'Slow mobile load speeds driving away data-conscious African shoppers',
    ],
    capabilities: [
      'Escrow payment protection holding funds until delivery verification',
      'Multi-vendor merchant dashboards with automated revenue splitting',
      'Instant digital asset and credential release mechanisms',
      'Low-data mobile web storefronts optimized for high conversion',
    ],
    relevantProjects: [
      { name: 'GGPlug (Gaming Commerce & Escrow Marketplace)', link: '#work' },
      { name: 'Noma Africa (All-in-One Nigerian Retail Hub)', link: '#work' },
      { name: 'Luna Afford Group (Direct-to-Consumer Home Store)', link: '#work' },
    ],
    faqs: [
      {
        question: 'How does escrow protection work on the platform?',
        answer: 'When a buyer checks out, their payment is secured in a segregated holding account. The funds are only disbursed to the seller once the buyer confirms delivery or automated verification passes.',
      },
      {
        question: 'Can vendors manage their own inventory and withdrawal requests?',
        answer: 'Yes. Each vendor receives a dedicated portal to manage products, view sales analytics, and request automated bank transfers for their earnings.',
      },
    ],
  },
  enterprise: {
    id: 'enterprise',
    title: 'Enterprise Web & Custom Digital Systems',
    category: 'Custom Architecture',
    tagline: 'High-concurrency web platforms, custom workflows, and specialized SaaS engines.',
    summary: 'Off-the-shelf software rarely fits complex business models. We partner directly with founders and leadership teams to architect, design, and ship custom digital platforms engineered specifically around your company’s unique operational requirements and scalability demands.',
    challenges: [
      'Outgrowing generic SaaS tools that lack crucial custom business logic',
      'Slow, bloated legacy software that employees and customers dread using',
      'High recurring subscription costs for tools that fail to integrate cleanly',
      'Inability to scale infrastructure as transaction volumes multiply',
    ],
    capabilities: [
      'Full-stack custom platform architecture designed for high concurrent throughput',
      'Clean, intuitive UI design that drastically reduces onboarding time',
      'Bespoke API development, third-party integrations, and webhooks',
      'Continuous deployment pipelines and comprehensive observability monitoring',
    ],
    relevantProjects: [
      { name: 'MyTutorMe (University EdTech & AI Learning)', link: '#work' },
      { name: 'Resume AI (ATS Job Match Platform)', link: '#work' },
    ],
    faqs: [
      {
        question: 'Do we own the full intellectual property and source code?',
        answer: '100% yes. All custom code, designs, and database architectures created for your project are fully owned by your company upon project completion.',
      },
      {
        question: 'How do we maintain and update the platform after launch?',
        answer: 'Wavecrest provides continuous SLA monitoring, security patching, and dedicated engineering retainers to ensure your system evolves seamlessly alongside your business.',
      },
    ],
  },
};

interface SolutionsModalProps {
  solutionId: string | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const SolutionsModal: React.FC<SolutionsModalProps> = ({
  solutionId,
  onClose,
  onOpenContact,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (!solutionId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [solutionId, onClose]);

  if (!solutionId || !solutionsData[solutionId]) return null;

  const solution = solutionsData[solutionId];

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      className="fixed inset-0 z-[99999] overflow-y-auto bg-[#020B1C]/95 backdrop-blur-3xl animate-in fade-in duration-300"
    >
      <div className="min-h-screen px-4 sm:px-6 lg:px-12 py-8 sm:py-12 max-w-4xl mx-auto flex flex-col">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-4 pb-8 border-b border-white/10 mb-8 sm:mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
            <button onClick={onClose} className="hover:text-white transition-colors">
              Solutions
            </button>
            <span className="text-[#64748B]">/</span>
            <span className="text-white font-semibold truncate max-w-[200px] sm:max-w-none">
              {solution.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono font-medium text-white transition-all"
          >
            <HiArrowLeft className="w-3.5 h-3.5 text-[#08D7FF]" />
            <span className="hidden sm:inline">Back to Studio</span>
            <span className="sm:hidden">Back</span>
          </button>
        </div>

        {/* Header Story */}
        <div className="space-y-5 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#08D7FF] font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#08D7FF] animate-pulse" />
            <span>{solution.category} · System Briefing</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {solution.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#94A3B8] font-normal leading-relaxed">
            {solution.tagline}
          </p>
        </div>

        {/* Narrative Overview */}
        <div className="space-y-12 mb-14 sm:mb-16">
          <div className="p-7 sm:p-8 rounded-3xl bg-[#04102A]/80 border border-white/10 space-y-4">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              The Architecture &amp; Strategic Approach
            </h2>
            <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed font-normal">
              {solution.summary}
            </p>
          </div>

          {/* Industry Challenges & Our Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
              <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider block">
                Common Industry Pain Points
              </span>
              <ul className="space-y-3 text-sm text-[#94A3B8]">
                {solution.challenges.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold mt-0.5">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
              <span className="text-xs font-mono text-[#08D7FF] font-bold uppercase tracking-wider block">
                How Wavecrest Engineers the Solution
              </span>
              <ul className="space-y-3 text-sm text-[#CBD5E1]">
                {solution.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <FiCheckCircle className="w-4 h-4 text-[#08D7FF] flex-shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Relevant Production Systems Shipped */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider block">
              Proven Production References
            </span>
            <div className="flex flex-wrap gap-3">
              {solution.relevantProjects.map((p, idx) => (
                <a
                  key={idx}
                  href={p.link}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-[#08D7FF]/15 border border-white/10 hover:border-[#08D7FF]/40 text-xs font-mono text-white transition-all"
                >
                  <span>{p.name}</span>
                  <HiOutlineArrowUpRight className="w-3.5 h-3.5 text-[#08D7FF]" />
                </a>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <FiHelpCircle className="w-5 h-5 text-[#08D7FF]" />
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Frequently Asked Architecture Questions
              </h2>
            </div>

            <div className="space-y-3 pt-2">
              {solution.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-[#08D7FF] transition-colors"
                    >
                      <span>{faq.question}</span>
                      <FiChevronDown
                        className={`w-4 h-4 text-[#08D7FF] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-[#94A3B8] leading-relaxed animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors"
          >
            <HiArrowLeft className="w-4 h-4" />
            <span>Return to Studio</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0878FF] to-[#08D7FF] text-[#020B1C] font-mono text-xs font-bold tracking-wider hover:brightness-110 shadow-[0_0_25px_rgba(8,215,255,0.4)] transition-all"
          >
            <span>DISCUSS THIS ARCHITECTURE WITH US</span>
            <HiOutlineArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
};
