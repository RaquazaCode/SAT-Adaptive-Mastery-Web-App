import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { ModuleView } from '../components/diagnostic/ModuleView';
import { ModuleTransition } from '../components/diagnostic/ModuleTransition';
import { FinalScore } from '../components/simulation/FinalScore';
import {
  estimateTheta,
  routeToModule2,
  calculateScore,
  getDifficultyIRTParams,
  type ModuleResponse,
} from '../lib/simulation-routing';
import {
  stubModule1Questions,
  stubModule2EasyQuestions,
  stubModule2HardQuestions,
  type StubItem,
} from '../data/stubItems';

const MODULE1_TIME_MINUTES = 2;
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

export function SimulationFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<
    'start' | 'module1' | 'transition' | 'module2' | 'results'
  >('start');
  const [section] = useState<'RW' | 'Math'>('RW');
  const [module1Responses, setModule1Responses] = useState<ModuleResponse[]>([]);
  const [module2Responses, setModule2Responses] = useState<ModuleResponse[]>([]);
  const [routingResult, setRoutingResult] = useState<'M2_H' | 'M2_L'>('M2_L');

  const module1Questions = stubToModuleViewQuestions(stubModule1Questions);
  const module2Easy = stubToModuleViewQuestions(stubModule2EasyQuestions);
  const module2Hard = stubToModuleViewQuestions(stubModule2HardQuestions);
  const module2Questions =
    routingResult === 'M2_H' ? module2Hard : module2Easy;

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

  const handleReviewMistakes = useCallback(() => {
    navigate('/practice');
  }, [navigate]);

  const handleStartNewPractice = useCallback(() => {
    navigate('/diagnostic');
  }, [navigate]);

  if (step === 'start') {
    return (
      <>
        <PageMeta
          title="Full-Length SAT Simulation | SAT Mastery"
          description="Practice the full Digital SAT under real timing. Choose Full Exam, Reading & Writing, or Math. Get scored and routed like the real test."
        />
        <SimulationStartWithNav
          onStart={() => setStep('module1')}
          onBack={() => navigate('/')}
        />
      </>
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
  const totalScore = sectionScore.score_estimate + 500;

  return (
    <FinalScore
      totalScore={Math.min(1600, totalScore)}
      rwScore={section === 'RW' ? sectionScore.score_estimate : undefined}
      mathScore={section === 'Math' ? sectionScore.score_estimate : undefined}
      scoreCI90={sectionScore.score_ci90}
      onReviewMistakes={handleReviewMistakes}
      onStartNewPractice={handleStartNewPractice}
    />
  );
}

function SimulationStartWithNav({
  onStart,
  onBack,
}: {
  onStart: () => void;
  onBack: () => void;
}) {
  const [selectedType, setSelectedType] = useState<'full' | 'RW' | 'Math' | null>(
    null,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--color-bg-light)] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-6">
              Full-Length SAT Practice—Real Timing, Real Routing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Run a complete section under real time limits. Your tutor scores your run, 
              explains how Module 1 routing works, and shows you exactly what to improve next.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-6 text-center">
              Choose Simulation Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'full' as const, title: 'Full Exam', description: 'Complete Digital SAT simulation', time: '134 minutes', questions: '98 questions' },
                { id: 'RW' as const, title: 'Reading & Writing', description: 'RW section only', time: '64 minutes', questions: '54 questions' },
                { id: 'Math' as const, title: 'Math', description: 'Math section only', time: '70 minutes', questions: '44 questions' },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    selectedType === type.id
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                      : 'border-gray-200 hover:border-[var(--color-primary)]/50'
                  }`}>
                  <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>{type.time}</span>
                    <span>{type.questions}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedType && (
            <>
              <div className="bg-[var(--color-bg-light)] rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-lg mb-4 text-[var(--color-text-dark)]">
                  What to Expect:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Module 1: Your tutor assesses your performance</li>
                  <li>• Routing: Your tutor routes you to Module 2 based on Module 1</li>
                  <li>• Module 2: Complete the second module</li>
                  <li>• Results: Your tutor provides detailed score breakdown and recommendations</li>
                </ul>
              </div>

              <div className="text-center space-y-4">
                <button
                  onClick={onStart}
                  className="bg-[var(--color-primary)] text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-[#2d4434] transition-all transform hover:scale-105 shadow-lg">
                  Start Simulation
                </button>
                <p className="text-sm text-gray-500">
                  Your tutor will guide you through each module
                </p>
                <button
                  type="button"
                  onClick={onBack}
                  className="block mx-auto text-gray-500 hover:text-[var(--color-primary)] underline">
                  Back to home
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
