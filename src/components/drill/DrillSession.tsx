import React, { useState, useRef } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  stimulus: string;
  options?: string[];
  correct_answer: string;
  explanation?: string;
}

interface DrillSessionProps {
  questions: Question[];
  onComplete: (responses: Array<{ item_id: string; answer: string; time_spent_s: number }>) => void;
}

export function DrillSession({ questions, onComplete }: DrillSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime] = useState(Date.now());
  const [responses, setResponses] = useState<
    Array<{ item_id: string; answer: string; time_spent_s: number; correct: boolean }>
  >([]);
  const pendingFullResponsesRef = useRef<
    Array<{ item_id: string; answer: string; time_spent_s: number }>
  >([]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isCorrect = selectedAnswer === currentQuestion.correct_answer;

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const newResponse = {
      item_id: currentQuestion.id,
      answer: selectedAnswer,
      time_spent_s: timeSpent,
      correct: isCorrect,
    };
    const newResponses = [...responses, newResponse];
    pendingFullResponsesRef.current = newResponses.map((r) => ({
      item_id: r.item_id,
      answer: r.answer,
      time_spent_s: r.time_spent_s,
    }));
    setResponses(newResponses);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
    } else {
      onComplete(pendingFullResponsesRef.current);
    }
  };

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[var(--color-bg-light)] flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            {isCorrect ? (
              <div className="mb-6">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-green-600 mb-2">
                  Correct! Great job!
                </h2>
                <p className="text-gray-600">
                  Your tutor is proud of this one.
                </p>
              </div>
            ) : (
              <div className="mb-6">
                <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-red-600 mb-2">
                  Not quite, but that is okay
                </h2>
                <p className="text-gray-600">
                  Your tutor will help you learn from this.
                </p>
              </div>
            )}
          </div>

          {currentQuestion.explanation && (
            <div className="bg-[var(--color-bg-light)] rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-lg mb-3 text-[var(--color-text-dark)]">
                Your Tutor Explains:
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div className="bg-[var(--color-primary)]/10 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-2 text-[var(--color-text-dark)]">
              Why This Matters:
            </h3>
            <p className="text-gray-700">
              {isCorrect
                ? "You're mastering this question type. Your tutor will challenge you with harder versions next."
                : "Your tutor noticed this is a pattern. You'll see more questions like this to help you master it."}
            </p>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-[var(--color-primary)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#2d4434] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3">
            {currentIndex < questions.length - 1 ? 'Continue' : 'View Results'}
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[var(--color-text-dark)]">
              Practice Drill
            </h2>
            <span className="text-gray-600">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[var(--color-primary)] h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap mb-8">
            {currentQuestion.stimulus}
          </p>

          {currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const optionLabel = String.fromCharCode(65 + idx);
                const isSelected = selectedAnswer === option;
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
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

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="bg-[var(--color-primary)] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#2d4434] transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
}
