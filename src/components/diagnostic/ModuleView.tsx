import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Clock, ChevronLeft, ChevronRight, Flag, AlertTriangle } from 'lucide-react';

interface Question {
  id: string;
  stimulus: string;
  options?: string[];
  question_type: string;
}

interface ModuleViewProps {
  questions: Question[];
  timeLimitMinutes: number;
  moduleNumber: 1 | 2;
  onComplete: (responses: Array<{ item_id: string; answer: string; time_spent_s: number }>) => void;
  /** Optional: section for Desmos (show calculator link for Math) */
  section?: 'RW' | 'Math';
  /** Optional: map item_id -> correct_answer for routing-risk warning during Module 1 */
  correctAnswerMap?: Record<string, string>;
}

export function ModuleView({
  questions,
  timeLimitMinutes,
  moduleNumber,
  onComplete,
  section,
  correctAnswerMap,
}: ModuleViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(timeLimitMinutes * 60);
  const [startTime] = useState(Date.now());
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const submittedRef = useRef(false);
  const selectedAnswersRef = useRef(selectedAnswers);
  const startTimeRef = useRef(startTime);
  selectedAnswersRef.current = selectedAnswers;
  startTimeRef.current = startTime;

  const handleSubmit = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const perQuestion = questions.length > 0 ? Math.round(elapsed / questions.length) : 0;
    const answers = selectedAnswersRef.current;
    const responses = questions.map((q) => ({
      item_id: q.id,
      answer: answers[q.id] || '',
      time_spent_s: perQuestion,
    }));
    onComplete(responses);
  }, [questions, onComplete]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleSubmit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const allAnswered = questions.every((q) => selectedAnswers[q.id]);
  const canSubmit = allAnswered || timeRemaining <= 0;
  const timeBudgetPerQuestion = (timeLimitMinutes * 60) / questions.length;
  const first10 = questions.slice(0, 10);
  const first10Answered = first10.every((q) => selectedAnswers[q.id]);
  let routingRiskMessage: string | null = null;
  if (
    moduleNumber === 1 &&
    correctAnswerMap &&
    first10Answered &&
    first10.length === 10
  ) {
    const correctFirst10 = first10.filter(
      (q) => selectedAnswers[q.id] === correctAnswerMap[q.id],
    ).length;
    const accuracy = correctFirst10 / 10;
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const avgTimePerQ = elapsed / 10;
    const errorsFirst10 = 10 - correctFirst10;
    if (accuracy < 0.6)
      routingRiskMessage = 'Accuracy in the first 10 questions is below 60%. Focus on accuracy to improve your routing.';
    else if (errorsFirst10 > 3)
      routingRiskMessage = 'More than 3 errors in the first 10 questions may route you to an easier Module 2.';
    else if (avgTimePerQ > 1.2 * timeBudgetPerQuestion)
      routingRiskMessage = 'You are spending more than 1.2× the time budget per question. Pacing may affect your routing.';
  }

  return (
    <div className="min-h-screen bg-white">
      {/* &lt; 5 minutes warning */}
      {timeRemaining > 0 && timeRemaining <= 5 * 60 && (
        <div className="sticky top-0 z-[60] bg-amber-100 border-b border-amber-300 px-4 py-2 text-center text-amber-800 font-semibold">
          Less than 5 minutes remaining in this module.
        </div>
      )}

      {/* Routing risk (Module 1 only) */}
      {routingRiskMessage && (
        <div className="sticky top-0 z-[59] bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-center gap-2 text-amber-800 text-sm">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{routingRiskMessage}</span>
        </div>
      )}

      {/* Header with timer and persistent Submit */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-text-dark)]">
                Module {moduleNumber}
              </h2>
              <p className="text-sm text-gray-600">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="font-bold text-red-600">
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="px-4 py-2 rounded-full bg-[var(--color-accent-green)] text-[var(--color-primary)] font-bold text-sm hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
                Submit Module
              </button>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[var(--color-primary)] h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desmos for Math */}
      {section === 'Math' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <a
            href="https://www.desmos.com/calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:underline">
            Open Desmos Graphing Calculator (new tab)
          </a>
        </div>
      )}

      {/* Question Display */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-[var(--color-primary)]">
                {currentQuestion.question_type}
              </span>
              <button
                onClick={() => {
                  const newFlagged = new Set(flagged);
                  if (newFlagged.has(currentQuestion.id)) {
                    newFlagged.delete(currentQuestion.id);
                  } else {
                    newFlagged.add(currentQuestion.id);
                  }
                  setFlagged(newFlagged);
                }}
                className={`p-2 rounded-lg ${
                  flagged.has(currentQuestion.id)
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                <Flag className="w-5 h-5" />
              </button>
            </div>
            <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
              {currentQuestion.stimulus}
            </p>
          </div>

          {currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const optionLabel = String.fromCharCode(65 + idx); // A, B, C, D
                const isSelected = selectedAnswers[currentQuestion.id] === option;
                return (
                  <button
                    key={idx}
                    onClick={() =>
                      setSelectedAnswers({
                        ...selectedAnswers,
                        [currentQuestion.id]: option,
                      })
                    }
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <span className="font-semibold text-[var(--color-primary)] mr-3">
                      {optionLabel}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex gap-2">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-10 h-10 rounded-lg text-sm font-semibold ${
                  idx === currentIndex
                    ? 'bg-[var(--color-primary)] text-white'
                    : selectedAnswers[questions[idx].id]
                      ? 'bg-green-100 text-green-700'
                      : flagged.has(questions[idx].id)
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {idx + 1}
              </button>
            ))}
          </div>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold hover:bg-[#2d4434] transition-all">
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-full bg-[var(--color-accent-green)] text-[var(--color-primary)] font-bold hover:bg-opacity-90 transition-all">
              Submit Module
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
