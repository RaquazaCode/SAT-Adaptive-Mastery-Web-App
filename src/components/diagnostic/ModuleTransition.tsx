import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

interface ModuleTransitionProps {
  module1Results: {
    correct: number;
    total: number;
    accuracy: number;
  };
  routingResult: 'M2_H' | 'M2_L';
  onContinue: () => void;
}

export function ModuleTransition({
  module1Results,
  routingResult,
  onContinue,
}: ModuleTransitionProps) {
  const isRoutedToHard = routingResult === 'M2_H';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--color-bg-light)] flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-8">
            Module 1 Complete
          </h1>

          <div className="mb-12">
            <div className="inline-block bg-[var(--color-primary)]/10 rounded-full px-8 py-4 mb-6">
              <p className="text-2xl font-bold text-[var(--color-primary)]">
                {module1Results.correct} / {module1Results.total} Correct
              </p>
              <p className="text-gray-600 mt-2">
                {Math.round(module1Results.accuracy * 100)}% Accuracy
              </p>
            </div>
          </div>

          <div
            className={`rounded-2xl p-8 mb-8 ${
              isRoutedToHard
                ? 'bg-green-50 border-2 border-green-200'
                : 'bg-yellow-50 border-2 border-yellow-200'
            }`}>
            <div className="flex items-center justify-center gap-4 mb-4">
              {isRoutedToHard ? (
                <TrendingUp className="w-12 h-12 text-green-600" />
              ) : (
                <TrendingDown className="w-12 h-12 text-yellow-600" />
              )}
              <h2 className="text-3xl font-bold text-[var(--color-text-dark)]">
                Your Tutor Routed You to Module 2{' '}
                {isRoutedToHard ? 'Hard' : 'Standard'}
              </h2>
            </div>

            <p className="text-lg text-gray-700 mb-6">
              {isRoutedToHard
                ? 'Your tutor noticed strong performance in Module 1. Module 2 will challenge you with higher difficulty questions. This is good—it means you are on track for a high score!'
                : "Your tutor noticed some areas for improvement. Module 2 will focus on building your foundational skills. Don't worry—your tutor will help you improve."}
            </p>

            <div className="bg-white rounded-xl p-6 text-left">
              <h3 className="font-bold text-lg mb-4">What This Means:</h3>
              <ul className="space-y-2 text-gray-700">
                {isRoutedToHard ? (
                  <>
                    <li>• Module 2 contains higher difficulty questions (D3-D5)</li>
                    <li>• You're on track for a score above 600</li>
                    <li>• Keep up the accuracy—your tutor is watching</li>
                  </>
                ) : (
                  <>
                    <li>• Module 2 focuses on foundational skills (D1-D3)</li>
                    <li>• Your tutor will help you build confidence</li>
                    <li>• Focus on accuracy over speed</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <button
            onClick={onContinue}
            className="w-full bg-[var(--color-primary)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#2d4434] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3">
            Continue to Module 2
            <ArrowRight className="w-6 h-6" />
          </button>

          <p className="text-sm text-gray-500 mt-6">
            Your tutor will continue tracking your performance
          </p>
        </div>
      </div>
    </div>
  );
}
