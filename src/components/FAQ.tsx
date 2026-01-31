import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
const faqs = [
{
  question: 'How does my tutor learn about me?',
  answer:
  'Your tutor watches every question you answer—right or wrong, fast or slow. Over time, your tutor builds a complete picture: which question types trip you up, which traps you fall into, and how your timing affects performance. Every practice session makes your tutor smarter about your specific needs.'
},
{
  question: 'Is this really like having a personal tutor?',
  answer:
  'Yes. Research shows 1-on-1 tutoring improves outcomes by two standard deviations—the most effective teaching method. Your tutor provides that same personalized attention, available 24/7. Your tutor adapts to your schedule, learns your patterns, and gives you instant feedback just like a human tutor would—but without the scheduling hassles or high cost.'
},
{
  question: 'How does this compare to hiring a human tutor?',
  answer:
  'Your personal tutor offers the same proven benefits of 1-on-1 tutoring (personalization, instant feedback, encouragement) but with key advantages: available whenever you need it, never judges, gets smarter about you over time, and costs a fraction of human tutors ($20-50/month vs. $500-2000/month). You get the best of both worlds.'
},
{
  question: 'What score improvement can I expect?',
  answer:
  'Students working with their personal tutor typically see 150-250 point improvements. Results vary based on starting score, study time, and consistency. Your tutor focuses on skill mastery rather than just practice volume, targeting exactly what you need to improve.'
},
{
  question: 'Can I practice whenever I want?',
  answer:
  'Absolutely. Your tutor is available 24/7. Practice at 6am before school, 11pm after homework, or any time that fits your schedule. Your tutor picks up exactly where you left off and remembers everything about your progress.'
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
            Everything you need to know about your personal SAT tutor.
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