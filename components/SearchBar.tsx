"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchResult {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchStocks = async () => {
      if (debouncedQuery.length < 2) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/stocks/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (!res.ok) throw new Error('Arama hatası');
        const data = await res.json();
        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.error("Arama hatası:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchStocks();
  }, [debouncedQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      const exactMatch = results.find(
        stock => stock.symbol.toLowerCase() === query.toLowerCase()
      );
      if (exactMatch) {
        router.push(`/stocks/${exactMatch.id}`);
      } else {
        router.push(`/?q=${encodeURIComponent(query)}`);
      }
      setShowResults(false);
    }
  };

  return (
    <section id="search-section" className="relative">
      {/* White Background Section */}
      <div className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 relative">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-1.5 text-sm text-orange-600 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Yapay Zeka Destekli Analiz
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
              Hisse Senetlerini{' '}
              <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                Akıllı Analiz
              </span>{' '}
              ile Keşfet
            </h2>

            <div className="space-y-6 max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed">
                İlgini çeken hisse senetlerini ara, FinansGPT senin için binlerce veriyi analiz etsin.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-orange-50 to-purple-50 p-6 rounded-2xl border border-orange-100/50">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-orange-100 rounded-lg p-2">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Kıyaslamalı Analiz</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        FinansGPT geçmiş fiyat hareketleri ile verilerin eşleştirilmesi ile kıyaslamalı analiz yöntemleri ile eğitilmiştir.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-orange-50 p-6 rounded-2xl border border-purple-100/50">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-purple-100 rounded-lg p-2">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Gelişmiş AI Teknolojisi</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Ayrıca FinansGPT "CoT" gibi en ileri yapay zeka düşünce zinciri tekniklerini kullanarak analizlerini gerçekleştirir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Form */}
          <div ref={searchRef} className="relative z-10 max-w-2xl mx-auto">
            {/* Gradient Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
            
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative group">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-3.5 h-6 w-6 text-orange-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => debouncedQuery.length >= 2 && setShowResults(true)}
                  placeholder="Hisse senedi ara (örn: THYAO)"
                  className="h-14 w-full rounded-2xl border-2 border-gray-200 pl-12 pr-4 text-gray-900 placeholder:text-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white shadow-sm relative z-10 transition-all"
                />
                {isLoading && (
                  <div className="absolute right-4 top-4">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-500/20 border-t-orange-500" />
                  </div>
                )}
              </div>

              {/* Arama Sonuçları */}
              {showResults && results.length > 0 && (
                <div className="absolute mt-2 w-full rounded-2xl bg-white py-3 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl z-50">
                  {/* Results Header */}
                  <div className="px-4 pb-2 mb-2 border-b border-gray-100">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{results.length}</span> sonuç bulundu
                    </p>
                  </div>

                  <ul className="max-h-72 overflow-y-auto">
                    {results.map((stock) => (
                      <li key={stock.id}>
                        <button
                          type="button"
                          onClick={() => {
                            router.push(`/stocks/${stock.id}`);
                            setShowResults(false);
                            setQuery(stock.symbol);
                          }}
                          className="flex w-full items-center px-4 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50 transition-all group"
                        >
                          {/* Sol Taraf - Sembol ve İsim */}
                          <div className="flex-1">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                  {stock.symbol}
                                </span>
                                <span className="px-2 py-0.5 text-xs bg-orange-100 text-orange-600 rounded-full">
                                  BIST
                                </span>
                              </div>
                              <span className="text-sm text-gray-500 mt-0.5">{stock.name}</span>
                            </div>
                          </div>

                          {/* Sağ Taraf - Fiyat ve Değişim */}
                          <div className="text-right">
                            <div className="font-medium text-gray-900">
                              {stock.price.toFixed(2)} ₺
                            </div>
                            <div
                              className={`flex items-center justify-end gap-1 text-sm ${
                                stock.change >= 0 
                                  ? "text-green-600" 
                                  : "text-red-600"
                              }`}
                            >
                              {stock.change >= 0 ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                                </svg>
                              )}
                              <span className="font-medium">
                                {stock.change >= 0 ? "+" : ""}
                                {stock.change.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Results Footer */}
                  <div className="px-4 pt-2 mt-2 border-t border-gray-100">
                    <p className="text-xs text-center text-gray-500">
                      Daha fazla sonuç için aramaya devam edin
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Popular Searches */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Popüler aramalar:{' '}
              {['THYAO', 'GARAN', 'ASELS', 'SASA'].map((symbol, index) => (
                <span key={symbol}>
                  <button 
                    onClick={() => setQuery(symbol)}
                    className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
                  >
                    {symbol}
                  </button>
                  {index < 3 && <span className="text-gray-400 mx-1">•</span>}
                </span>
              ))}
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
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