"use client"

import { FC } from 'react';
import { 
  ChartBarIcon, 
  CpuChipIcon, 
  BoltIcon, 
  ChartPieIcon,
  ArrowTrendingUpIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

const features = [
  {
    id: 1,
    title: "Yapay Zeka Analizleri",
    description: "Gelişmiş yapay zeka algoritmalarımız ile hisse senetlerinin gelecek trendlerini analiz edin.",
    icon: <CpuChipIcon className="w-8 h-8" />,
    stats: [
      { label: "Doğruluk Oranı", value: "94%" },
      { label: "Günlük Analiz", value: "1.2K+" }
    ],
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 2,
    title: "Teknik Göstergeler",
    description: "RSI, MACD, Bollinger Bantları gibi teknik göstergeleri anlık takip edin.",
    icon: <ChartBarIcon className="w-8 h-8" />,
    stats: [
      { label: "Gösterge Sayısı", value: "50+" },
      { label: "Güncelleme", value: "Anlık" }
    ],
    gradient: "from-blue-500 to-purple-500",
  },
  {
    id: 3,
    title: "Anlık Veriler",
    description: "Borsa verilerini milisaniye hassasiyetinde anlık olarak takip edin.",
    icon: <BoltIcon className="w-8 h-8" />,
    stats: [
      { label: "Gecikme", value: "<1ms" },
      { label: "Veri Akışı", value: "24/7" }
    ],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Portföy Yönetimi",
    description: "Portföyünüzü profesyonel araçlarla analiz edin ve yönetin.",
    icon: <ChartPieIcon className="w-8 h-8" />,
    stats: [
      { label: "Optimizasyon", value: "99%" },
      { label: "Risk Analizi", value: "Gerçek Zamanlı" }
    ],
    gradient: "from-purple-500 to-pink-500",
  },
];

export default function FeatureCards() {
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
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 rounded-full px-4 py-2 text-orange-500 mb-6">
            <ArrowTrendingUpIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Profesyonel Araçlar</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Yatırımlarınızı Güçlendirin
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            En gelişmiş teknolojiler ile donatılmış araçlarımızla yatırımlarınızı bir üst seviyeye taşıyın.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative"
            >
              {/* Card Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500`} />

              {/* Card Content */}
              <div className="relative flex flex-col h-full bg-[#1E1B33] border border-white/10 rounded-xl p-6 backdrop-blur-xl overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute right-0 top-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-r from-white/5 to-white/0 rounded-full blur-2xl transform rotate-45" />

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} p-3.5`}>
                    <div className="w-full h-full text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between gap-4">
                    {feature.stats.map((stat, index) => (
                      <div key={index} className="flex-1">
                        <div className="text-xl font-bold text-white mb-0.5">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

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