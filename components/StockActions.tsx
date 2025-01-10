"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  stockId: string;
}

export default function StockActions({ stockId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Bu hisseyi silmek istediğinizden emin misiniz?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/stocks/${stockId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Hisse silinirken bir hata oluştu");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Hisse silinirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-t pt-6 mt-6">
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => router.push(`/admin/stocks/edit/${stockId}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Düzenle
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 disabled:opacity-50"
        >
          {loading ? "Siliniyor..." : "Sil"}
        </button>
      </div>
    </div>
  );
} 