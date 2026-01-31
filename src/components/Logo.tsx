import React from 'react';

const OWL_EMOJI = '🦉';

type LogoProps = {
  className?: string;
  iconClassName?: string;
};

/**
 * SAT Mastery logo: owl mascot. Use in Header, Footer, and anywhere the brand mark appears.
 */
export function Logo({ className = '', iconClassName = '' }: LogoProps) {
  return (
    <div
      className={`flex items-center justify-center bg-[var(--color-primary)] rounded-lg overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <span
        className={`leading-none ${iconClassName}`}
        role="img"
        aria-label="SAT Mastery logo"
      >
        {OWL_EMOJI}
      </span>
    </div>
  );
}
