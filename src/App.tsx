import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PricingPage } from './pages/PricingPage';
import { FAQPage } from './pages/FAQPage';
import { DiagnosticFlow } from './pages/DiagnosticFlow';
import { DrillFlow } from './pages/DrillFlow';
import { SimulationFlow } from './pages/SimulationFlow';
import { AnalyticsPage } from './pages/AnalyticsPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/diagnostic" element={<DiagnosticFlow />} />
      <Route path="/practice" element={<DrillFlow />} />
      <Route path="/simulation" element={<SimulationFlow />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
    </Routes>
  );
}