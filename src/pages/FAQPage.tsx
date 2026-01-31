import React from 'react';
import { Header } from '../components/Header';
import { FAQ } from '../components/FAQ';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { PageMeta } from '../components/PageMeta';

export function FAQPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--color-text-dark)]">
      <PageMeta
        title="FAQ | SAT Mastery"
        description="Frequently asked questions about our adaptive SAT tutor, pricing, and methodology."
      />
      <Header />
      <main>
        <div className="pt-20 pb-10 text-center bg-white">
          <h1 className="text-5xl font-serif font-bold text-[var(--color-primary)] mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Got questions? We've got answers.
          </p>
        </div>
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
