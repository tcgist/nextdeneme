import { Raleway } from 'next/font/google';
import "./globals.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "@/components/SessionProvider";
import { SettingsProvider } from "@/contexts/SettingsContext";
import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";

const raleway = Raleway({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
});
const prisma = new PrismaClient();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const settings = await prisma.setting.findMany();
  const settingsMap = Object.fromEntries(
    settings.map((s: { key: string; value: string }) => [s.key, s.value])
  );

  return (
    <html lang="tr" className={`${raleway.variable}`}>
      <head>
        <title>{settingsMap.SITE_NAME || "Borsa Takip"}</title>
        <meta
          name="description"
          content={settingsMap.SITE_DESCRIPTION || "Hisse senedi takip ve analiz platformu"}
        />
      </head>
      <body className={`${raleway.className} h-full`}>
        <SessionProvider session={session}>
          <SettingsProvider initialSettings={settingsMap}>
            <div className="min-h-full">
              <Navbar />
              {settingsMap.MAINTENANCE_MODE === "true" ? (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      Bakım Modu
                    </h1>
                    <p className="text-gray-600">
                      Sitemiz şu anda bakımda. Lütfen daha sonra tekrar deneyin.
                    </p>
                  </div>
                </div>
              ) : (
                <main>{children}</main>
              )}
            </div>
          </SettingsProvider>
        </SessionProvider>
      </body>
    </html>
  );
} 