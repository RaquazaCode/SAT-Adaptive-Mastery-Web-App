import React, { useState } from 'react';
import { BookOpen, Calculator, Clock } from 'lucide-react';

export function SimulationStart() {
  const [selectedType, setSelectedType] = useState<'full' | 'RW' | 'Math' | null>(
    null,
  );

  const simulationTypes = [
    {
      id: 'full' as const,
      title: 'Full Exam',
      description: 'Complete Digital SAT simulation',
      time: '134 minutes',
      questions: '98 questions',
      icon: BookOpen,
    },
    {
      id: 'RW' as const,
      title: 'Reading & Writing',
      description: 'RW section only',
      time: '64 minutes',
      questions: '54 questions',
      icon: BookOpen,
    },
    {
      id: 'Math' as const,
      title: 'Math',
      description: 'Math section only',
      time: '70 minutes',
      questions: '44 questions',
      icon: Calculator,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--color-bg-light)] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-6">
              Start a Full-Length Simulation
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your tutor will watch your performance and provide detailed feedback after completion. 
              Practice under real test conditions to build confidence.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-text-dark)] mb-6 text-center">
              Choose Simulation Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {simulationTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      selectedType === type.id
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                        : 'border-gray-200 hover:border-[var(--color-primary)]/50'
                    }`}>
                    <Icon className="w-10 h-10 text-[var(--color-primary)] mb-4" />
                    <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-2">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {type.time}
                      </div>
                      <div>{type.questions}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedType && (
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
          )}

          {selectedType && (
            <div className="text-center">
              <button className="bg-[var(--color-primary)] text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-[#2d4434] transition-all transform hover:scale-105 shadow-lg">
                Start Simulation
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Your tutor will guide you through each module
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
