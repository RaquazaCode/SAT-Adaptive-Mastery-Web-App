import React from 'react';
import { Check, X } from 'lucide-react';

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

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-6 font-bold text-[var(--color-text-dark)]">
                  Feature
                </th>
                <th className="text-center py-4 px-6 font-bold text-gray-600">
                  Generic Prep Courses
                </th>
                <th className="text-center py-4 px-6 font-bold text-gray-600">
                  Human Tutors
                </th>
                <th className="text-center py-4 px-6 font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10">
                  Your Personal Tutor
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 ${
                    index % 2 === 0 ? 'bg-gray-50/50' : ''
                  }`}>
                  <td className="py-4 px-6 font-semibold text-[var(--color-text-dark)]">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600">
                    {row.generic}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600">
                    {row.human}
                  </td>
                  <td className="py-4 px-6 text-center font-semibold text-[var(--color-primary)] bg-[var(--color-primary)]/5">
                    {row.personalTutor}
                  </td>
                </tr>
              ))}
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
