import React from 'react';
import { Clock, Brain, Heart, TrendingUp } from 'lucide-react';
import TutorCardStack from './TutorCardStack';

const tutorFeatures = [
  {
    icon: Brain,
    title: 'Learns from Every Mistake',
    description:
      'Your tutor remembers every error you make. Over time, your tutor builds a complete picture of your patterns—which traps you fall into, which question types trip you up, and how your timing affects your performance.',
  },
  {
    icon: Clock,
    title: 'Adapts to Your Schedule',
    description:
      'Practice at 6am before school or 11pm after homework. Your tutor is always available, never needs to reschedule, and picks up exactly where you left off.',
  },
  {
    icon: Heart,
    title: 'Provides Instant Feedback',
    description:
      'Get immediate explanations after every question. Your tutor does not just tell you if you are right or wrong—your tutor explains why and what it means for your progress.',
  },
  {
    icon: TrendingUp,
    title: 'Tracks Your Progress Personally',
      description:
        'Watch your tutor celebrate your improvements. See which skills you have mastered, how your score is trending, and get personalized recommendations that evolve as you get better.',
  },
];

export function PersonalTutor() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[var(--color-bg-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-6">
            Meet Your Personal SAT Tutor
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your tutor never sleeps, never judges, and gets smarter about you every day. 
            Experience the proven power of 1-on-1 tutoring, available whenever you need it.
          </p>
        </div>

        <div className="mb-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative">
          {/* Card stack: centered over green pulse */}
          <div className="relative group cursor-pointer flex-shrink-0 flex justify-center w-full md:w-auto">
            <div className="absolute inset-0 bg-[var(--color-accent-green)] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" aria-hidden />
            <div className="relative transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1 flex justify-center">
              <TutorCardStack className="rounded-2xl shadow-2xl border-4 border-white" />
            </div>
          </div>

          {/* Owl + chat bubble: separate column so always visible */}
          <div className="flex flex-col items-center md:items-start gap-4 flex-shrink-0">
            {/* Owl Mascot */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full shadow-xl flex items-center justify-center animate-bounce-gentle border-4 border-[var(--color-accent-yellow)]">
              <span className="text-4xl sm:text-6xl" role="img" aria-label="Owl Mascot">🦉</span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                Your Tutor!
              </div>
            </div>

            {/* Interactive Chat Bubble */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl max-w-[200px] sm:max-w-xs transform -rotate-2 transition-transform duration-300 border border-[var(--color-primary)]/10">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <div className="w-2 h-2 rounded-full animate-pulse bg-[var(--color-primary)]" />
                <span className="text-xs font-bold text-[var(--color-text-gray)] uppercase tracking-wide">Live Feedback</span>
              </div>
              <p className="text-[var(--color-primary)] font-bold text-sm sm:text-lg">
                &ldquo;Great job! You mastered Linear Equations.&rdquo;
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {tutorFeatures.map((feature, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[var(--color-primary)] rounded-3xl p-12 md:p-16 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The Bloom Two-Sigma Effect: Proven Science, Now Accessible
          </h3>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            Research shows 1-on-1 tutoring improves outcomes by two standard deviations—the single most effective teaching method. 
            But it was too expensive at scale. Until now. Your personal tutor brings that same power, 
            available 24/7 at a fraction of the cost of human tutors.
          </p>
          <button className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-lg">
            Start with Your Tutor
          </button>
        </div>
      </div>
    </section>
  );
}
