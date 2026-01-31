import React, { useState } from 'react';
import { BookOpen, Calculator } from 'lucide-react';

interface DiagnosticStartProps {
  onStart?: (section: 'RW' | 'Math') => void;
}

export function DiagnosticStart({ onStart }: DiagnosticStartProps) {
  const [selectedSection, setSelectedSection] = useState<'RW' | 'Math' | null>(
    null,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--color-bg-light)] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-6">
              Know Exactly Where You Stand—In Under an Hour
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a free diagnostic and get a clear picture of your score and weak spots. 
              Your tutor uses your results to build a practice plan that targets what you need most. 
              No judgment, just a roadmap.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-6 text-center">
              Choose a Section to Start
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setSelectedSection('RW')}
                className={`p-8 rounded-2xl border-2 transition-all ${
                  selectedSection === 'RW'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                    : 'border-gray-200 hover:border-[var(--color-primary)]/50'
                }`}>
                <BookOpen className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                  Reading & Writing
                </h3>
                <p className="text-gray-600">
                  54 questions • 64 minutes • 2 modules
                </p>
              </button>

              <button
                onClick={() => setSelectedSection('Math')}
                className={`p-8 rounded-2xl border-2 transition-all ${
                  selectedSection === 'Math'
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                    : 'border-gray-200 hover:border-[var(--color-primary)]/50'
                }`}>
                <Calculator className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                  Math
                </h3>
                <p className="text-gray-600">
                  44 questions • 70 minutes • 2 modules
                </p>
              </button>
            </div>
          </div>

          {selectedSection && (
            <div className="text-center">
              <button
                onClick={() => onStart?.(selectedSection)}
                className="bg-[var(--color-primary)] text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-[#2d4434] transition-all transform hover:scale-105 shadow-lg">
                Start My Diagnostic
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Timed like the real SAT—your tutor tracks every answer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
