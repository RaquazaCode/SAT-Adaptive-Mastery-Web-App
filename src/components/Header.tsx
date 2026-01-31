import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">

                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round" />

                <path
                  d="M2 17L12 22L22 17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round" />

                <path
                  d="M2 12L12 17L22 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round" />

              </svg>
            </div>
            <span className="font-serif text-2xl font-bold text-[var(--color-primary)]">
              SAT Mastery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/#features"
              className="text-gray-600 hover:text-[var(--color-primary)] font-medium transition-colors">
              Features
            </Link>
            <Link
              to="/#how-it-works"
              className="text-gray-600 hover:text-[var(--color-primary)] font-medium transition-colors">
              How It Works
            </Link>
            <Link
              to="/simulation"
              className="text-gray-600 hover:text-[var(--color-primary)] font-medium transition-colors">
              Practice Tests
            </Link>
            <Link
              to="/#pricing"
              className="text-gray-600 hover:text-[var(--color-primary)] font-medium transition-colors">
              Pricing
            </Link>
            <Link
              to="/#faq"
              className="text-gray-600 hover:text-[var(--color-primary)] font-medium transition-colors">
              FAQ
            </Link>
            <Link
              to="/analytics"
              className="text-gray-600 hover:text-[var(--color-primary)] font-medium transition-colors">
              Analytics
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-[var(--color-primary)] transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/diagnostic"
              className="bg-[var(--color-accent-green)] text-[var(--color-primary)] px-6 py-2.5 rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105">
              Start Free Diagnostic
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>);

}