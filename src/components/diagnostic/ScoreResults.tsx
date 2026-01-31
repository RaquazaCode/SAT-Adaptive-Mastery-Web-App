import React from 'react';
import { Trophy, Target, TrendingUp, ArrowRight } from 'lucide-react';

interface ScoreResultsProps {
  rwScore?: number;
  mathScore?: number;
  totalScore: number;
  weaknesses: Array<{ skill_id: string; name: string; accuracy: number }>;
  onStartPractice: () => void;
}

export function ScoreResults({
  rwScore,
  mathScore,
  totalScore,
  weaknesses,
  onStartPractice,
}: ScoreResultsProps) {
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
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-text-dark)] mb-4">
            Your Score and What to Do Next
          </h1>
          <div className="mb-8">
            <p className="text-2xl text-gray-600 mb-2">Total Score</p>
            <p className={`text-7xl font-bold ${getScoreColor(totalScore)}`}>
              {totalScore}
            </p>
            <p className="text-gray-500 mt-2">out of 1600</p>
          </div>

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

        {/* Skill Breakdown */}
        {weaknesses.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
            <div className="flex items-center gap-4 mb-8">
              <Target className="w-8 h-8 text-[var(--color-primary)]" />
              <h2 className="text-3xl font-bold text-[var(--color-text-dark)]">
                Your Tutor Identified These Focus Areas
              </h2>
            </div>

            <div className="space-y-4">
              {weaknesses.slice(0, 5).map((weakness, index) => (
                <div
                  key={weakness.skill_id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-gray-400">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-[var(--color-text-dark)]">
                        {weakness.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {Math.round(weakness.accuracy * 100)}% accuracy
                      </p>
                    </div>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-[var(--color-primary)] h-3 rounded-full"
                      style={{ width: `${weakness.accuracy * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-green)] rounded-3xl p-8 md:p-12 text-white text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Improving?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Your tutor has created a personalized practice plan targeting your weakest skills.
          </p>
          <button
            onClick={onStartPractice}
            className="bg-white text-[var(--color-primary)] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto">
            Start Targeted Practice
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
