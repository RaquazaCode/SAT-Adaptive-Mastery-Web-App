import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
const faqs = [
{
  question: 'How does the adaptive practice system work?',
  answer:
  'Our system tracks your performance at the question-type level, identifying which skills need work. Practice drills automatically adjust difficulty and focus on your weak areas based on error patterns and timing behavior.'
},
{
  question: 'Are the simulations accurate to the real Digital SAT?',
  answer:
  'Yes. Our simulations mirror the real Digital SAT format with module-based routing, accurate timing (32 min per R&W module, 35 min per Math module), and scoring estimates based on Item Response Theory.'
},
{
  question: 'What score improvement can I expect?',
  answer:
  'Students using our adaptive system typically see 150-250 point improvements. Results vary based on starting score, study time, and consistency. Our system focuses on skill mastery rather than just practice volume.'
},
{
  question: 'Do I need to create an account?',
  answer:
  'For MVP, you can start practicing immediately. Your progress is tracked by session. Account creation (for saving progress across devices) will be available in a future update.'
}];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-4">
            Frequently asked questions
          </h2>
          <p className="text-gray-600">
            Everything you need to know about SAT Adaptive Mastery.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) =>
          <div
            key={index}
            className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300">

              <button
              className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}>

                <span className="font-bold text-lg text-[var(--color-text-dark)]">
                  {faq.question}
                </span>
                {openIndex === index ?
              <Minus className="w-5 h-5 text-[var(--color-primary)]" /> :

              <Plus className="w-5 h-5 text-gray-400" />
              }
              </button>

              <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>

                <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}