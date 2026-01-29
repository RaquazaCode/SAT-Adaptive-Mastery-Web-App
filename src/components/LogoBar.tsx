import React from 'react';
export function LogoBar() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex items-center gap-4 min-w-fit">
            <span className="text-gray-500 font-medium">
              Trusted by 5000+
              <br />
              Companies worldwide
            </span>
            <div className="h-px w-16 bg-gray-300"></div>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-between w-full gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder Logos */}
            <div className="flex items-center gap-2 font-bold text-xl text-gray-700">
              <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
              Logoipsum
            </div>
            <div className="flex items-center gap-2 font-bold text-xl text-gray-700">
              <div className="w-8 h-8 bg-gray-800 rounded-tr-xl"></div>
              Logoipsum
            </div>
            <div className="flex items-center gap-2 font-bold text-xl text-gray-700">
              <div className="w-8 h-8 bg-gray-800 rounded-bl-xl"></div>
              Logoipsum
            </div>
            <div className="flex items-center gap-2 font-bold text-xl text-gray-700">
              <div className="w-8 h-8 bg-gray-800 rounded-full border-4 border-white ring-2 ring-gray-800"></div>
              Logoipsum
            </div>
          </div>
        </div>
      </div>
    </section>);

}