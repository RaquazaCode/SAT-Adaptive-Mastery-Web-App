import React from 'react';
import { Header } from '../components/Header';
import { HowItWorks } from '../components/HowItWorks';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { PageMeta } from '../components/PageMeta';

export function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--color-text-dark)]">
      <PageMeta
        title="How It Works | SAT Mastery"
        description="See how our adaptive learning engine assesses your skills, creates a custom plan, and guides your daily practice."
      />
      <Header />
      <main>
        <div className="pt-20 pb-10 text-center bg-white">
          <h1 className="text-5xl font-serif font-bold text-[var(--color-primary)] mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Your journey to a higher score, step by step.
          </p>
        </div>
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
