import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import SettingsForm from "@/components/admin/SettingsForm";

const prisma = new PrismaClient();

interface Setting {
  key: string;
  value: string;
}

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/auth/login");
  }

  const settings = await prisma.setting.findMany();
  const settingsMap = Object.fromEntries(
    settings.map((s: Setting) => [s.key, s.value])
  );

  return (
    <div>
      <AdminHeader
        title="Ayarlar"
        description="Site ayarlarını yapılandırın"
      />
      <div className="mt-6">
        <SettingsForm settings={settingsMap} />
      </div>
    </div>
  );
} 