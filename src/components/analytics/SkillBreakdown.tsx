import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Skill {
  skill_id: string;
  name: string;
  accuracy: number;
  speed: number;
  difficulty_band: string;
}

interface SkillBreakdownProps {
  skills: Skill[];
}

export function SkillBreakdown({ skills }: SkillBreakdownProps) {
  const getPerformanceColor = (accuracy: number) => {
    if (accuracy >= 0.8) return 'text-green-600 bg-green-50';
    if (accuracy >= 0.6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getPerformanceIcon = (accuracy: number, previousAccuracy?: number) => {
    if (previousAccuracy === undefined) return <Minus className="w-4 h-4" />;
    if (accuracy > previousAccuracy) return <TrendingUp className="w-4 h-4" />;
    if (accuracy < previousAccuracy) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-6">
        Your Skill Mastery Breakdown
      </h2>
      <p className="text-gray-600 mb-8">
        Your tutor tracks your performance on every skill. Here's where you stand:
      </p>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div
            key={skill.skill_id}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${getPerformanceColor(
                    skill.accuracy,
                  )}`}>
                  {getPerformanceIcon(skill.accuracy)}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text-dark)]">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Difficulty: {skill.difficulty_band}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[var(--color-primary)]">
                  {Math.round(skill.accuracy * 100)}%
                </p>
                <p className="text-sm text-gray-500">
                  {Math.round(skill.speed)}s avg
                </p>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  skill.accuracy >= 0.8
                    ? 'bg-green-500'
                    : skill.accuracy >= 0.6
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${skill.accuracy * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Complete a diagnostic or practice drill to see your skill breakdown.</p>
        </div>
      )}
    </div>
  );
}
