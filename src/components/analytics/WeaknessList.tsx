import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface Weakness {
  skill_id: string;
  name: string;
  weakness_score: number;
  accuracy: number;
}

interface WeaknessListProps {
  weaknesses: Weakness[];
  onStartDrill: (skillId: string) => void;
}

export function WeaknessList({ weaknesses, onStartDrill }: WeaknessListProps) {
  const topWeaknesses = weaknesses
    .sort((a, b) => b.weakness_score - a.weakness_score)
    .slice(0, 10);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <AlertCircle className="w-6 h-6 text-red-500" />
        <h2 className="text-2xl font-bold text-[var(--color-text-dark)]">
          Skills Your Tutor Recommends Focusing On
        </h2>
      </div>
      <p className="text-gray-600 mb-8">
        Your tutor identified these skills as your biggest opportunities for improvement. 
        Focused practice here will have the biggest impact on your score.
      </p>

      <div className="space-y-4">
        {topWeaknesses.map((weakness, index) => (
          <div
            key={weakness.skill_id}
            className="border-2 border-red-100 rounded-xl p-4 hover:border-red-300 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-red-600">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text-dark)]">
                    {weakness.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {Math.round(weakness.accuracy * 100)}% accuracy • High priority
                  </p>
                </div>
              </div>
              <button
                onClick={() => onStartDrill(weakness.skill_id)}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-full font-semibold hover:bg-[#2d4434] transition-all text-sm">
                Practice
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {topWeaknesses.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Complete some practice to see your weaknesses.</p>
        </div>
      )}
    </div>
  );
}
