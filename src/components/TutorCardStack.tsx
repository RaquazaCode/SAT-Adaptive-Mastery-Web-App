"use client";

/**
 * @author: @dorianbaffier
 * @description: Card Stack
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import tutorInteraction from "@/assets/tutor-interaction.svg";
import howTutorWorks from "@/assets/how-tutor-works.svg";
import heroTutorInterface from "@/assets/hero-tutor-interface.svg";
import analyticsDashboard from "@/assets/analytics-dashboard.svg";

interface Specification {
  label: string;
  value: string;
}

interface FeatureCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  specs: Specification[];
  description: string;
}

// SAT Mastery features (website copy, benefits)
const products: FeatureCard[] = [
  {
    id: "diagnostic",
    title: "Free Diagnostic",
    subtitle: "Find Your Baseline",
    image: tutorInteraction,
    specs: [
      { label: "Time", value: "~45 min" },
      { label: "Modules", value: "2" },
      { label: "Result", value: "Improved" },
      { label: "Cost", value: "Free" },
    ],
    description:
      "See where you stand. Get a personalized plan and know exactly what to practice next.",
  },
  {
    id: "drills",
    title: "Adaptive Drills",
    subtitle: "Target Your Weak Spots",
    image: howTutorWorks,
    specs: [
      { label: "Focus", value: "Your gaps" },
      { label: "Pacing", value: "Your speed" },
      { label: "Feedback", value: "Instant" },
      { label: "Format", value: "Bite-sized" },
    ],
    description:
      "Your tutor remembers every error. Practice that targets your traps and builds mastery.",
  },
  {
    id: "simulation",
    title: "Full Simulation",
    subtitle: "Real Test Feel",
    image: heroTutorInterface,
    specs: [
      { label: "Timer", value: "Real SAT" },
      { label: "Sections", value: "R&W + Math" },
      { label: "Scoring", value: "Scaled" },
      { label: "Review", value: "Flag & revisit" },
    ],
    description:
      "Timed practice tests with real structure. Build stamina and know what to expect on test day.",
  },
  {
    id: "analytics",
    title: "Analytics",
    subtitle: "Track Your Progress",
    image: analyticsDashboard,
    specs: [
      { label: "Skills", value: "Mastery %" },
      { label: "Trends", value: "Over time" },
      { label: "Weaknesses", value: "Prioritized" },
      { label: "Next", value: "Recommendations" },
    ],
    description:
      "Watch your tutor celebrate improvements. See skills mastered and get personalized next steps.",
  },
];

interface CardProps {
  product: FeatureCard;
  index: number;
  totalCards: number;
  isExpanded: boolean;
}

const Card = ({ product, index, totalCards, isExpanded }: CardProps) => {
  // Calculate center offset based on total cards
  const centerOffset = (totalCards - 1) * 5;

  // Initial stacked position - centered with slight overlap
  const defaultX = index * 10 - centerOffset;
  const defaultY = index * 2;
  const defaultRotate = index * 1.5;
  const defaultScale = 1;

  // Calculate the total width of expanded cards and center offset
  const cardWidth = 320;
  const cardOverlap = 240;
  const totalExpandedWidth =
    cardWidth + (totalCards - 1) * (cardWidth - cardOverlap);
  const expandedCenterOffset = totalExpandedWidth / 2;

  // Fanned out position - centered spread with overlap
  const spreadX =
    index * (cardWidth - cardOverlap) - expandedCenterOffset + cardWidth / 2;
  const spreadY = 0;
  const spreadRotate = index * 5 - (totalCards - 1) * 2.5;
  const spreadScale = 1;

  return (
    <motion.div
      animate={{
        x: isExpanded ? spreadX : defaultX,
        y: isExpanded ? spreadY : defaultY,
        rotate: isExpanded ? spreadRotate : defaultRotate,
        scale: isExpanded ? spreadScale : defaultScale,
        zIndex: totalCards - index,
      }}
      className={cn(
        "absolute top-0 left-1/2 rounded-2xl p-6 group",
        "bg-white",
        "border border-[var(--color-primary)]/15",
        "shadow-[0_8px_20px_rgb(0,0,0,0.08)]",
        "hover:border-[var(--color-primary)]/25",
        "hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]",
        "transition-all duration-500 ease-out",
        "transform-gpu overflow-hidden"
      )}
      initial={{
        x: defaultX,
        y: defaultY,
        rotate: defaultRotate,
        scale: defaultScale,
      }}
      style={{
        width: `${cardWidth}px`,
        minHeight: "440px",
        marginLeft: `-${cardWidth / 2}px`,
        transformStyle: "preserve-3d",
        perspective: "2000px",
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 0.8,
        restDelta: 0.001,
        restSpeed: 0.001,
      }}
    >
      {/* Inner Card */}
      <div className="absolute inset-1 rounded-xl border border-[var(--color-primary)]/10 bg-[var(--color-bg-light)]/50" />

      <div className="relative z-10">
        {/* Specs Grid */}
        <dl className="mb-4 grid grid-cols-4 justify-center gap-2">
          {product.specs.map((spec) => (
            <div
              className="flex flex-col items-start text-left text-[10px]"
              key={spec.label}
            >
              <dd className="w-full text-left font-medium text-[var(--color-primary)]">
                {spec.value}
              </dd>
              <dt className="mb-0.5 w-full text-left font-serif text-[var(--color-text-dark)]">
                {spec.label}
              </dt>
            </div>
          ))}
        </dl>

        <div
          className={cn(
            "relative aspect-[16/11] w-full overflow-hidden rounded-lg",
            "bg-[var(--color-bg-light)]",
            "border border-[var(--color-primary)]/10",
            "shadow-inner"
          )}
        >
          <img
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
            src={product.image}
          />
          {product.id === "diagnostic" && (
            <span
              className="absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl md:text-8xl pointer-events-none select-none transition-transform duration-150 group-hover:animate-bounce"
              role="img"
              aria-hidden
            >
              👩‍🎓
            </span>
          )}
        </div>

        <div className="mt-4">
          <div className="space-y-1">
            <h2 className="font-serif text-left font-bold text-2xl sm:text-3xl text-[var(--color-text-dark)] tracking-tight">
              {product.title}
            </h2>
            <span className="block font-serif text-left font-semibold text-lg sm:text-xl text-[var(--color-primary)] tracking-tight">
              {product.subtitle}
            </span>
          </div>
          <p className="mt-2 text-left text-[var(--color-text-gray)] text-sm">
            {product.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

interface CardStackProps {
  className?: string;
}

export default function TutorCardStack({ className }: CardStackProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={cn(
        "flex-shrink-0 w-[min(90vw,560px)] min-w-[280px] md:w-[560px] md:min-w-[320px]",
        className
      )}
    >
      <button
        aria-label="Toggle card stack"
        className={cn(
          "relative mx-auto cursor-pointer block w-full",
          "min-h-[440px]",
          "appearance-none border-0 bg-transparent p-0",
          "mb-8 flex items-center justify-center"
        )}
        onClick={handleToggle}
        type="button"
      >
        {products.map((product, index) => (
          <Card
            index={index}
            isExpanded={isExpanded}
            key={product.id}
            product={product}
            totalCards={products.length}
          />
        ))}
      </button>
    </div>
  );
}
