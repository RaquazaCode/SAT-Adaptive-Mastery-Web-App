import React from 'react';
import { Trophy, TrendingUp, Target, ArrowRight } from 'lucide-react';

interface FinalScoreProps {
  totalScore: number;
  rwScore?: number;
  mathScore?: number;
  scoreCI90: [number, number];
  previousScore?: number;
  onReviewMistakes: () => void;
  onStartNewPractice: () => void;
}

export function FinalScore({
  totalScore,
  rwScore,
  mathScore,
  scoreCI90,
  previousScore,
  onReviewMistakes,
  onStartNewPractice,
}: FinalScoreProps) {
  const improvement = previousScore ? totalScore - previousScore : 0;
  const getScoreColor = (score: number) => {
    if (score >= 1400) return 'text-green-600';
    if (score >= 1200) return 'text-blue-600';
    if (score >= 1000) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--color-bg-light)] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Score Display */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 text-center">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-4">
            Simulation Complete!
          </h1>

          <div className="mb-8">
            <p className="text-2xl text-gray-600 mb-2">Your Total Score</p>
            <p className={`text-7xl font-bold ${getScoreColor(totalScore)}`}>
              {totalScore}
            </p>
            <p className="text-gray-500 mt-2">
              Confidence interval: {scoreCI90[0]} - {scoreCI90[1]}
            </p>
          </div>

          {previousScore && (
            <div className="inline-block bg-[var(--color-accent-green)]/20 rounded-full px-6 py-3 mb-6">
              <div className="flex items-center gap-2 justify-center">
                <TrendingUp className="w-5 h-5 text-[var(--color-accent-green)]" />
                <span className="font-bold text-[var(--color-accent-green)]">
                  {improvement > 0 ? '+' : ''}
                  {improvement} points
                </span>
                <span className="text-gray-600">from last attempt</span>
              </div>
            </div>
          )}

          {(rwScore || mathScore) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {rwScore && (
                <div className="bg-[var(--color-bg-light)] rounded-2xl p-6">
                  <p className="text-gray-600 mb-2">Reading & Writing</p>
                  <p className="text-4xl font-bold text-[var(--color-primary)]">
                    {rwScore}
                  </p>
                </div>
              )}
              {mathScore && (
                <div className="bg-[var(--color-bg-light)] rounded-2xl p-6">
                  <p className="text-gray-600 mb-2">Math</p>
                  <p className="text-4xl font-bold text-[var(--color-primary)]">
                    {mathScore}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Percentile Estimate */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Target className="w-8 h-8 text-[var(--color-primary)]" />
            <h2 className="text-2xl font-bold text-[var(--color-text-dark)]">
              Your Score in Context
            </h2>
          </div>
          <p className="text-gray-700">
            Based on your performance, your tutor estimates you are scoring in the{' '}
            {totalScore >= 1400
              ? 'top 5%'
              : totalScore >= 1200
                ? 'top 25%'
                : totalScore >= 1000
                  ? 'top 50%'
                  : 'top 75%'}{' '}
            of test-takers. Your tutor will help you improve further.
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={onReviewMistakes}
            className="bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-6 rounded-2xl font-bold text-lg hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-lg">
            <div className="flex items-center justify-center gap-3">
              <Target className="w-6 h-6" />
              Review Mistakes with Your Tutor
            </div>
          </button>
          <button
            onClick={onStartNewPractice}
            className="bg-[var(--color-primary)] text-white px-8 py-6 rounded-2xl font-bold text-lg hover:bg-[#2d4434] transition-all shadow-lg">
            <div className="flex items-center justify-center gap-3">
              Start New Practice
              <ArrowRight className="w-6 h-6" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
