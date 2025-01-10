"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative">
      {/* White Background Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 relative">
          {/* Section Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Hisse Senedi Ara
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Binlerce hisse senedi arasında arama yapın ve detaylı analizlere ulaşın
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-6 w-6 text-orange-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-sm"
                placeholder="Hisse senedi ara (örn: THYAO)"
              />
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-md"
              >
                Ara
              </button>
            </div>
          </form>

          {/* Search Tips */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Popüler aramalar:{' '}
              <span className="text-orange-500 font-medium">
                THYAO, GARAN, ASELS, SASA
              </span>
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl" />
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Bottom Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0C240 40 480 60 720 60C960 60 1200 40 1440 0V74H0V0Z"
            fill="#0D0B21"
            fillOpacity="0.2"
          />
          <path
            d="M0 37C240 57 480 67 720 67C960 67 1200 57 1440 37V74H0V37Z"
            fill="#0D0B21"
          />
        </svg>
      </div>
    </section>
  );
} 