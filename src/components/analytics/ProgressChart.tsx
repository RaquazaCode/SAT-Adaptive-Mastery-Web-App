import React from 'react';
import { TrendingUp, Calendar, Clock } from 'lucide-react';

interface ScoreData {
  date: string;
  score: number;
  section?: 'RW' | 'Math';
}

interface ProgressChartProps {
  scores: ScoreData[];
  practiceDays: number;
  totalTimeSpent: number; // in minutes
}

export function ProgressChart({
  scores,
  practiceDays,
  totalTimeSpent,
}: ProgressChartProps) {
  const latestScore = scores.length > 0 ? scores[scores.length - 1].score : 0;
  const firstScore = scores.length > 0 ? scores[0].score : 0;
  const improvement = latestScore - firstScore;

  // Simple bar chart visualization
  const maxScore = Math.max(...scores.map((s) => s.score), 1600);
  const minScore = Math.min(...scores.map((s) => s.score), 400);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-6">
        Your Progress Over Time
      </h2>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--color-primary)]/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="text-sm text-gray-600">Score Improvement</span>
          </div>
          <p className="text-3xl font-bold text-[var(--color-primary)]">
            {improvement > 0 ? '+' : ''}
            {improvement}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {firstScore} → {latestScore}
          </p>
        </div>

        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">Practice Days</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{practiceDays}</p>
          <p className="text-sm text-gray-600 mt-1">days of practice</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">Time Spent</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {Math.round(totalTimeSpent / 60)}
          </p>
          <p className="text-sm text-gray-600 mt-1">hours total</p>
        </div>
      </div>

      {/* Simple Line Chart */}
      {scores.length > 0 && (
        <div className="bg-[var(--color-bg-light)] rounded-xl p-6">
          <div className="relative h-64">
            {scores.map((dataPoint, index) => {
              const x = (index / (scores.length - 1 || 1)) * 100;
              const y =
                100 -
                ((dataPoint.score - minScore) / (maxScore - minScore || 1)) *
                  100;
              return (
                <div key={index}>
                  <div
                    className="absolute w-4 h-4 bg-[var(--color-primary)] rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  />
                  {index > 0 && (
                    <svg
                      className="absolute top-0 left-0 w-full h-full"
                      style={{ zIndex: 0 }}>
                      <line
                        x1={`${((index - 1) / (scores.length - 1 || 1)) * 100}%`}
                        y1={`${
                          100 -
                          ((scores[index - 1].score - minScore) /
                            (maxScore - minScore || 1)) *
                            100
                        }%`}
                        x2={`${x}%`}
                        y2={`${y}%`}
                        stroke="var(--color-primary)"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
              <span>{scores[0]?.date || ''}</span>
              <span>{scores[scores.length - 1]?.date || ''}</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Your tutor is tracking your progress. Keep practicing to see your score improve!
            </p>
          </div>
        </div>
      )}

      {scores.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Complete a diagnostic or simulation to see your progress chart.</p>
        </div>
      )}
    </div>
  );
}
