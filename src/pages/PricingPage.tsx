import React from 'react';
import { Header } from '../components/Header';
import { PopularCourses } from '../components/PopularCourses';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { PageMeta } from '../components/PageMeta';

export function PricingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--color-text-dark)]">
      <PageMeta
        title="Pricing | SAT Mastery"
        description="Affordable SAT prep options. Choose the plan that fits your goals and budget."
      />
      <Header />
      <main>
        <div className="pt-20 pb-10 text-center bg-[var(--color-bg-light)]">
          <h1 className="text-5xl font-serif font-bold text-[var(--color-primary)] mb-6">
            Pricing & Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Invest in your future with flexible, high-impact prep options.
          </p>
        </div>
        <PopularCourses />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
