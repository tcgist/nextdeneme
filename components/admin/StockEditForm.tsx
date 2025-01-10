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
  stock: Stock;
}

export default function StockEditForm({ stock }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      symbol: formData.get("symbol"),
      name: formData.get("name"),
      description: formData.get("description"),
      sector: formData.get("sector"),
      price: parseFloat(formData.get("price") as string),
      change: parseFloat(formData.get("change") as string),
    };

    try {
      const res = await fetch(`/api/stocks/${stock.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Hisse güncellenirken bir hata oluştu");

      router.push("/admin/stocks");
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Sembol</label>
          <input
            type="text"
            name="symbol"
            defaultValue={stock.symbol}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">İsim</label>
          <input
            type="text"
            name="name"
            defaultValue={stock.name}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Açıklama</label>
          <textarea
            name="description"
            defaultValue={stock.description}
            required
            className="w-full border rounded p-2"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sektör</label>
          <input
            type="text"
            name="sector"
            defaultValue={stock.sector}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fiyat</label>
          <input
            type="number"
            name="price"
            step="0.01"
            defaultValue={stock.price}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Değişim (%)</label>
          <input
            type="number"
            name="change"
            step="0.01"
            defaultValue={stock.change}
            required
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Güncelleniyor..." : "Güncelle"}
        </button>
      </div>
    </form>
  );
} 