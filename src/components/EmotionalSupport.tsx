import React from 'react';
import { Smile, Target, Zap, Award } from 'lucide-react';

const supportFeatures = [
  {
    icon: Smile,
    title: 'Never Judges',
      description:
        'Your tutor celebrates every improvement, no matter how small. Make a mistake? Your tutor explains it calmly and helps you learn from it. There is no shame, only progress.',
  },
  {
    icon: Target,
    title: 'Identifies Patterns',
    description:
      'Your tutor notices when you consistently struggle with certain question types or traps. Instead of generic advice, your tutor gives you specific, actionable feedback.',
  },
  {
    icon: Zap,
    title: 'Provides Encouragement',
      description:
        'Every win gets recognized. Your tutor tracks your streaks, highlights improvements, and reminds you how far you have come when you are feeling discouraged.',
  },
  {
    icon: Award,
    title: 'Celebrates Wins',
    description:
      'Mastered a skill? Your tutor celebrates with you. Improved your score? Your tutor shows you exactly what changed. Every achievement matters.',
  },
];

const encouragementMessages = [
  'You have improved on inference questions—your tutor noticed!',
  '10 days of practice in a row. Your tutor is proud.',
  'You are getting faster on math questions. Keep it up!',
  'Your tutor identified 3 new skills to focus on.',
];

export function EmotionalSupport() {
  return (
    <section className="py-20 bg-[var(--color-bg-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-6">
            Every Student Needs Support. Your Tutor Provides It.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SAT prep isn't just about content—it's about confidence, encouragement, and having someone who believes in your progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {supportFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-[var(--color-accent-green)]/20 rounded-2xl flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-[var(--color-accent-green)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-green)] rounded-3xl p-12 md:p-16 text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            What Your Tutor Says to You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {encouragementMessages.map((message, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <p className="text-lg font-medium">{message}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-xl mb-6 opacity-90">
              Your tutor is always in your corner, providing the support you need to succeed.
            </p>
            <button className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-lg">
              Experience the Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
