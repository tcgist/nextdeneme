"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  updatedAt: Date;
}

export default function AdminStockList({ stocks }: { stocks: Stock[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete(id: string) {
    if (!confirm("Bu hisseyi silmek istediğinizden emin misiniz?")) return;

    setLoading(true);
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
      setLoading(false);
    }
  }

  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              Sembol
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              İsim
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Sektör
            </th>
            <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
              Fiyat
            </th>
            <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
              Değişim
            </th>
            <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
              Son Güncelleme
            </th>
            <th className="relative py-3.5 pl-3 pr-4">
              <span className="sr-only">İşlemler</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                {stock.symbol}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {stock.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {stock.sector}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">
                {stock.price.toFixed(2)} ₺
              </td>
              <td
                className={`whitespace-nowrap px-3 py-4 text-sm text-right ${
                  stock.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.change >= 0 ? "+" : ""}
                {stock.change.toFixed(2)}%
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                {new Date(stock.updatedAt).toLocaleDateString("tr-TR")}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <Link
                    href={`/admin/stocks/edit/${stock.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(stock.id)}
                    disabled={loading}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 