import React from 'react';
import { Clock, Brain, Heart, TrendingUp } from 'lucide-react';

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
