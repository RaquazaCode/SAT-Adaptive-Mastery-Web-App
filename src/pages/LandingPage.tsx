import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { LogoBar } from '../components/LogoBar';
import { Features } from '../components/Features';
import { PersonalTutor } from '../components/PersonalTutor';
import { TutorComparison } from '../components/TutorComparison';
import { HowItWorks } from '../components/HowItWorks';
import { EmotionalSupport } from '../components/EmotionalSupport';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--color-text-dark)]">
      <PageMeta
        title="SAT Mastery | Adaptive Digital SAT Prep with a Personal Tutor"
        description="Adaptive SAT practice that learns your weak spots. Take a free diagnostic, get a personalized plan, and improve your Digital SAT score with 24/7 tutor-style feedback."
      />
      <Header />
      <main>
        <Hero />
        <LogoBar />
        <Features />
        <PersonalTutor />
        <HowItWorks />
        <TutorComparison />
        <EmotionalSupport />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
