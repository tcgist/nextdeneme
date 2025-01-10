"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Stock {
  id: string;
  symbol: string;
  name: string;
  description: string;
  sector: string;
  price: number;
  change: number;
}

interface Props {
  stocks: Stock[];
}

export default function StockList({ stocks }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Bu hisseyi silmek istediğinizden emin misiniz?")) return;

    setLoading(id);
    try {
      const res = await fetch(`/api/stocks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Hisse silinirken bir hata oluştu");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Hisse silinirken bir hata oluştu");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sembol
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              İsim
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sektör
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fiyat
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Değişim
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {stock.symbol}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {stock.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {stock.sector}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {stock.price.toFixed(2)} ₺
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`${
                    stock.change >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => handleDelete(stock.id)}
                  disabled={loading === stock.id}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50"
                >
                  {loading === stock.id ? "Siliniyor..." : "Sil"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 