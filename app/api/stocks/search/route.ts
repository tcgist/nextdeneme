import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { applyRateLimit } from "@/lib/rateLimit";

export async function GET(request: NextRequest) {
  try {
    await applyRateLimit(request);

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.length < 3) {
      return NextResponse.json([]);
    }

    const searchTerm = query.toLowerCase();

    const stocks = await prisma.stock.findMany({
      where: {
        OR: [
          {
            symbol: {
              contains: searchTerm,
            },
          },
          {
            name: {
              contains: searchTerm,
            },
          },
        ],
      },
      take: 5, // En fazla 5 sonuç göster
      select: {
        id: true,
        symbol: true,
        name: true,
      },
      orderBy: {
        symbol: 'asc',
      },
    });

    // Sonuçları döndürmeden önce symbol'ü büyük harfe çevirelim
    const formattedStocks = stocks.map(stock => ({
      ...stock,
      symbol: stock.symbol.toUpperCase()
    }));

    return NextResponse.json(formattedStocks);
  } catch (error) {
    console.error(error);
    if (error instanceof Error && error.message === "Rate limit exceeded") {
      return new NextResponse("Too many requests", { status: 429 });
    }
    return new NextResponse("Arama yapılırken bir hata oluştu", { status: 500 });
  }
} 