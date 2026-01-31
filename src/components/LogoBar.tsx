import React, { useState } from 'react';
import khanAcademyLogo from '../assets/logos/khan-academy.svg';
import courseraLogo from '../assets/logos/coursera.svg';
import duolingoLogo from '../assets/logos/duolingo.svg';
import edxLogo from '../assets/logos/edx.svg';
import quizletLogo from '../assets/logos/quizlet.svg';
import udemyLogo from '../assets/logos/udemy.svg';

const TRUST_LOGOS = [
  { name: 'Khan Academy', src: khanAcademyLogo },
  { name: 'Coursera', src: courseraLogo },
  { name: 'Duolingo', src: duolingoLogo },
  { name: 'edX', src: edxLogo },
  { name: 'Quizlet', src: quizletLogo },
  { name: 'Udemy', src: udemyLogo },
] as const;

export function LogoBar() {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex items-center gap-4 min-w-fit shrink-0">
            <span className="text-gray-500 font-medium whitespace-nowrap">
              Trusted by students &
              <br />
              educators worldwide
            </span>
            <div className="h-px w-16 bg-gray-300" aria-hidden="true" />
          </div>

          <div className="relative w-full min-w-0 overflow-x-hidden overflow-y-visible pt-16 pb-2">
            {/* Fade masks: left and right into the text / edge */}
            <div
              className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgb(255 255 255) 0%, rgb(255 255 255 / 0.9) 40%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to left, rgb(255 255 255) 0%, rgb(255 255 255 / 0.9) 40%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            <div
              className={`flex items-center gap-6 lg:gap-8 w-max animate-logo-slide ${hoveredLogo ? 'animate-logo-slide-paused' : ''}`}
              style={{ willChange: 'transform' }}
            >
              {[...TRUST_LOGOS, ...TRUST_LOGOS].map(({ name, src }, index) => (
                <div
                  key={`${name}-${index}`}
                  className="relative flex items-center justify-center h-20 w-[160px] shrink-0 px-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  onMouseEnter={() => setHoveredLogo(name)}
                  onMouseLeave={() => setHoveredLogo(null)}
                >
                  <img
                    src={src}
                    alt={name}
                    className="h-14 w-auto max-w-[140px] object-contain object-center select-none"
                    loading="lazy"
                    draggable={false}
                  />
                  {hoveredLogo === name && (
                    <div
                      className="absolute bottom-full left-1/2 mb-2 z-20"
                      style={{ transform: 'translateX(-50%)' }}
                      role="tooltip"
                    >
                      <div className="relative px-4 py-2 rounded-2xl bg-[var(--color-primary)] text-white text-sm font-medium whitespace-nowrap shadow-lg border border-[var(--color-primary-light)]/30 animate-thought-bubble">
                        {name}
                        {/* Thought-bubble tail: small circles */}
                        <div
                          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--color-primary)] border border-[var(--color-primary-light)]/30"
                          aria-hidden="true"
                        />
                        <div
                          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-primary)]/80"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}