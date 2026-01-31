import React from 'react';
import { Monitor, User, Lightbulb } from 'lucide-react';
const features = [
{
  icon: Monitor,
  title: 'Your Tutor Learns Your Patterns',
  description:
  'Every mistake teaches your tutor something new. Your tutor tracks your errors at the question-type level, identifies your specific traps, and focuses practice exactly where you need it most.'
},
{
  icon: User,
  title: 'Practice Tests with Your Tutor',
  description:
  'Take full-length Digital SAT simulations while your tutor watches. After each test, your tutor explains your routing results, shows where you improved, and creates your next practice plan.'
},
{
  icon: Lightbulb,
  title: 'Your Tutor Knows Your Weaknesses',
  description:
  'Your tutor builds a complete picture of your skills over time. See exactly which question types trip you up, how your timing affects performance, and get personalized recommendations that evolve as you improve.'
}];

export function Features() {
  return (
    <section className="py-20 bg-[var(--color-bg-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) =>
          <div key={index} className="flex flex-col items-start">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <feature.icon className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-text-dark)] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}