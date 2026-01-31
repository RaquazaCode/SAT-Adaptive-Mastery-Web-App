import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Logo className="w-8 h-8" iconClassName="text-xl" />
              <span className="font-serif text-2xl font-bold text-[var(--color-primary)]">
                SAT Mastery
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Adaptive SAT preparation that models the real test structure and tracks skills at the question-type level.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[var(--color-primary)] transition-colors">

                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[var(--color-primary)] transition-colors">

                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[var(--color-primary)] transition-colors">

                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[var(--color-primary)] transition-colors">

                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg text-[var(--color-text-dark)] mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">

                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">

                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#practice"
                  className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">

                  Practice Tests
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">

                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[var(--color-primary)] transition-colors">

                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg text-[var(--color-text-dark)] mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                <span>
                  123 Education Lane, Suite 100
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                <span>hello@satmastery.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg text-[var(--color-text-dark)] mb-6">
              Newsletter
            </h4>
            <p className="text-gray-600 mb-4">
              Get Daily SAT Prep Questions for FREE ! (answers + explanations included) 📲
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent" />

              <button className="w-full bg-[var(--color-primary)] text-white font-bold py-3 rounded-lg hover:bg-[#2d4434] transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 SAT Mastery. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-[var(--color-primary)]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[var(--color-primary)]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>);

}