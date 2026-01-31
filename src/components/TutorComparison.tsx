import React from 'react';
import { Check, Star } from 'lucide-react';

const comparisonData = [
  {
    feature: 'Availability',
    generic: 'Fixed schedule, limited hours',
    human: 'Scheduled sessions, $100-200/hour',
    personalTutor: '24/7, practice whenever you want',
  },
  {
    feature: 'Personalization',
    generic: 'Same content for everyone',
    human: 'Adapts to you, but expensive',
    personalTutor: 'Learns your patterns, adapts automatically',
  },
  {
    feature: 'Cost',
    generic: '$20-50/month',
    human: '$500-2000/month',
    personalTutor: '$20-50/month',
  },
  {
    feature: 'Feedback Speed',
    generic: 'Delayed, generic explanations',
    human: 'Real-time, but only during sessions',
    personalTutor: 'Instant feedback after every question',
  },
  {
    feature: 'Emotional Support',
    generic: 'None',
    human: 'Encouraging, but limited availability',
    personalTutor: 'Always encouraging, never judges',
  },
  {
    feature: 'Progress Tracking',
    generic: 'Basic score tracking',
    human: 'Notes, but not systematic',
    personalTutor: 'Detailed skill-level analytics, evolves with you',
  },
];

export function TutorComparison() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-6">
            Why Your Personal Tutor Beats the Alternatives
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the best of both worlds: the personalization of human tutoring with the availability and affordability of digital tools.
          </p>
        </div>

        <div className="overflow-x-auto pt-10">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="text-left py-6 px-6 font-bold text-[var(--color-text-dark)] text-lg border-b-2 border-gray-100">
                  Feature
                </th>
                <th className="text-center py-6 px-6 font-bold text-gray-500 text-lg border-b-2 border-gray-100 opacity-70">
                  Generic Prep Courses
                </th>
                <th className="text-center py-6 px-6 font-bold text-gray-500 text-lg border-b-2 border-gray-100 opacity-70">
                  Human Tutors
                </th>
                <th className="relative text-center py-8 px-6 font-bold text-[var(--color-primary)] text-xl bg-[var(--color-primary)]/10 rounded-t-2xl border-t-2 border-x-2 border-[var(--color-primary)]/20 shadow-[0_-4px_24px_rgba(61,90,69,0.08)]">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-6 flex items-center gap-1.5 bg-[var(--color-accent-yellow)] text-[var(--color-primary)] text-sm font-bold px-4 py-2 rounded-full shadow-md border border-[var(--color-primary)]/20 whitespace-nowrap">
                    <Star className="w-4 h-4 fill-current" aria-hidden />
                    BEST VALUE
                  </div>
                  Your Personal Tutor
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={index}
                  className="group transition-colors hover:bg-gray-50/50">
                  <td className="py-6 px-6 font-bold text-[var(--color-text-dark)] border-b border-gray-100 group-hover:text-[var(--color-primary)] transition-colors">
                    {row.feature}
                  </td>
                  <td className="py-6 px-6 text-center text-gray-500 border-b border-gray-100">
                    {row.generic}
                  </td>
                  <td className="py-6 px-6 text-center text-gray-500 border-b border-gray-100">
                    {row.human}
                  </td>
                  <td className="py-6 px-6 text-center font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/5 border-x-2 border-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)]/10 transition-colors relative">
                    {index === comparisonData.length - 1 && (
                       <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-[var(--color-primary)]/10 to-transparent"></div>
                    )}
                    {row.personalTutor}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Check className="w-5 h-5 text-[var(--color-accent-green)]" />
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="h-4 bg-[var(--color-primary)]/5 rounded-b-2xl border-b-2 border-x-2 border-[var(--color-primary)]/10"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Your personal tutor combines the proven effectiveness of 1-on-1 tutoring with the convenience and affordability you need.
          </p>
          <button className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#2d4434] transition-all transform hover:scale-105 shadow-lg">
            Try Your Tutor Free
          </button>
        </div>
      </div>
    </section>
  );
}
