import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatNumber } from "@/lib/utils";

export default async function StockDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const stock = await prisma.stock.findUnique({
    where: { id: params.id },
  });

  if (!stock) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Üst Bilgi Kartı */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {stock.symbol}
              </h1>
              <p className="text-blue-100">{stock.name}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">
                ₺{formatNumber(stock.price)}
              </p>
              <p
                className={`text-lg font-semibold ${
                  stock.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {stock.change > 0 && "+"}
                {stock.change}%
              </p>
            </div>
          </div>
        </div>

        {/* Detay Bilgileri */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Şirket Bilgileri</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm">Sektör</p>
                  <p className="font-medium">{stock.sector}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Açıklama</p>
                  <p className="font-medium">{stock.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 