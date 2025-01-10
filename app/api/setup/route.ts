import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  // Bu endpoint'i sadece ilk kurulumda kullanın
  const adminExists = await prisma.user.findFirst({
    where: {
      role: "ADMIN",
    },
  });

  if (adminExists) {
    return new NextResponse("Admin zaten mevcut", { status: 400 });
  }

  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    return NextResponse.json({
      message: "Admin başarıyla oluşturuldu",
      email: admin.email,
      password: "admin123",
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Admin oluşturulurken bir hata oluştu", {
      status: 500,
    });
  }
} 