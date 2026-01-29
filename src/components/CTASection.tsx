import React from 'react';
export function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--color-primary)] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Are you ready to start your course?
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Join thousands of students who have already improved their SAT
              scores. Start your journey to your dream college today.
            </p>
            <button className="bg-[var(--color-accent-green)] text-[var(--color-primary)] px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors transform hover:scale-105 shadow-lg">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>);

}