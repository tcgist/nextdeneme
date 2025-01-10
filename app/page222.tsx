import { prisma } from "@/lib/prisma";
import StockCard from "@/components/StockCard";
import SearchBar from "@/components/SearchBar";
import SectorFilter from "@/components/SectorFilter";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; sector?: string };
}) {
  const query = searchParams.q;
  const sector = searchParams.sector;

  const sectors = await prisma.stock.findMany({
    select: {
      sector: true,
    },
    distinct: ["sector"],
  }).then(results => results.map(r => r.sector).sort());

  const stocks = await prisma.stock.findMany({
    where: {
      AND: [
        query
          ? {
              OR: [
                { symbol: { contains: query, mode: "insensitive" } },
                { name: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
        sector ? { sector } : {},
      ],
    },
    orderBy: {
      symbol: "asc",
    },
  });

  return (
    <div className="min-h-screen bg-[#1E1B33]">
      {/* Hero Section */}
      <HeroSection />

      {/* Feature Cards */}
      <FeatureCards />

      {/* Stocks List Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            {stocks.length} Hisse Senedi
          </h2>
          <SectorFilter sectors={sectors} currentSector={sector} />
        </div>

        {stocks.length === 0 ? (
          <div className="text-center text-gray-400 bg-[#2A2744] rounded-lg shadow p-8">
            {query
              ? "Aramanızla eşleşen hisse senedi bulunamadı."
              : "Henüz hisse senedi eklenmemiş."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stocks.map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 