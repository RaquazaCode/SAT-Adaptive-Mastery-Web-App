import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { DrillSession } from '../components/drill/DrillSession';
import { DrillComplete } from '../components/drill/DrillComplete';
import { stubDrillQuestions } from '../data/stubItems';

export function DrillFlow() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'session' | 'complete'>('session');
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const questions = stubDrillQuestions.slice(0, 5).map((q) => ({
    id: q.id,
    stimulus: q.stimulus,
    options: q.options,
    correct_answer: q.correct_answer,
    explanation: q.explanation,
  }));

  const handleComplete = useCallback(
    (responses: Array<{ item_id: string; answer: string; time_spent_s: number }>) => {
      const lookup = stubDrillQuestions.slice(0, 5);
      const byId = new Map(lookup.map((q) => [q.id, q]));
      let correct = 0;
      responses.forEach((r) => {
        const item = byId.get(r.item_id);
        if (item && r.answer === item.correct_answer) correct++;
      });
      setCorrectCount(correct);
      setTotalCount(responses.length);
      setPhase('complete');
    },
    [],
  );

  const handleStartAnother = useCallback(() => {
    setPhase('session');
    setCorrectCount(0);
    setTotalCount(0);
  }, []);

  const handleViewAnalytics = useCallback(() => {
    navigate('/analytics');
  }, [navigate]);

  if (phase === 'complete') {
    return (
      <>
        <PageMeta
          title="Drill Complete | SAT Mastery"
          description="Your practice drill is complete. See your accuracy and which skills you practiced. Start another drill or view your analytics."
        />
        <DrillComplete
          correct={correctCount}
          total={totalCount}
          skillsPracticed={['Inference', 'Central Idea', 'Expression of Ideas']}
          onStartAnother={handleStartAnother}
          onViewAnalytics={handleViewAnalytics}
        />
      </>
    );
  }

  return (
    <>
      <PageMeta
        title="Practice Drill | SAT Mastery"
        description="Adaptive SAT practice drill. Answer questions, get instant feedback, and build skills where you need them most."
      />
      <DrillSession
        questions={questions}
        onComplete={handleComplete}
      />
    </>
  );
}
