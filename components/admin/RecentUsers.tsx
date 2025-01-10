import Link from "next/link";

interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
}

export default function RecentUsers({ users }: { users: User[] }) {
  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Son Kayıt Olan Kullanıcılar
        </h3>
      </div>
      <div className="border-t border-gray-100">
        <ul role="list" className="divide-y divide-gray-100">
          {users.map((user) => (
            <li key={user.id} className="relative px-4 py-4 sm:px-6 hover:bg-gray-50">
              <Link href={`/admin/users/${user.id}`} className="block">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{user.name || "İsimsiz"}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Kayıt: {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 