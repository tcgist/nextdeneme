"use client";

import { useSettings } from "@/contexts/SettingsContext";

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} {settings.SITE_NAME}. Tüm hakları saklıdır.
          </p>
          {settings.CONTACT_EMAIL && (
            <p className="text-center text-sm text-gray-400 mt-2">
              İletişim: {settings.CONTACT_EMAIL}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
} 