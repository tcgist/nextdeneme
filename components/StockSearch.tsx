"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "@/hooks/useDebounce";

interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export default function StockSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
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
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/stocks/search?q=${debouncedQuery}`);
        const data = await res.json();
        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.error("Arama hatası:", error);
      } finally {
        setIsLoading(false);
      }
    };

    searchStocks();
  }, [debouncedQuery]);

  return (
    <div ref={searchRef} className="relative w-full max-w-xl">
      <div className="relative">
        <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Hisse senedi ara (örn: THYAO)"
          className="h-12 w-full rounded-full border-0 pl-11 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
        />
        {isLoading && (
          <div className="absolute right-4 top-3.5">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          </div>
        )}
      </div>

      {/* Sonuçlar */}
      {showResults && results.length > 0 && (
        <div className="absolute mt-2 w-full rounded-xl bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="max-h-72 overflow-y-auto">
            {results.map((stock) => (
              <li key={stock.id}>
                <button
                  onClick={() => {
                    router.push(`/stocks/${stock.symbol.toLowerCase()}`);
                    setShowResults(false);
                  }}
                  className="flex w-full items-center px-4 py-2 hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{stock.symbol}</span>
                      <span className="ml-2 text-sm text-gray-500">{stock.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {stock.price.toFixed(2)} ₺
                    </div>
                    <div
                      className={`text-sm ${
                        stock.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change.toFixed(2)}%
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 