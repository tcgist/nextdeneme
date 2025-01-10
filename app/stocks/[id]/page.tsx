import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import FinancialInsights from "@/components/FinancialInsights";

export default async function StockPage({ params }: { params: { id: string } }) {
  const stock = await prisma.stock.findUnique({
    where: { id: params.id },
  });

  if (!stock) {
    notFound();
  }

  // Sayısal değerler için güvenli formatlama fonksiyonları
  const formatNumber = (num: number | null | undefined) => {
    if (num === null || num === undefined) return "N/A";
    return num.toLocaleString('tr-TR');
  };

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return "N/A";
    return `${price.toFixed(2)} ₺`;
  };

  const formatPercentage = (percent: number | null | undefined) => {
    if (percent === null || percent === undefined) return "N/A";
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-[#0D0B21]">
      {/* Header Section */}
      <div className="bg-[#0D0B21] relative overflow-hidden">
        {/* Grid Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(79, 70, 229, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(79, 70, 229, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }}
        />

        {/* Background Glow Effects */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Sol Taraf - Hisse Bilgileri */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 text-sm bg-orange-500/10 text-orange-500 rounded-full font-medium">
                  BIST
                </span>
                <span className="px-3 py-1 text-sm bg-purple-500/10 text-purple-500 rounded-full font-medium">
                  {stock.sector || 'Sektör bilgisi yok'}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-4">
                <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                  {stock.symbol}
                </span>
                <span className="text-2xl text-gray-300 font-normal">
                  {stock.name}
                </span>
              </h1>

              <div className="flex items-center gap-8 mt-8">
                <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                  <p className="text-sm text-gray-300 mb-1">Güncel Fiyat</p>
                  <p className="text-3xl font-bold text-white">
                    {formatPrice(stock.price)}
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                  <p className="text-sm text-gray-300 mb-1">Değişim</p>
                  <div className={`flex items-center gap-2 text-3xl font-bold
                    ${(stock.change || 0) >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {(stock.change || 0) >= 0 ? (
                      <ArrowTrendingUpIcon className="w-7 h-7" />
                    ) : (
                      <ArrowTrendingDownIcon className="w-7 h-7" />
                    )}
                    {formatPercentage(stock.change)}
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Taraf - İstatistikler */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                <ChartBarIcon className="w-6 h-6 text-orange-500 mb-2" />
                <p className="text-sm text-gray-300 mb-1">Hacim</p>
                <p className="text-lg font-semibold text-white">
                  {formatNumber(stock.volume)} ₺
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                <BuildingOfficeIcon className="w-6 h-6 text-purple-500 mb-2" />
                <p className="text-sm text-gray-300 mb-1">Piyasa Değeri</p>
                <p className="text-lg font-semibold text-white">
                  {formatNumber(stock.marketCap)} ₺
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                <GlobeAltIcon className="w-6 h-6 text-blue-500 mb-2" />
                <p className="text-sm text-gray-300 mb-1">Lot Büyüklüğü</p>
                <p className="text-lg font-semibold text-white">
                  {formatNumber(stock.lotSize)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0C240 40 480 60 720 60C960 60 1200 40 1440 0V74H0V0Z"
              fill="white"
              fillOpacity="1"
            />
          </svg>
        </div>
      </div>

      {/* Finansal Görünüm - Header'ın hemen altında */}
      <FinancialInsights />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Sol Taraf - Açıklama */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <BuildingOfficeIcon className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-white">
                Şirket Hakkında
              </h2>
            </div>
            <div className="prose prose-invert max-w-none text-gray-300">
              {stock.description || "Şirket açıklaması bulunmuyor."}
            </div>
          </div>

          {/* Sağ Taraf - Teknik Bilgiler */}
          <div className="space-y-12">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <ChartBarIcon className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-semibold text-white">
                  Teknik Göstergeler
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <p className="text-sm text-gray-300 mb-1">52 Hafta Düşük</p>
                  <p className="text-lg font-medium text-white">
                    {formatPrice(stock.low52w)}
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <p className="text-sm text-gray-300 mb-1">52 Hafta Yüksek</p>
                  <p className="text-lg font-medium text-white">
                    {formatPrice(stock.high52w)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-purple-500/10 rounded-2xl p-8 border border-orange-500/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h2 className="text-xl font-semibold text-white">
                  AI Analizi
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {stock.aiAnalysis || "AI analizi henüz hazır değil."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 