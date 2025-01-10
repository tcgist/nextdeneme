"use client"

import { FC, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import Image from 'next/image';

export default function HeroSection() {
  const scrollToSearch = () => {
    const searchElement = document.getElementById('search-section');
    if (searchElement) {
      const searchBarHeight = searchElement.offsetHeight;
      const elementPosition = searchElement.getBoundingClientRect().top + window.pageYOffset;
      const viewportHeight = window.innerHeight;
      
      const offsetPosition = elementPosition - (viewportHeight - searchBarHeight) / 2;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const searchElement = document.getElementById('search-section');
        if (searchElement && searchElement.getBoundingClientRect().top < 0) {
          scrollToSearch();
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative pt-20 pb-32 px-4 overflow-hidden min-h-screen flex items-center">
      {/* Grid Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(79, 70, 229, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(79, 70, 229, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto w-full">
        {/* Top Badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#1E1B33] rounded-full px-4 py-1.5 text-sm text-gray-300">
            <FaDownload className="text-orange-500 w-4 h-4" />
            FinansGPT v2.0 şimdi kullanıma hazır →
          </div>
        </div>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* AI Face Container - Sol taraf */}
          <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] flex-shrink-0">
            {/* Circular Frame */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/30 to-purple-600/30 p-1">
              <div className="w-full h-full rounded-full bg-[#1E1B33] p-4">
                {/* AI Face Image */}
                <div className="relative w-full h-full">
                  <Image
                    src="/ai-face.png"
                    alt="AI Face"
                    fill
                    className="object-cover rounded-full"
                  />
                  {/* Glowing Effects */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-orange-500/20 mix-blend-overlay" />
                </div>
              </div>
            </div>

            {/* Orbital Rings */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="absolute inset-0 rounded-full border border-orange-500/30 -rotate-45" />
              <div className="absolute inset-0 rounded-full border border-purple-500/30 rotate-45" />
            </div>

            {/* Floating Particles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-orange-500 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: Math.random() * 0.7 + 0.3
                }}
              />
            ))}
          </div>

          {/* Text Content - Sağ taraf */}
          <div className="text-center lg:text-left max-w-xl relative">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-orange-600/20 blur-3xl rounded-full" />
            <div className="absolute -inset-4 bg-purple-600/20 blur-3xl rounded-full translate-x-4" />
            
            {/* Başlık */}
            <h1 className="relative text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                Finans Uzmanı Yapay Zeka ile{' '}
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-purple-600 bg-clip-text text-transparent">
                 Kazancını Artır
              </span>
            </h1>
            
            <div className="relative">
              <p className="text-gray-400 text-lg mb-8">
                Yapay zeka destekli analizler ve önerilerle yatırımlarınızı optimize edin.
                Piyasa trendlerini önceden tahmin edin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={scrollToSearch}
                  className="bg-gradient-to-r from-orange-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Hemen Başla
                </button>
                <button className="border border-orange-500/20 hover:border-orange-500/40 text-white px-8 py-3 rounded-lg font-medium transition-all">
                  Daha Fazla Bilgi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 