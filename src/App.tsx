import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LogoBar } from './components/LogoBar';
import { Features } from './components/Features';
import { PersonalTutor } from './components/PersonalTutor';
import { TutorComparison } from './components/TutorComparison';
import { HowItWorks } from './components/HowItWorks';
import { EmotionalSupport } from './components/EmotionalSupport';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
export function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-[var(--color-text-dark)]">
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
    </div>);

}