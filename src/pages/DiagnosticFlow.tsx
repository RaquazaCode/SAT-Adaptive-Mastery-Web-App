import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { DiagnosticStart } from '../components/diagnostic/DiagnosticStart';
import { ModuleView } from '../components/diagnostic/ModuleView';
import { ModuleTransition } from '../components/diagnostic/ModuleTransition';
import { ScoreResults } from '../components/diagnostic/ScoreResults';
import {
  estimateTheta,
  routeToModule2,
  calculateScore,
  calculateTotalScore,
  getDifficultyIRTParams,
  type ModuleResponse,
} from '../lib/simulation-routing';
import {
  stubModule1Questions,
  stubModule2EasyQuestions,
  stubModule2HardQuestions,
  type StubItem,
} from '../data/stubItems';

const MODULE1_TIME_MINUTES = 2; // Demo: 2 min (real: 32 for R&W, 35 for Math)
const MODULE2_TIME_MINUTES = 2;

function stubToModuleViewQuestions(items: StubItem[]) {
  return items.map((q) => ({
    id: q.id,
    stimulus: q.stimulus,
    options: q.options,
    question_type: q.question_type,
  }));
}

function responsesWithCorrect(
  responses: Array<{ item_id: string; answer: string; time_spent_s: number }>,
  items: StubItem[],
): ModuleResponse[] {
  const byId = new Map(items.map((q) => [q.id, q]));
  return responses.map((r) => {
    const item = byId.get(r.item_id);
    const correct = item ? r.answer === item.correct_answer : false;
    return { ...r, correct };
  });
}

export function DiagnosticFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<
    'start' | 'module1' | 'transition' | 'module2' | 'results'
  >('start');
  const [section, setSection] = useState<'RW' | 'Math'>('RW');
  const [module1Responses, setModule1Responses] = useState<ModuleResponse[]>([]);
  const [module2Responses, setModule2Responses] = useState<ModuleResponse[]>([]);
  const [routingResult, setRoutingResult] = useState<'M2_H' | 'M2_L'>('M2_L');

  const module1Questions = stubToModuleViewQuestions(stubModule1Questions);
  const module2Easy = stubToModuleViewQuestions(stubModule2EasyQuestions);
  const module2Hard = stubToModuleViewQuestions(stubModule2HardQuestions);
  const module2Questions =
    routingResult === 'M2_H' ? module2Hard : module2Easy;

  const handleStartDiagnostic = useCallback(() => {
    setStep('module1');
  }, []);

  const handleModule1Complete = useCallback(
    (responses: Array<{ item_id: string; answer: string; time_spent_s: number }>) => {
      const withCorrect = responsesWithCorrect(responses, stubModule1Questions);
      setModule1Responses(withCorrect);
      const itemParams = stubModule1Questions.map((q) =>
        getDifficultyIRTParams(q.difficulty || 'D2', true),
      );
      const theta = estimateTheta(withCorrect, itemParams);
      const route = routeToModule2(theta);
      setRoutingResult(route);
      setStep('transition');
    },
    [],
  );

  const handleTransitionContinue = useCallback(() => {
    setStep('module2');
  }, []);

  const handleModule2Complete = useCallback(
    (responses: Array<{ item_id: string; answer: string; time_spent_s: number }>) => {
      const items =
        routingResult === 'M2_H' ? stubModule2HardQuestions : stubModule2EasyQuestions;
      const withCorrect = responsesWithCorrect(responses, items);
      setModule2Responses(withCorrect);
      setStep('results');
    },
    [routingResult],
  );

  const handleStartPractice = useCallback(() => {
    navigate('/practice');
  }, [navigate]);

  const handleStartWithSection = useCallback((s: 'RW' | 'Math') => {
    setSection(s);
    setStep('module1');
  }, []);

  if (step === 'start') {
    return (
      <div className="min-h-screen bg-white">
        <PageMeta
          title="Free SAT Diagnostic | SAT Mastery"
          description="Take a free SAT diagnostic test. Get your score and a personalized practice plan. Reading & Writing or Math—see where you stand in under an hour."
        />
        <DiagnosticStart onStart={handleStartWithSection} />
      </div>
    );
  }

  if (step === 'module1') {
    const correctAnswerMap: Record<string, string> = {};
    stubModule1Questions.forEach((q) => {
      correctAnswerMap[q.id] = q.correct_answer;
    });
    return (
      <ModuleView
        questions={module1Questions}
        timeLimitMinutes={MODULE1_TIME_MINUTES}
        moduleNumber={1}
        onComplete={handleModule1Complete}
        section={section}
        correctAnswerMap={correctAnswerMap}
      />
    );
  }

  if (step === 'transition') {
    const correct = module1Responses.filter((r) => r.correct).length;
    const total = module1Responses.length;
    return (
      <ModuleTransition
        module1Results={{
          correct,
          total,
          accuracy: total > 0 ? correct / total : 0,
        }}
        routingResult={routingResult}
        onContinue={handleTransitionContinue}
      />
    );
  }

  if (step === 'module2') {
    const m2Items =
      routingResult === 'M2_H' ? stubModule2HardQuestions : stubModule2EasyQuestions;
    const correctAnswerMap: Record<string, string> = {};
    m2Items.forEach((q) => {
      correctAnswerMap[q.id] = q.correct_answer;
    });
    return (
      <ModuleView
        questions={module2Questions}
        timeLimitMinutes={MODULE2_TIME_MINUTES}
        moduleNumber={2}
        onComplete={handleModule2Complete}
        section={section}
        correctAnswerMap={correctAnswerMap}
      />
    );
  }

  // results
  const allResponses = [...module1Responses, ...module2Responses];
  const itemParams = allResponses.map(() =>
    getDifficultyIRTParams('D2', true),
  );
  const theta = estimateTheta(allResponses, itemParams);
  const sectionScore = calculateScore(theta, section);
  const totalScore = sectionScore.score_estimate + 500; // Demo: assume other section ~500
  const weaknesses = [
    { skill_id: 'RW_SKILL_INFERENCE', name: 'Inference', accuracy: 0.65 },
    { skill_id: 'RW_SKILL_CENTRAL_IDEA', name: 'Central Idea', accuracy: 0.72 },
  ];

  return (
    <ScoreResults
      rwScore={section === 'RW' ? sectionScore.score_estimate : undefined}
      mathScore={section === 'Math' ? sectionScore.score_estimate : undefined}
      totalScore={Math.min(1600, totalScore)}
      weaknesses={weaknesses}
      onStartPractice={handleStartPractice}
    />
  );
}

