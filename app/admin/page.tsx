import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardStats from "@/components/admin/DashboardStats";
import RecentStocks from "@/components/admin/RecentStocks";
import RecentUsers from "@/components/admin/RecentUsers";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/auth/login");
  }

  const [totalStocks, totalUsers, recentStocks, recentUsers] = await Promise.all([
    prisma.stock.count(),
    prisma.user.count(),
    prisma.stock.findMany({
      take: 5,
      orderBy: {
        updatedAt: "desc",
      },
    }),
    prisma.user.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    }),
  ]);

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        description="Sistem genel durumu ve istatistikler"
      />

      <div className="mt-6">
        <DashboardStats
          stats={[
            { name: "Toplam Hisse", value: totalStocks },
            { name: "Toplam Kullanıcı", value: totalUsers },
          ]}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <RecentStocks stocks={recentStocks} />
        <RecentUsers users={recentUsers} />
      </div>
    </div>
  );
} 