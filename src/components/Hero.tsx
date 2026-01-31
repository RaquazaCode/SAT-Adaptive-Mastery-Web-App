import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import heroTutorInterface from '../assets/hero-tutor-interface.svg';

type FloatingTagStyle = React.CSSProperties & {
  ['--rotation']?: string;
};

const floatingTagStyle = (
  rotation: string,
  animationDelay?: string,
): FloatingTagStyle => ({
  '--rotation': rotation,
  ...(animationDelay ? { animationDelay } : {}),
});
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold text-[var(--color-text-dark)] leading-[1.1] mb-6">
              Your Personal SAT Tutor That Never Sleeps
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Get the proven power of 1-on-1 tutoring, available whenever you need it. Your tutor learns your error patterns, adapts to your schedule, and gets smarter about your weaknesses with every practice session. Join students improving their scores by 200+ points.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                to="/diagnostic"
                className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#2d4434] transition-all transform hover:scale-105 shadow-lg">
                Meet Your Tutor
              </Link>
              <Link
                to="/diagnostic"
                className="border-2 border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[var(--color-primary)] hover:text-white transition-all">
                Start Free Diagnostic
              </Link>
            </div>

            {/* Floating Tags - Decorative */}
            <div className="relative mt-16 h-32 hidden sm:block">
              <div
                className="absolute left-0 top-0 bg-[var(--color-accent-blue)] text-[var(--color-primary)] px-6 py-2 rounded-full transform -rotate-6 animate-float"
                style={floatingTagStyle('-6deg')}>

                <span className="font-semibold">Reading & Writing</span>
              </div>
              <div
                className="absolute left-32 top-12 bg-[var(--color-accent-orange)] text-[var(--color-primary)] px-6 py-2 rounded-full transform rotate-12 animate-float"
                style={floatingTagStyle('12deg', '1s')}>

                <span className="font-semibold">Math Mastery</span>
              </div>
              <div
                className="absolute left-10 top-24 bg-[var(--color-accent-yellow)] text-[var(--color-primary)] px-6 py-2 rounded-full transform -rotate-3 animate-float"
                style={floatingTagStyle('-3deg', '2s')}>

                <span className="font-semibold">Practice Tests</span>
              </div>
              <div className="absolute left-64 top-4 text-[var(--color-accent-orange)] animate-pulse">
                <Sparkles className="w-12 h-12" />
              </div>
              <div
                className="absolute left-[-20px] top-20 text-[var(--color-accent-green)] animate-pulse"
                style={{
                  animationDelay: '1.5s'
                }}>

                <Sparkles className="w-10 h-10" />
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:h-[600px] w-full">
            <div className="relative h-full w-full rounded-3xl overflow-hidden bg-[var(--color-primary)]">
              {/* Decorative Curves */}
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20"
                viewBox="0 0 400 400"
                preserveAspectRatio="none">

                <path
                  d="M0,100 C150,200 250,0 400,100"
                  stroke="white"
                  strokeWidth="2"
                  fill="none" />

                <path
                  d="M0,200 C150,300 250,100 400,200"
                  stroke="white"
                  strokeWidth="2"
                  fill="none" />

                <path
                  d="M0,300 C150,400 250,200 400,300"
                  stroke="white"
                  strokeWidth="2"
                  fill="none" />

              </svg>

              <img
                src={heroTutorInterface}
                alt="High school student studying SAT prep on laptop with personalized tutor dashboard visible on screen"
                className="w-full h-full object-cover object-center mix-blend-overlay opacity-90"
              />


              <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[var(--color-primary)]/80 to-transparent"></div>

              <img
                src={heroTutorInterface}
                alt="Student with SAT tutor interface showing skill breakdown and practice recommendations"
                className="absolute bottom-0 right-0 w-[90%] h-auto object-contain z-10"
              />

            </div>
          </div>
        </div>
      </div>
    </section>);

}