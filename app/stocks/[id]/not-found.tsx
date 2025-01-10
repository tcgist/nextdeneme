import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Hisse Senedi Bulunamadı</h2>
      <p className="text-gray-600 mb-4">
        Aradığınız hisse senedi sistemde bulunmuyor.
      </p>
      <Link
        href="/"
        className="text-blue-600 hover:text-blue-500 font-semibold"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
} 