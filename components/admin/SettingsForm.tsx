"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  settings: {
    [key: string]: string;
  };
}

const SETTINGS = [
  {
    key: "SITE_NAME",
    label: "Site Adı",
    type: "text",
    placeholder: "Borsa Takip",
  },
  {
    key: "SITE_DESCRIPTION",
    label: "Site Açıklaması",
    type: "textarea",
    placeholder: "Hisse senedi takip ve analiz platformu",
  },
  {
    key: "CONTACT_EMAIL",
    label: "İletişim Email",
    type: "email",
    placeholder: "info@example.com",
  },
  {
    key: "MAINTENANCE_MODE",
    label: "Bakım Modu",
    type: "select",
    options: [
      { value: "false", label: "Kapalı" },
      { value: "true", label: "Açık" },
    ],
  },
];

export default function SettingsForm({ settings }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Ayarlar kaydedilirken bir hata oluştu");

      router.refresh();
      alert("Ayarlar başarıyla kaydedildi");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {SETTINGS.map((setting) => (
                <div key={setting.key} className="sm:col-span-4">
                  <label
                    htmlFor={setting.key}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {setting.label}
                  </label>
                  <div className="mt-2">
                    {setting.type === "textarea" ? (
                      <textarea
                        id={setting.key}
                        name={setting.key}
                        rows={3}
                        defaultValue={settings[setting.key] || ""}
                        placeholder={setting.placeholder}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    ) : setting.type === "select" ? (
                      <select
                        id={setting.key}
                        name={setting.key}
                        defaultValue={settings[setting.key] || ""}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      >
                        {setting.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={setting.type}
                        id={setting.key}
                        name={setting.key}
                        defaultValue={settings[setting.key] || ""}
                        placeholder={setting.placeholder}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
            >
              {loading ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
} 