"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      setError("Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0B21] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Grid Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(79, 70, 229, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(79, 70, 229, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />

      <div className="max-w-md w-full relative">
        {/* Background Glow Effects */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl opacity-50" />

        {/* Form Container */}
        <div className="relative bg-[#1E1B33]/80 backdrop-blur-xl border border-orange-500/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              Hoş Geldiniz
            </h2>
            <p className="mt-2 text-gray-400">
              Hesabınıza giriş yapın
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-orange-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 bg-[#2A2744] border border-orange-500/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-orange-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 bg-[#2A2744] border border-orange-500/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-orange-500/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1E1B33] text-gray-400">
                veya
              </span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 bg-[#2A2744] hover:bg-[#2A2744]/80 text-white px-4 py-3 rounded-lg border border-orange-500/10 hover:border-orange-500/30 transition-colors"
          >
            <img src="/google1.svg" alt="Google" className="w-5 h-5" />
            Google ile devam et
          </button>

          <p className="mt-8 text-center text-sm text-gray-400">
            Hesabınız yok mu?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-orange-500 hover:text-orange-400 transition-colors"
            >
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 