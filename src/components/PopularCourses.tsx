import React from 'react';
import { Clock, Star } from 'lucide-react';
const courses = [
{
  title: 'SAT Math Mastery',
  category: 'Math',
  image:
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  lessons: 24,
  rating: 4.9,
  price: '$199'
},
{
  title: 'Reading Comprehension Pro',
  category: 'Reading',
  image:
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  lessons: 18,
  rating: 4.8,
  price: '$149'
},
{
  title: 'Writing & Language',
  category: 'Writing',
  image:
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  lessons: 20,
  rating: 4.9,
  price: '$149'
},
{
  title: 'Full SAT Bootcamp',
  category: 'Bundle',
  image:
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  lessons: 62,
  rating: 5.0,
  price: '$399'
}];

export function PopularCourses() {
  return (
    <section className="py-20 bg-[var(--color-bg-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-4">
            Our popular courses.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our most enrolled courses designed to target specific
            weaknesses and boost your overall score.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) =>
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">

              <div className="relative h-48 overflow-hidden">
                <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[var(--color-primary)]">
                  {course.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-4 line-clamp-2">
                  {course.title}
                </h3>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-2xl font-bold text-[var(--color-primary)]">
                    {course.price}
                  </span>
                  <button className="text-[var(--color-text-dark)] font-semibold hover:text-[var(--color-primary)] transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}