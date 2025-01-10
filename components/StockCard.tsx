"use client";

import Link from "next/link";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  sector: string;
}

export default function StockCard({ stock }: { stock: Stock }) {
  const isPositive = stock.change >= 0;

  return (
    <Link
      href={`/stocks/${stock.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{stock.symbol}</h3>
            <p className="text-sm text-gray-500">{stock.name}</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {stock.sector}
          </span>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {stock.price.toFixed(2)} ₺
            </p>
          </div>
          <div
            className={`flex items-center ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
            <span className="ml-1 text-sm font-semibold">
              {isPositive && "+"}
              {stock.change.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 