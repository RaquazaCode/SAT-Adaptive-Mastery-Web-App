import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, Flag } from 'lucide-react';

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
}

export function ModuleView({
  questions,
  timeLimitMinutes,
  moduleNumber,
  onComplete,
}: ModuleViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(timeLimitMinutes * 60);
  const [startTime] = useState(Date.now());
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

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
  }, []);

  const handleSubmit = () => {
    const responses = questions.map((q) => ({
      item_id: q.id,
      answer: selectedAnswers[q.id] || '',
      time_spent_s: Math.floor((Date.now() - startTime) / 1000 / questions.length),
    }));
    onComplete(responses);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Header with timer */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-text-dark)]">
                Module {moduleNumber}
              </h2>
              <p className="text-sm text-gray-600">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="font-bold text-red-600">
                  {formatTime(timeRemaining)}
                </span>
              </div>
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
