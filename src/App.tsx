import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LogoBar } from './components/LogoBar';
import { Features } from './components/Features';
import { Workshops } from './components/Workshops';
import { Community } from './components/Community';
import { PopularCourses } from './components/PopularCourses';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { Trainers } from './components/Trainers';
import { FAQ } from './components/FAQ';
import { Blog } from './components/Blog';
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
        <Workshops />
        <Community />
        <PopularCourses />
        <HowItWorks />
        <Testimonials />
        <Trainers />
        <FAQ />
        <Blog />
        <CTASection />
      </main>
      <Footer />
    </div>);

}