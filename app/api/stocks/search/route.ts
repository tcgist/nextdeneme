import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const searchTerm = query.toUpperCase();
    const stocks = await prisma.stock.findMany({
      where: {
        OR: [
          { symbol: { contains: searchTerm } },
          { name: { contains: searchTerm } },
        ],
      },
      select: {
        id: true,
        symbol: true,
        name: true,
        price: true,
        change: true,
      },
      take: 10,
      orderBy: {
        symbol: 'asc',
      },
    });

    return NextResponse.json(stocks);
  } catch (error) {
    console.error("Arama hatası:", error);
    return NextResponse.json({ error: "Arama yapılırken bir hata oluştu" }, { status: 500 });
  }
} 