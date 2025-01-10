import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function MaintenancePage() {
  const siteName = await prisma.setting.findUnique({
    where: { key: "SITE_NAME" },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {siteName?.value || "Sitemiz"} Bakımda
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Daha iyi hizmet verebilmek için sistemimizde bakım çalışması yapıyoruz.
          Lütfen daha sonra tekrar deneyin.
        </p>
      </div>
    </div>
  );
} 