"use client";

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await signIn('credentials', {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        redirect: false,
      });

      if (res?.error) {
        setError('Geçersiz kimlik bilgileri');
      } else {
        router.push('/'); // Başarılı girişten sonra ana sayfaya yönlendir
        router.refresh();
      }
    } catch (error) {
      setError('Bir hata oluştu');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Giriş Yap</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Şifre
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Giriş Yap
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={() => signIn('google')}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mb-2"
          >
            Google ile Giriş Yap
          </button>
          
          <button
            onClick={() => signIn('twitter')}
            className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500"
          >
            Twitter ile Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
} 