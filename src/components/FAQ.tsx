import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
const faqs = [
{
  question: 'How long do I have access to the course?',
  answer:
  'You have lifetime access to the course materials once you enroll. You can study at your own pace and revisit lessons whenever you need.'
},
{
  question: 'Is there a money-back guarantee?',
  answer:
  "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with the course content, simply contact support for a full refund."
},
{
  question: 'Do you offer private tutoring?',
  answer:
  'Yes, we have packages that include 1-on-1 sessions with our expert tutors. You can also book individual sessions as needed.'
},
{
  question: 'Are the practice tests realistic?',
  answer:
  'Absolutely. Our practice tests are modeled after official SAT exams to give you the most accurate test-day experience possible.'
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
            Everything you need to know about our SAT prep courses.
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