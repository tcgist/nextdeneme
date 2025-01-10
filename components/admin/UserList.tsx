"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  emailVerified: Date | null;
  createdAt: Date;
  _count: {
    accounts: number;
  };
}

export default function UserList({ users }: { users: User[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRoleChange(userId: string, newRole: string) {
    if (!confirm(`Kullanıcı rolünü "${newRole}" olarak değiştirmek istediğinizden emin misiniz?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Rol güncellenirken bir hata oluştu");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Rol güncellenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              Kullanıcı
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Email
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Rol
            </th>
            <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
              Email Doğrulandı
            </th>
            <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
              Sosyal Hesaplar
            </th>
            <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
              Kayıt Tarihi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      {user.name || "İsimsiz"}
                    </div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {user.email}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  disabled={loading}
                  className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value="USER">Kullanıcı</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                {user.emailVerified ? (
                  <ShieldCheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                {user._count.accounts}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">
                {new Date(user.createdAt).toLocaleDateString("tr-TR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 