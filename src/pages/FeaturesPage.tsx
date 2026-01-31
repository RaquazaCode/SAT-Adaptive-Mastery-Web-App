import React from 'react';
import { Header } from '../components/Header';
import { Features } from '../components/Features';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { PageMeta } from '../components/PageMeta';

export function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--color-text-dark)]">
      <PageMeta
        title="Features | SAT Mastery"
        description="Discover how our adaptive AI tutor learns your patterns, identifies weaknesses, and provides personalized SAT prep."
      />
      <Header />
      <main>
        <div className="pt-20 pb-10 text-center bg-[var(--color-bg-light)]">
          <h1 className="text-5xl font-serif font-bold text-[var(--color-primary)] mb-6">
            Features
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Everything you need to master the SAT, powered by your personal AI tutor.
          </p>
        </div>
        <Features />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
