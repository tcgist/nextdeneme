import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth.config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return new NextResponse("Yetkisiz erişim", { status: 401 });
  }

  try {
    const body = await request.json();
    const { role } = body;

    if (!role || !["USER", "ADMIN"].includes(role)) {
      return new NextResponse("Geçersiz rol", { status: 400 });
    }

    const user = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        role,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return new NextResponse("Kullanıcı güncellenirken bir hata oluştu", {
      status: 500,
    });
  }
} 