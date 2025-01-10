"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  CalendarIcon,
  KeyIcon,
  BellIcon,
  CreditCardIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0D0B21] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const menuItems = [
    {
      title: "Hesap Bilgileri",
      description: "Kişisel bilgilerinizi görüntüleyin ve güncelleyin",
      icon: <UserCircleIcon className="w-8 h-8" />,
      gradient: "from-orange-500 to-purple-600",
      stats: [
        { label: "Ad Soyad", value: session.user?.name || "Belirtilmemiş" },
        { label: "E-posta", value: session.user?.email || "Belirtilmemiş" },
      ]
    },
    {
      title: "Abonelik",
      description: "Abonelik planınızı ve fatura bilgilerinizi yönetin",
      icon: <CreditCardIcon className="w-8 h-8" />,
      gradient: "from-blue-500 to-purple-500",
      stats: [
        { label: "Plan", value: "Pro" },
        { label: "Durum", value: "Aktif" },
      ]
    },
    {
      title: "Bildirim Ayarları",
      description: "Bildirim tercihlerinizi özelleştirin",
      icon: <BellIcon className="w-8 h-8" />,
      gradient: "from-green-500 to-emerald-500",
      stats: [
        { label: "E-posta", value: "Açık" },
        { label: "Push", value: "Kapalı" },
      ]
    },
    {
      title: "Güvenlik",
      description: "Güvenlik ayarlarınızı yönetin",
      icon: <KeyIcon className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
      stats: [
        { label: "2FA", value: "Aktif" },
        { label: "Son Giriş", value: "2 saat önce" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="py-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(79, 70, 229, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(79, 70, 229, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-1.5 text-orange-600 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Profil Bilgileri
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Hesap{' '}
              <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                Yönetimi
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {session.user?.email}
            </p>
          </div>

          {/* Profile Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {menuItems.map((item) => (
              <div key={item.title} className="group relative">
                {/* Card Glow Effect */}
                <div className={`absolute -inset-0.5 rounded-xl bg-gradient-to-r ${item.gradient} opacity-[0.08] group-hover:opacity-[0.12] transition duration-500`} />

                {/* Card Content */}
                <div className="relative flex flex-col h-full bg-white border border-gray-200 rounded-xl p-6 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.08)]">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-r ${item.gradient} p-3`}>
                      <div className="w-full h-full text-white">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                      {item.stats.map((stat, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                          <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
                          <div className="text-gray-900 font-medium">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => signOut()}
              className="group relative"
            >
              <span className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></span>
              <span className="relative bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-all block">
                <div className="flex items-center gap-2">
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  <span>Çıkış Yap</span>
                </div>
              </span>
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-orange-100/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-100/40 rounded-full blur-[100px] pointer-events-none" />
      </div>
    </div>
  );
} 