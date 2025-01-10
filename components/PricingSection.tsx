"use client"

import { CheckIcon } from "@heroicons/react/24/outline";

const plans = [
  {
    id: 1,
    name: "Başlangıç",
    price: "399₺",
    description: "Temel yatırım araçlarına erişim",
    features: [
      "Günlük 10 hisse analizi",
      "Temel teknik göstergeler",
      "Geçmiş veriler",
      "Portföy takibi",
    ],
    gradient: "from-blue-500 to-cyan-500",
    popular: false,
  },
  {
    id: 2,
    name: "Pro",
    price: "599₺",
    period: "/ay",
    description: "Profesyonel yatırımcılar için",
    features: [
      "Sınırsız hisse analizi",
      "Gelişmiş AI önerileri",
      "Gerçek zamanlı alerts",
      "Özel teknik göstergeler",
      "Portföy optimizasyonu",
      "7/24 öncelikli destek",
    ],
    gradient: "from-orange-500 to-purple-600",
    popular: true,
  },
  {
    id: 3,
    name: "Pro Plus",
    price: "1499₺",
    description: "Kurumlar ve büyük yatırımcılar için",
    features: [
      "Özel API erişimi",
      "Kurumsal AI modelleri",
      "Özelleştirilmiş raporlar",
      "Dedike hesap yöneticisi",
      "Sınırsız kullanıcı",
      "SLA garantisi",
    ],
    gradient: "from-purple-500 to-pink-500",
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[#0D0B21]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(79, 70, 229, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(79, 70, 229, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Size Uygun Planı Seçin
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Her seviyedeki yatırımcı için özelleştirilmiş planlarımızla tanışın
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.id} className="relative group">
              {/* Card Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${plan.gradient} rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500`} />

              {/* Card Content */}
              <div className="relative flex flex-col h-full bg-[#1E1B33] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-500 to-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                      En Popüler
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-3xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-400 mb-1">{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} p-1`}>
                        <CheckIcon className="w-full h-full text-white" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <button
                  className={`w-full py-3 px-4 rounded-xl font-medium transition-all
                    ${plan.popular 
                      ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:opacity-90'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                    }
                  `}
                >
                  {plan.popular ? 'Hemen Başla' : 'Seç'}
                </button>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/20 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-20" />
      </div>
    </section>
  );
} 