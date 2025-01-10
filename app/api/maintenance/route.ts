import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const maintenanceMode = await prisma.setting.findUnique({
      where: { key: "MAINTENANCE_MODE" },
    });

    return NextResponse.json({ 
      maintenance: maintenanceMode?.value === "true" 
    });
  } catch (error) {
    console.error("Maintenance check error:", error);
    return NextResponse.json({ maintenance: false });
  }
} 