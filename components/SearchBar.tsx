"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounceValue } from "@/hooks/useDebounce";

interface Stock {
  id: string;
  symbol: string;
  name: string;
}

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Stock[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounceValue(query, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length >= 3) {
        try {
          const res = await fetch(`/api/stocks/search?q=${debouncedQuery}`);
          const data = await res.json();
          setResults(data);
          setShowResults(true);
        } catch (error) {
          console.error("Arama hatası:", error);
          setResults([]);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleSelect = (stockId: string) => {
    router.push(`/stocks/${stockId}`);
    setShowResults(false);
    setQuery("");
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Hisse senedi ara..."
          className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {results.map((stock) => (
            <div
              key={stock.id}
              onClick={() => handleSelect(stock.id)}
              className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
            >
              <div className="font-medium">{stock.symbol}</div>
              <div className="text-sm text-gray-600">{stock.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 