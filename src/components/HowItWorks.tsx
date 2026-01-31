import React from 'react';
import howTutorWorks from '../assets/how-tutor-works.svg';

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-12">
              How Your Personal Tutor Works
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-xl group-hover:bg-[var(--color-accent-green)] group-hover:text-[var(--color-primary)] transition-colors">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                    Your Tutor Assesses You
                  </h3>
                  <p className="text-gray-600">
                    Start with a free diagnostic test. Your tutor watches how you perform, identifies your current score, and maps out exactly which skills need work. No judgment, just understanding.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center font-bold text-xl group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                    Your Tutor Creates Your Plan
                  </h3>
                  <p className="text-gray-600">
                    Based on your diagnostic, your tutor builds a personalized practice plan. Every drill targets your specific weaknesses. Your tutor adjusts the plan as you improve.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center font-bold text-xl group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                    Your Tutor Guides Your Practice
                  </h3>
                  <p className="text-gray-600">
                    Practice whenever you have time. Your tutor provides instant feedback after every question, explains mistakes, and celebrates wins. With each session, your tutor learns more about you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={howTutorWorks}
                alt="Three-panel illustration: tutor assessing student with diagnostic, creating personalized plan, and guiding practice with instant feedback"
                className="w-full h-full object-cover"
              />

            </div>
          </div>
        </div>
      </div>
    </section>);

}