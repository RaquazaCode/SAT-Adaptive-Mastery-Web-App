import React from 'react';
import { Monitor, User, Lightbulb } from 'lucide-react';
const features = [
{
  icon: Monitor,
  title: 'Learn from anywhere',
  description:
  'Learning from anywhere has become a transformative aspect of modern education, allowing individuals to access high-quality resources.'
},
{
  icon: User,
  title: 'Expert Mentors',
  description:
  'Expert mentors are invaluable assets in any field, providing seasoned guidance, knowledge, and support to help you navigate your path.'
},
{
  icon: Lightbulb,
  title: 'Learn in demand skills',
  description:
  "In today's rapidly evolving job market, learning in-demand skills is crucial for career advancement and staying competitive."
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