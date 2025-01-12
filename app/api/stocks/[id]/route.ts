import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth.config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return new NextResponse("Yetkisiz erişim", { status: 401 });
  }

  try {
    const body = await request.json();
    const stock = await prisma.stock.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json(stock);
  } catch (error) {
    console.error(error);
    return new NextResponse("Hisse güncellenirken bir hata oluştu", { status: 500 });
  }
} 