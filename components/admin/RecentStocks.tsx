import Link from "next/link";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  updatedAt: Date;
}

export default function RecentStocks({ stocks }: { stocks: Stock[] }) {
  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Son Güncellenen Hisseler
        </h3>
      </div>
      <div className="border-t border-gray-100">
        <ul role="list" className="divide-y divide-gray-100">
          {stocks.map((stock) => (
            <li key={stock.id} className="relative px-4 py-4 sm:px-6 hover:bg-gray-50">
              <Link href={`/admin/stocks/edit/${stock.id}`} className="block">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{stock.symbol}</p>
                    <p className="text-sm text-gray-500">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {stock.price.toFixed(2)} ₺
                    </p>
                    <div
                      className={`flex items-center justify-end text-sm ${
                        stock.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stock.change >= 0 ? (
                        <ArrowUpIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4" />
                      )}
                      <span className="ml-1">
                        {stock.change >= 0 && "+"}
                        {stock.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Son güncelleme:{" "}
                  {new Date(stock.updatedAt).toLocaleDateString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 