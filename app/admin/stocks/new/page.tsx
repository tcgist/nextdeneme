import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminHeader from "@/components/admin/AdminHeader";
import StockForm from "@/components/admin/StockForm";

export default async function NewStockPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/auth/login");
  }

  return (
    <div>
      <AdminHeader
        title="Yeni Hisse Ekle"
        description="Yeni bir hisse senedi ekleyin"
      />
      <div className="mt-6">
        <StockForm />
      </div>
    </div>
  );
} 