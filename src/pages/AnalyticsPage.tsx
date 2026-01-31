import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { Header } from '../components/Header';
import { SkillBreakdown } from '../components/analytics/SkillBreakdown';
import { ProgressChart } from '../components/analytics/ProgressChart';
import { WeaknessList } from '../components/analytics/WeaknessList';

const stubSkills = [
  { skill_id: 'RW_SKILL_INFERENCE', name: 'Inference', accuracy: 0.72, speed: 65, difficulty_band: 'D2' },
  { skill_id: 'RW_SKILL_CENTRAL_IDEA', name: 'Central Idea', accuracy: 0.68, speed: 70, difficulty_band: 'D2' },
  { skill_id: 'RW_SKILL_WORDS_CONTEXT', name: 'Words in Context', accuracy: 0.85, speed: 55, difficulty_band: 'D3' },
  { skill_id: 'M_SKILL_LINEAR', name: 'Linear Equations', accuracy: 0.78, speed: 80, difficulty_band: 'D2' },
];

const stubScores = [
  { date: '2025-01-01', score: 980 },
  { date: '2025-01-15', score: 1050 },
  { date: '2025-01-28', score: 1120 },
];

const stubWeaknesses = [
  { skill_id: 'RW_SKILL_CENTRAL_IDEA', name: 'Central Idea', weakness_score: 0.85, accuracy: 0.68 },
  { skill_id: 'RW_SKILL_INFERENCE', name: 'Inference', weakness_score: 0.72, accuracy: 0.72 },
  { skill_id: 'M_SKILL_GEOMETRY', name: 'Geometry', weakness_score: 0.65, accuracy: 0.58 },
];

export function AnalyticsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] font-sans text-[var(--color-text-dark)]">
      <PageMeta
        title="Your SAT Analytics | SAT Mastery"
        description="View your SAT practice progress: score trends, skill mastery breakdown, and recommended focus areas. One dashboard for your Digital SAT prep."
      />
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[var(--color-text-dark)] mb-8">
          Your Progress at a Glance
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          See how your score is trending, which skills are improving, and which ones your tutor wants you to practice next. One dashboard, clear next steps.
        </p>

        <div className="space-y-8">
          <ProgressChart
            scores={stubScores}
            practiceDays={14}
            totalTimeSpent={180}
          />
          <SkillBreakdown skills={stubSkills} />
          <WeaknessList
            weaknesses={stubWeaknesses}
            onStartDrill={(skillId) => navigate(`/practice?skill=${skillId}`)}
          />
        </div>
      </main>
    </div>
  );
}
