import React from 'react';
export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-12">
              Learn in 3 simple steps on Edufy.
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
                    Start with a full-length practice test to identify your
                    strengths and areas for improvement.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center font-bold text-xl group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                    Get Personalized Plan
                  </h3>
                  <p className="text-gray-600">
                    Receive a custom study schedule tailored to your target
                    score and available study time.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center font-bold text-xl group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                    Practice & Improve
                  </h3>
                  <p className="text-gray-600">
                    Follow your plan, watch video lessons, and take practice
                    quizzes to boost your score.
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