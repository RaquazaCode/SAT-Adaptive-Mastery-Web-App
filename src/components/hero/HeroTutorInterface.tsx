import React, { useState, useEffect } from 'react';
import { MessageCircle, BookOpen, Calculator, Zap } from 'lucide-react';

const ROTATING_MESSAGES = [
  '1-on-1 attention, 24/7',
  'Learns your weak spots',
  'No private tutor price tag',
  'Practice when you want',
];

const LIVE_COUNT_MIN = 800;
const LIVE_COUNT_MAX = 900;

function nextLiveCount(prev: number): number {
  const delta = Math.floor(Math.random() * 21) - 10;
  return Math.min(LIVE_COUNT_MAX, Math.max(LIVE_COUNT_MIN, prev + delta));
}

export function HeroTutorInterface() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [liveCount, setLiveCount] = useState(() =>
    800 + Math.floor(Math.random() * (LIVE_COUNT_MAX - LIVE_COUNT_MIN + 1))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setMessageIndex((i) => (i + 1) % ROTATING_MESSAGES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const schedule = () => {
      setLiveCount((prev) => nextLiveCount(prev));
      timeoutId = setTimeout(schedule, 1000 + Math.random() * 1000);
    };
    timeoutId = setTimeout(schedule, 1000 + Math.random() * 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const skills = [
    { id: 'rw', label: 'Reading & Writing', progress: 72, icon: BookOpen, color: 'var(--color-accent-blue)' },
    { id: 'math', label: 'Math', progress: 58, icon: Calculator, color: 'var(--color-accent-orange)' },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 lg:p-8">
      {/* App-window style container */}
      <div className="relative w-full max-w-md rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl border border-white/20 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[var(--color-primary)] text-white">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-white/30" />
            <span className="w-3 h-3 rounded-full bg-white/30" />
            <span className="w-3 h-3 rounded-full bg-white/30" />
          </div>
          <span className="ml-2 font-semibold text-sm">Your Personal Tutor</span>
          <span className="ml-auto flex items-center gap-1.5 text-xs bg-white/20 px-2.5 py-1 rounded-full text-white font-medium">
            <Zap className="w-3.5 h-3.5 text-[var(--color-accent-yellow)] animate-pulse flex-shrink-0" />
            <span>{liveCount} studying now</span>
          </span>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Rotating value message */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-accent-green)]/30 border border-[var(--color-primary)]/10">
            <MessageCircle className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
            <p className="text-[var(--color-primary)] font-semibold text-sm min-h-[2.5rem] flex items-center">
              {ROTATING_MESSAGES[messageIndex]}
            </p>
          </div>

          {/* Skill progress cards */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-[var(--color-text-gray)] uppercase tracking-wide">
              Your progress
            </p>
            {skills.map(({ id, label, progress, icon: Icon, color }) => (
              <div
                key={id}
                onMouseEnter={() => setHoveredCard(id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  hoveredCard === id
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 scale-[1.02] shadow-lg'
                    : 'border-gray-200 bg-gray-50/80 hover:border-[var(--color-primary)]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[var(--color-text-dark)] text-sm flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color }} />
                    {label}
                  </span>
                  <span className="text-xs font-bold text-[var(--color-primary)]">{progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Affordability cue */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-accent-yellow)]/20 border border-[var(--color-accent-yellow)]/40">
            <span className="text-sm font-semibold text-[var(--color-text-dark)]">
              Same attention as a $200/hr tutor
            </span>
            <span className="text-sm font-bold text-[var(--color-primary)]">Included</span>
          </div>
        </div>

        {/* Subtle glow behind card */}
        <div className="absolute -inset-1 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent rounded-2xl -z-10 blur-xl pointer-events-none" />
      </div>
    </div>
  );
}
