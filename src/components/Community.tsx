import React from 'react';
import { CheckCircle2 } from 'lucide-react';
export function Community() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Community of learners"
                className="w-full h-full object-cover" />

            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[var(--color-accent-yellow)] rounded-full z-[-1]"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[var(--color-accent-green)] rounded-full z-[-1] opacity-50"></div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-6">
              Creating a community of learners.
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Join a vibrant community where students support each other. Our
              platform fosters collaboration, discussion, and peer-to-peer
              learning.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-[var(--color-bg-light)] p-2 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                    24/7 Study Groups
                  </h4>
                  <p className="text-gray-600">
                    Connect with peers anytime to solve problems and discuss
                    strategies.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-[var(--color-bg-light)] p-2 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                    Expert Moderation
                  </h4>
                  <p className="text-gray-600">
                    Our tutors monitor discussions to ensure accuracy and
                    provide guidance.
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-10 bg-[var(--color-primary)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#2d4434] transition-colors">
              Join Community
            </button>
          </div>
        </div>
      </div>
    </section>);

}