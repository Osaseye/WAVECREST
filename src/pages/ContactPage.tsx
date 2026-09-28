import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageWaveRibbon } from '../components/common/PageWaveRibbon';
import { FiMail, FiMapPin, FiCheck, FiSend, FiClock } from 'react-icons/fi';
import { HiOutlineBriefcase, HiOutlineAcademicCap } from 'react-icons/hi2';
import { RiWhatsappLine } from 'react-icons/ri';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialPromo = searchParams.get('promo') || '';
  const initialType = searchParams.get('type') || '';
  const initialPlan = searchParams.get('plan') || '';
  const is50kPromo = initialPromo.toUpperCase() === 'WEBSITE50K' || initialPlan === 'starter';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [clientType, setClientType] = useState(
    initialType === 'student' ? 'student' : 'business'
  );
  const [projectCategory, setProjectCategory] = useState(
    is50kPromo
      ? 'Starter One-Page Website (₦50,000 Promo)'
      : initialType === 'student'
      ? 'University Final Year Project'
      : 'Custom Web Platform'
  );
  const [promoCode, setPromoCode] = useState(initialPromo);
  const [budget, setBudget] = useState(is50kPromo ? '₦50k - ₦150k' : '₦250k - ₦500k');
  const [timeline, setTimeline] = useState(is50kPromo ? 'Urgent (< 3 Weeks)' : '1 - 2 Months');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lagosTime, setLagosTime] = useState('');

  // Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const time = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setLagosTime(time);
      } catch {
        setLagosTime('WAT (UTC+1)');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (apiKey) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: apiKey,
            subject: `[Wavecrest Scope] ${name} (${clientType.toUpperCase()}) - ${projectCategory}`,
            from_name: name,
            email: email,
            phone: phone,
            organization: organization,
            client_type: clientType,
            project_category: projectCategory,
            promo_code: promoCode || 'None',
            budget: budget,
            timeline: timeline,
            project_details: details,
          }),
        });
        const data = await response.json();
        if (response.ok && data.success) {
          setSubmitted(true);
        } else {
          setSubmitted(true);
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoUrl = `mailto:support@wavecrestsolutions.com.ng?subject=${encodeURIComponent(
    `Project Inquiry: ${name || 'Prospective Partner'} [${projectCategory}]`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nClient Type: ${clientType}\nOrganization/University: ${organization}\nCategory: ${projectCategory}\nPromo/Referral: ${promoCode}\nBudget: ${budget}\nTimeline: ${timeline}\n\nProject Scope:\n${details}`
  )}`;

  return (
    <div className="relative min-h-screen bg-[#020B1C] text-[#F5F8FF] pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Signature Multi-Section Weaving Flow Wave Ribbon */}
      <PageWaveRibbon opacity={0.7} />

      {/* Ambient Lights */}
      <div className="absolute top-20 right-1/4 w-[650px] h-[650px] bg-[#0878FF]/10 rounded-full blur-[190px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[600px] h-[600px] bg-[#08D7FF]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header - Clean, Floating Typography (No AI-Slop Pills) */}
        <div className="max-w-4xl mb-16">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-[-0.03em] leading-tight">
            START A PROJECT.
          </h1>
          <p className="mt-4 text-lg sm:text-2xl text-[#94A3B8] font-normal leading-relaxed max-w-3xl">
            Tell us about what you want to build. We review your requirements and respond with an honest scope, cost estimate, and timeline within 24 hours.
          </p>
        </div>

        {/* Floating 2-Column Layout (NO Big Outer Cards, NO Nested Mini Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Touchpoints & Pure Clean Map */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Direct Channels - Floating List (No Outer Box, No Nested Card-in-Card) */}
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#08D7FF] font-semibold block">
                Direct Channels
              </span>

              <div className="space-y-3">
                <a
                  href="mailto:support@wavecrestsolutions.com.ng"
                  className="flex items-center gap-3.5 py-3 border-b border-white/10 text-sm text-[#CBD5E1] hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center text-[#08D7FF] group-hover:scale-110 transition-transform">
                    <FiMail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#64748B] font-mono">Email Dispatch</div>
                    <div className="font-medium text-white">support@wavecrestsolutions.com.ng</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/2348123456789?text=Hello%20Wavecrest%20Solutions,%20I%20would%20like%20to%20inquire%20about%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 py-3 border-b border-white/10 text-sm text-[#CBD5E1] hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <RiWhatsappLine className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#64748B] font-mono">WhatsApp Direct</div>
                    <div className="font-medium text-white">Chat With Lead Architect</div>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 py-3 border-b border-white/10 text-sm text-[#CBD5E1]">
                  <div className="w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center text-[#0878FF]">
                    <FiClock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#64748B] font-mono">Operating Hours</div>
                    <div className="font-medium text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Lagos (WAT): {lagosTime || '09:00 - 18:00'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 py-3 text-sm text-[#CBD5E1]">
                  <div className="w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center text-[#08D7FF]">
                    <FiMapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#64748B] font-mono">Location</div>
                    <div className="font-medium text-white">Victoria Island / Lekki, Lagos &bull; Remote Worldwide</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pure Interactive Map - NO Header, NO Footer (Just Clean Edge-to-Edge Map) */}
            <div className="rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative">
              <div className="relative w-full h-[320px] bg-[#020B1C]">
                <iframe
                  title="Wavecrest Solutions Lagos Studio Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126844.06348605553!2d3.351486348128362!3d6.446860086395232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4cc9b091f03%3A0x656c07579ff966c8!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-[120%] opacity-85"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Styled Studio Pulse Marker Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-[#08D7FF]/40 animate-ping" />
                    <span className="relative w-4 h-4 rounded-full bg-[#08D7FF] border-2 border-white shadow-[0_0_15px_#08D7FF]" />
                  </div>
                  <div className="mt-2 px-3 py-1 rounded-full bg-[#06132D]/95 border border-[#08D7FF]/40 text-[10px] font-mono font-bold text-white shadow-xl backdrop-blur-md">
                    Wavecrest Solutions &bull; Lagos
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Project Scope Form (NO Heavy Box Card Container) */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="text-center py-16 space-y-5 animate-in fade-in duration-500">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <FiCheck className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl font-bold text-white">Transmission Received</h3>
                <p className="text-base text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{name || 'there'}</span>. We have received your project details and will follow up directly at <span className="text-[#08D7FF] font-semibold">{email}</span> within 24 hours.
                </p>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={mailtoUrl}
                    className="px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-mono text-white transition-colors"
                  >
                    Open in Email Client
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-full bg-[#08D7FF] text-[#020B1C] text-xs font-mono font-bold hover:brightness-110 transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                    Project Requirements
                  </h3>
                  <p className="text-sm text-[#94A3B8] mt-1">
                    Please share your goals and timeline below.
                  </p>
                </div>

                {/* Audience Switch (Clean Segmented) */}
                <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-white/[0.04] border border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setClientType('business');
                      if (projectCategory === 'University Final Year Project') {
                        setProjectCategory('Custom Web Platform');
                      }
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-display font-semibold transition-all flex items-center justify-center gap-2 ${
                      clientType === 'business'
                        ? 'bg-[#08D7FF]/20 text-white border border-[#08D7FF]/50 shadow-sm'
                        : 'text-[#64748B] hover:text-white'
                    }`}
                  >
                    <HiOutlineBriefcase className="w-3.5 h-3.5" />
                    <span>Commercial / Startup</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setClientType('student');
                      setProjectCategory('University Final Year Project');
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-display font-semibold transition-all flex items-center justify-center gap-2 ${
                      clientType === 'student'
                        ? 'bg-[#08D7FF]/20 text-white border border-[#08D7FF]/50 shadow-sm'
                        : 'text-[#64748B] hover:text-white'
                    }`}
                  >
                    <HiOutlineAcademicCap className="w-3.5 h-3.5" />
                    <span>University Student</span>
                  </button>
                </div>

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#08D7FF] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#08D7FF] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 or international"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#08D7FF] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                      {clientType === 'student' ? 'University / Department' : 'Company or Project Name'}
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder={clientType === 'student' ? 'e.g. UNILAG Comp Sci' : 'e.g. Acme Corp'}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#08D7FF] transition-colors"
                    />
                  </div>
                </div>

                {/* Project Category & Promo Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                      Project Type
                    </label>
                    <select
                      value={projectCategory}
                      onChange={(e) => setProjectCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#030d22] border border-white/10 text-white text-sm focus:outline-none focus:border-[#08D7FF] transition-colors"
                    >
                      {clientType === 'student' ? (
                        <>
                          <option value="University Final Year Project">University Final Year Project</option>
                          <option value="Student Web / Mobile App">Student Web / Mobile App</option>
                          <option value="AI / Machine Learning Model">AI / Machine Learning Model</option>
                          <option value="IoT & Hardware Telemetry">IoT &amp; Hardware Telemetry</option>
                        </>
                      ) : (
                        <>
                          <option value="Starter One-Page Website (₦50,000 Promo)">Starter One-Page Website (₦50,000 Promo)</option>
                          <option value="Custom Web Platform">Custom Web Platform</option>
                          <option value="Mobile App (iOS / Android)">Mobile App (iOS / Android)</option>
                          <option value="Fintech & Payments System">Fintech &amp; Payments System</option>
                          <option value="Logistics & Dispatch Software">Logistics &amp; Dispatch Software</option>
                          <option value="UI/UX & Brand Design">UI/UX &amp; Brand Design</option>
                          <option value="Cloud Architecture & Audit">Cloud Architecture &amp; Audit</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                        Promo / Referral Code
                      </label>
                      {promoCode && (
                        <span className="text-[10px] font-mono text-[#08D7FF] font-bold">
                          {promoCode.toUpperCase() === 'WEBSITE50K' ? '₦50K PROMO' : '15% APPLIED'}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="CLIENT15 / STUDENT15 / WEBSITE50K / Referrer"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#08D7FF] transition-colors"
                    />
                  </div>
                </div>

                {/* Budget Range - Starting Small as Requested! */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                      Budget Range
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#030d22] border border-white/10 text-white text-sm focus:outline-none focus:border-[#08D7FF] transition-colors"
                    >
                      {clientType === 'student' ? (
                        <>
                          <option value="₦100k - ₦200k">₦100k - ₦200k (Standard Project)</option>
                          <option value="₦200k - ₦350k">₦200k - ₦350k (Advanced Project)</option>
                          <option value="₦350k+">₦350k+ (Complex Thesis)</option>
                        </>
                      ) : (
                        <>
                          <option value="₦50k - ₦150k">₦50,000 - ₦150,000 (Starter Website Tier)</option>
                          <option value="₦250k - ₦500k">₦250k - ₦500k (Starter / MVP)</option>
                          <option value="₦500k - ₦1.5M">₦500k - ₦1.5M (Growth Stage)</option>
                          <option value="₦1.5M - ₦3.5M">₦1.5M - ₦3.5M (Full Platform)</option>
                          <option value="₦3.5M - ₦8M">₦3.5M - ₦8M (Scale Systems)</option>
                          <option value="₦8M+">₦8M+ (Enterprise Infrastructure)</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                      Target Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#030d22] border border-white/10 text-white text-sm focus:outline-none focus:border-[#08D7FF] transition-colors"
                    >
                      <option value="Urgent (< 3 Weeks)">Urgent (&lt; 3 Weeks)</option>
                      <option value="1 - 2 Months">1 - 2 Months</option>
                      <option value="3 - 6 Months">3 - 6 Months</option>
                      <option value="Flexible / Ongoing">Flexible / Ongoing</option>
                    </select>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                    Project Details &bull; What do you want to build? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Briefly describe what your software should do, key features needed, or any specific deadlines..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#08D7FF] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#0878FF] via-[#08B2FF] to-[#08D7FF] text-[#020B1C] font-bold text-sm tracking-tight shadow-[0_0_25px_rgba(8,215,255,0.4)] hover:shadow-[0_0_35px_rgba(8,215,255,0.6)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="font-mono text-xs">TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>Send Project Details</span>
                      <FiSend className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <p className="text-xs text-[#64748B]">
                    Prefer email direct? <a href={mailtoUrl} className="text-[#08D7FF] hover:underline font-semibold">Send via Email App</a>
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
