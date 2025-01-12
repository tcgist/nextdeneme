"use client";

import { useRef, useState, useEffect } from 'react';
import { useDebounceValue } from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';

export default function StockSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounceValue(query, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length > 1) {
        try {
          const res = await fetch(`/api/stocks/search?q=${debouncedQuery}`);
          const data = await res.json();
          setResults(data);
          setShowResults(true);
        } catch (error) {
          console.error('Arama hatası:', error);
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
    setQuery('');
  };

  return (
    <div ref={searchRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Hisse senedi ara..."
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          {results.map((stock) => (
            <div
              key={stock.id}
              onClick={() => handleSelect(stock.id)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
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