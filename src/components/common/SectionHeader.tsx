import React from 'react';

interface SectionHeaderProps {
  number?: string;
  tag: string;
  title: string;
  subtitle?: string;
  theme?: 'dark' | 'light';
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  tag,
  title,
  subtitle,
  theme = 'dark',
  align = 'left',
  className = '',
}) => {
  const isLight = theme === 'light';

  return (
    <div
      className={`mb-12 sm:mb-16 ${
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'
      } ${className}`}
    >
      {/* Editorial eyebrow badge */}
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase mb-4 ${
          isLight
            ? 'bg-[#0878FF]/10 text-[#0878FF] border border-[#0878FF]/20'
            : 'bg-[#08D7FF]/10 text-[#08D7FF] border border-[#08D7FF]/20'
        }`}
      >
        {number && <span className="opacity-70">{number} /</span>}
        <span>{tag}</span>
      </div>

      {/* Primary Section Title */}
      <h2
        className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] ${
          isLight ? 'text-[#020B1C]' : 'text-[#F5F8FF]'
        }`}
      >
        {title}
      </h2>

      {/* Subtitle / Context statement */}
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isLight ? 'text-[#475569]' : 'text-[#94A3B8]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
