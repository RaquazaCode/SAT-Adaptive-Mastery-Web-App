import React from 'react';
import { ArrowRight } from 'lucide-react';
const articles = [
{
  title: 'Top 5 SAT Math Strategies',
  date: 'Jan 28, 2026',
  image:
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  category: 'Tips'
},
{
  title: 'How to Improve Reading Speed',
  date: 'Jan 25, 2026',
  image:
  'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  category: 'Study Skills'
},
{
  title: 'SAT vs ACT: Which to Take?',
  date: 'Jan 20, 2026',
  image:
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  category: 'Guide'
}];

export function Blog() {
  return (
    <section className="py-20 bg-[var(--color-bg-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-dark)] mb-4">
              Latest news & articles
            </h2>
            <p className="text-gray-600">
              Stay updated with the latest exam tips and education news.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[var(--color-primary)] font-bold hover:gap-3 transition-all">
            View All <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) =>
          <div key={index} className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden mb-4 h-64">
                <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                <span className="text-[var(--color-primary)] font-semibold uppercase tracking-wider">
                  {article.category}
                </span>
                <span>•</span>
                <span>{article.date}</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-dark)] group-hover:text-[var(--color-primary)] transition-colors">
                {article.title}
              </h3>
            </div>
          )}
        </div>
      </div>
    </section>);

}