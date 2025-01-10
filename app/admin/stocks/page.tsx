import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminStockList from "@/components/admin/AdminStockList";
import AdminHeader from "@/components/admin/AdminHeader";

const prisma = new PrismaClient();

export default async function AdminStocksPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/auth/login");
  }

  const stocks = await prisma.stock.findMany({
    orderBy: {
      symbol: "asc",
    },
  });

  return (
    <div>
      <AdminHeader
        title="Hisse Senetleri"
        description="Hisse senetlerini yönetin"
        buttonText="Yeni Hisse Ekle"
        buttonHref="/admin/stocks/new"
      />

      <div className="mt-6">
        <AdminStockList stocks={stocks} />
      </div>
    </div>
  );
} 