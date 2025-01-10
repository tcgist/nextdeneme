import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { applyRateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    await applyRateLimit(request);
    
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Yetkisiz erişim", { status: 401 });
    }

    const body = await request.json();
    const stock = await prisma.stock.create({
      data: body,
    });

    return NextResponse.json(stock);
  } catch (error) {
    console.error(error);
    if (error instanceof Error && error.message === "Rate limit exceeded") {
      return new NextResponse("Too many requests", { status: 429 });
    }
    return new NextResponse("Hisse eklenirken bir hata oluştu", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await applyRateLimit(request);

    const stocks = await prisma.stock.findMany({
      orderBy: {
        symbol: "asc",
      },
    });

    return NextResponse.json(stocks);
  } catch (error) {
    console.error(error);
    if (error instanceof Error && error.message === "Rate limit exceeded") {
      return new NextResponse("Too many requests", { status: 429 });
    }
    return new NextResponse("Hisseler getirilirken bir hata oluştu", { status: 500 });
  }
} 