import React from 'react';
import { Quote } from 'lucide-react';
const testimonials = [
{
  name: 'Sarah Johnson',
  role: 'Improved 250 points',
  image:
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  quote:
  'My tutor knew exactly where I struggled. Every practice session felt like it was designed just for me. The feedback was so personalized—I finally understood why I was making mistakes.'
},
{
  name: 'Michael Chen',
  role: 'Scored 1520',
  image:
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  quote:
  'It felt like having a tutor available 24/7. I could practice at midnight after my part-time job, and my tutor was always there with instant feedback. The encouragement kept me going.'
},
{
  name: 'Emily Davis',
  role: 'Improved 180 points',
  image:
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  quote:
  'My tutor never judged me for mistakes. Instead, my tutor explained what went wrong and helped me learn from it. The support made all the difference—I actually looked forward to practicing.'
}];

export function Testimonials() {
  return (
    <section className="py-20 bg-[var(--color-bg-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-4">
            What our students says.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from students who achieved their dream scores with their personal tutor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) =>
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">

              <div className="flex items-center gap-4 mb-6">
                <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover" />

                <div>
                  <h4 className="font-bold text-[var(--color-text-dark)]">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <Quote className="w-8 h-8 text-[var(--color-accent-green)] mb-4 opacity-50" />
              <p className="text-gray-600 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}