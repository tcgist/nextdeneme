import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import StockForm from "@/components/admin/StockForm";

export default async function EditStockPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/auth/login");
  }

  const stock = await prisma.stock.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      symbol: true,
      name: true,
      description: true,
      sector: true,
      price: true,
      change: true,
    },
  });

  if (!stock) {
    notFound();
  }

  return (
    <div>
      <AdminHeader
        title="Hisse Düzenle"
        description={`${stock.symbol} hissesini düzenleyin`}
      />
      <div className="mt-6">
        <StockForm initialData={stock} />
      </div>
    </div>
  );
} 