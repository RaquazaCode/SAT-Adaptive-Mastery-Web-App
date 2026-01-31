import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DiagnosticFlow } from './pages/DiagnosticFlow';
import { DrillFlow } from './pages/DrillFlow';
import { SimulationFlow } from './pages/SimulationFlow';
import { AnalyticsPage } from './pages/AnalyticsPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/diagnostic" element={<DiagnosticFlow />} />
      <Route path="/practice" element={<DrillFlow />} />
      <Route path="/simulation" element={<SimulationFlow />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
    </Routes>
  );
}