import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import UserList from "@/components/admin/UserList";

const prisma = new PrismaClient();

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/auth/login");
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      emailVerified: true,
      _count: {
        select: {
          accounts: true,
        },
      },
    },
  });

  return (
    <div>
      <AdminHeader
        title="Kullanıcılar"
        description="Kullanıcıları yönetin"
      />
      <div className="mt-6">
        <UserList users={users} />
      </div>
    </div>
  );
} 