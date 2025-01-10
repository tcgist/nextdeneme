import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Yetkisiz erişim", { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, currentPassword, newPassword } = body;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return new NextResponse("Kullanıcı bulunamadı", { status: 404 });
    }

    if (currentPassword) {
      if (!user.password) {
        return new NextResponse("Mevcut şifre bulunamadı", { status: 400 });
      }

      const isCorrectPassword = await bcrypt.compare(currentPassword, user.password);

      if (!isCorrectPassword) {
        return new NextResponse("Mevcut şifre hatalı", { status: 400 });
      }
    }

    const updateData: any = { name };

    if (newPassword) {
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return new NextResponse("Profil güncellenirken bir hata oluştu", { status: 500 });
  }
} 