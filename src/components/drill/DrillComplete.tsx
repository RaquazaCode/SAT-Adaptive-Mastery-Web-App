import React from 'react';
import { CheckCircle, Target, ArrowRight, BarChart3 } from 'lucide-react';

interface DrillCompleteProps {
  correct: number;
  total: number;
  skillsPracticed: string[];
  onStartAnother: () => void;
  onViewAnalytics: () => void;
}

export function DrillComplete({
  correct,
  total,
  skillsPracticed,
  onStartAnother,
  onViewAnalytics,
}: DrillCompleteProps) {
  const accuracy = (correct / total) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--color-bg-light)] flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-4">
            Drill Complete!
          </h1>

          <div className="mb-12">
            <div className="inline-block bg-[var(--color-primary)]/10 rounded-full px-8 py-4 mb-6">
              <p className="text-3xl font-bold text-[var(--color-primary)] mb-2">
                {correct} / {total} Correct
              </p>
              <p className="text-xl text-gray-600">
                {Math.round(accuracy)}% Accuracy
              </p>
            </div>
          </div>

          {skillsPracticed.length > 0 && (
            <div className="bg-[var(--color-bg-light)] rounded-2xl p-6 mb-8 text-left">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-[var(--color-primary)]" />
                <h2 className="text-xl font-bold text-[var(--color-text-dark)]">
                  Skills You Practiced
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsPracticed.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-[var(--color-primary)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent-green)]/10 rounded-2xl p-6 mb-8">
            <p className="text-lg text-gray-700">
              Your tutor has updated your skill mastery based on this practice session. 
              {accuracy >= 70
                ? " You're improving! Your tutor will challenge you with harder questions next."
                : " Your tutor noticed some areas to focus on. More practice on these skills is recommended."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onStartAnother}
              className="flex-1 bg-[var(--color-primary)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#2d4434] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3">
              Start Another Drill
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onViewAnalytics}
              className="flex-1 border-2 border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--color-primary)] hover:text-white transition-all flex items-center justify-center gap-3">
              View Analytics
              <BarChart3 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
