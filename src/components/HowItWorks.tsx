import React from 'react';
export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-12">
              Master the SAT in 3 simple steps.
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-xl group-hover:bg-[var(--color-accent-green)] group-hover:text-[var(--color-primary)] transition-colors">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                    Take Diagnostic Test
                  </h3>
                  <p className="text-gray-600">
                    Start with a full-length Digital SAT simulation to identify your current score, strengths, and skill gaps across Reading & Writing and Math.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center font-bold text-xl group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                    Get Adaptive Practice Plan
                  </h3>
                  <p className="text-gray-600">
                    Our system analyzes your errors and timing to generate focused drills targeting your weakest question types and skills.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center font-bold text-xl group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                    Practice & Track Progress
                  </h3>
                  <p className="text-gray-600">
                    Complete adaptive drills and full simulations. Watch your skill mastery improve with real-time analytics showing which question types you've mastered.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Student learning on laptop"
                className="w-full h-full object-cover" />

            </div>
          </div>
        </div>
      </div>
    </section>);

}