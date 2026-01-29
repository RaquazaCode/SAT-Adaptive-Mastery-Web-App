import React from 'react';
import { Play } from 'lucide-react';
export function Workshops() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-4">
            Join our free workshops.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience our teaching style before you commit. Our free workshops
            cover key SAT strategies and problem-solving techniques.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden bg-[var(--color-primary)] aspect-video md:aspect-[21/9] shadow-2xl group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            alt="Students studying together"
            className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-[var(--color-accent-green)] rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
              <Play className="w-8 h-8 text-[var(--color-primary)] fill-current ml-1" />
            </div>
          </div>

          {/* Stats Overlay */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white">
              <div className="text-2xl font-bold">20,000+</div>
              <div className="text-sm opacity-80">Happy Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white">
              <div className="text-2xl font-bold">94%</div>
              <div className="text-sm opacity-80">Score Improvement</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white">
              <div className="text-2xl font-bold">15+</div>
              <div className="text-sm opacity-80">Expert Tutors</div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}