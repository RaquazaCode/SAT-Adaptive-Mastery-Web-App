import React from 'react';
import { Monitor, User, Lightbulb } from 'lucide-react';
const features = [
{
  icon: Monitor,
  title: 'Adaptive Practice Engine',
  description:
  'Practice questions adapt to your performance, focusing on question types where you make errors. Our system tracks skills at the granular level and adjusts difficulty in real-time.'
},
{
  icon: User,
  title: 'Full-Length Simulations',
  description:
  'Experience the real Digital SAT format with module-based routing, accurate timing, and scoring estimates. Practice under test conditions to build confidence.'
},
{
  icon: Lightbulb,
  title: 'Skill-Level Analytics',
  description:
  'See exactly which skills need work with detailed breakdowns by question type, error patterns, and timing behavior. Get personalized recommendations for focused practice.'
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