"use client";

import { CheckCircleIcon, XCircleIcon, ChartBarIcon, ScaleIcon, CurrencyDollarIcon, ArrowTrendingUpIcon, ShieldCheckIcon, CogIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScoreCard {
  title: string;
  score: number;
  color: {
    from: string;
    to: string;
  };
  icon: any;
  details: string[];
}

interface FinancialInsight {
  text: string;
  isPositive: boolean;
}

const scoreData = [
  {
    title: "Finansal Sağlık",
    color: {
      from: "#3B82F6",
      to: "#06B6D4"
    },
    icon: ChartBarIcon,
    details: [
      "Net Kar Marjı %23'ten %28'e yükseldi",
      "FAVÖK 850M TL'den 1.2B TL'ye çıktı",
      "İşletme Sermayesi %15 artış gösterdi",
      "Nakit ve Nakit Benzerleri %30 büyüdü",
      "Faaliyet Karı 420M TL'ye ulaştı"
    ]
  },
  {
    title: "Borç Yönetim Seviyesi",
    color: {
      from: "#8B5CF6",
      to: "#EC4899"
    },
    icon: ScaleIcon,
    details: [
      "Borç/Özkaynak oranı 0.85'ten 0.72'ye geriledi",
      "Kısa Vadeli Borçlar %12 azaldı",
      "Finansal Borçlar 320M TL'den 280M TL'ye düştü",
      "Borç Çevirme Süresi 15 gün kısaldı",
      "Net Borç Pozisyonu %18 iyileşme gösterdi"
    ]
  },
  {
    title: "Karlılık ve Verimlilik Durumu",
    color: {
      from: "#22C55E",
      to: "#10B981"
    },
    icon: CurrencyDollarIcon,
    details: [
      "Brüt Kar Marjı %32'den %38'e yükseldi",
      "FAVÖK Marjı sektör ortalamasının üzerinde",
      "Faaliyet Giderleri %8 azaldı",
      "Çalışan Başına Verimlilik %15 arttı",
      "Stok Devir Hızı 12 günden 8 güne düştü"
    ]
  },
  {
    title: "Büyüme ve Piyasa Değerleme Durumu",
    color: {
      from: "#F97316",
      to: "#EF4444"
    },
    icon: ArrowTrendingUpIcon,
    details: [
      "Gelirler yıllık bazda %45 büyüdü",
      "Pazar payı %12'den %15'e yükseldi",
      "Yeni müşteri kazanımı %60 arttı",
      "Uluslararası satışlar %25 büyüdü",
      "F/K oranı sektör ortalamasının altında"
    ]
  },
  {
    title: "Risk Yönetim Durumu",
    color: {
      from: "#6366F1",
      to: "#A855F7"
    },
    icon: ShieldCheckIcon,
    details: [
      "Kur riski %30 azaltıldı",
      "Sigorta kapsamı %25 genişletildi",
      "Tedarikçi çeşitliliği arttırıldı",
      "Likidite rasyoları iyileşti",
      "Operasyonel riskler minimize edildi"
    ]
  },
  {
    title: "Operasyonel Verimlilik ve Yönetim Performansı",
    color: {
      from: "#EAB308",
      to: "#F97316"
    },
    icon: CogIcon,
    details: [
      "Üretim verimliliği %18 arttı",
      "Tedarik zinciri maliyetleri %15 düştü",
      "Kalite standartları %95'in üzerine çıktı",
      "Müşteri memnuniyeti %92'ye ulaştı",
      "Personel devir hızı %40 azaldı"
    ]
  }
];

const insights: FinancialInsight[] = [
  {
    text: "Son çeyrekte net kâr marjı %15 artış gösterdi",
    isPositive: true
  },
  {
    text: "Şirketin nakit akışı bir önceki yıla göre %25 iyileşti",
    isPositive: true
  },
  {
    text: "İhracat gelirleri geçen yıla göre %30 büyüdü",
    isPositive: true
  },
  {
    text: "Özkaynak kârlılığı sektör ortalamasının üzerinde seyrediyor",
    isPositive: true
  },
  {
    text: "Ar-Ge yatırımları bir önceki döneme göre %40 arttı",
    isPositive: true
  },
  {
    text: "Pazar payı son bir yılda %5 genişledi",
    isPositive: true
  },
  {
    text: "Borç/Özkaynak oranı sektör ortalamasının üzerinde",
    isPositive: false
  },
  {
    text: "Stok devir hızı son çeyrekte %10 yavaşladı",
    isPositive: false
  },
  {
    text: "Faaliyet giderleri geçen yıla göre %20 arttı",
    isPositive: false
  },
  {
    text: "Alacak tahsil süresi uzadı",
    isPositive: false
  }
];

export default function FinancialInsights() {
  const [scores, setScores] = useState<ScoreCard[]>([]);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [showAllDetails, setShowAllDetails] = useState(false);

  useEffect(() => {
    const generatedScores = scoreData.map(item => ({
      ...item,
      score: Math.floor(Math.random() * (100 - 30 + 1)) + 30
    }));
    setScores(generatedScores);
  }, []);

  const toggleCard = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleAllCards = () => {
    setShowAllDetails(prev => !prev);
    setExpandedCards(prev => 
      prev.length === scores.length 
        ? [] 
        : scores.map((_, i) => i)
    );
  };

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header - Başlığı yukarı taşıdık ve stilini güncelledik */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 rounded-full px-4 py-2 text-sm text-orange-500 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
            Bilanço Analizi
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Finansal{' '}
            <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              Görünüm
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Şirketin finansal performansını ve önemli metriklerini tek bakışta görüntüleyin
          </p>
          
          {/* Tüm Açıklamaları Göster Butonu */}
          <button
            onClick={toggleAllCards}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-purple-500/20 hover:from-orange-500/30 hover:to-purple-500/30 border border-white/10 backdrop-blur-sm transition-all"
          >
            <span className="text-white font-medium">
              {showAllDetails ? 'Detayları Gizle' : 'Tüm Detayları Göster'}
            </span>
            <motion.div
              animate={{ rotate: showAllDetails ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDownIcon className="w-5 h-5 text-white" />
            </motion.div>
          </button>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {scores.map((score, index) => (
            <motion.div 
              key={index}
              onClick={() => toggleCard(index)}
              className={`group flex flex-col items-center p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden cursor-pointer
                ${expandedCards.includes(index) ? 'lg:col-span-1 row-span-2' : ''}`}
              animate={{ height: expandedCards.includes(index) ? 'auto' : 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {/* Floating Particles Effect */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-24 h-24 rounded-full blur-3xl opacity-20 animate-float"
                    style={{
                      background: `linear-gradient(to right, ${score.color.from}, ${score.color.to})`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 2}s`,
                      animationDuration: '15s'
                    }}
                  />
                ))}
              </div>

              {/* Icon Container */}
              <div className="absolute top-3 right-3 w-8 h-8 p-1.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <score.icon 
                  className="w-full h-full"
                  style={{
                    color: score.color.from
                  }}
                />
              </div>

              <div className="flex flex-col items-center w-full">
                {/* Score Circle ve İçerik */}
                <motion.div
                  animate={{ 
                    scale: expandedCards.includes(index) ? 0.6 : 1,
                    y: expandedCards.includes(index) ? -30 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  {/* Score Circle */}
                  <div className="relative w-32 h-32 mb-4">
                    <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-sm border border-white/10" />
                    <div className="absolute inset-0 rounded-full animate-pulse-slow opacity-30 mix-blend-overlay"
                      style={{
                        background: `linear-gradient(45deg, ${score.color.from}20, ${score.color.to}20)`
                      }}
                    />
                    
                    <svg className="w-full h-full transform -rotate-90 drop-shadow-xl">
                      {/* Background Ring */}
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        fill="none"
                        stroke="url(#ring-bg)"
                        strokeWidth="8"
                        className="opacity-30"
                      />
                      {/* Progress Ring */}
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        fill="none"
                        stroke={`url(#gradient-${index})`}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${(score.score / 100) * 364} 364`}
                        className="transition-all duration-1000 ease-out"
                        filter="url(#glow)"
                      />
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={score.color.from} />
                          <stop offset="100%" stopColor={score.color.to} />
                        </linearGradient>
                        <linearGradient id={`ring-bg`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f3f4f6" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#f3f4f6" stopOpacity="0.1" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                    </svg>

                    {/* Score Display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="relative">
                        <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-transparent blur-sm select-none"
                          style={{
                            color: score.color.from,
                            opacity: 0.3
                          }}
                        >
                          {score.score}
                        </span>
                        <span className="relative text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${score.color.from}, ${score.color.to})`
                          }}
                        >
                          {score.score}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-gray-400 mt-1 tracking-wider uppercase">puan</span>
                    </div>
                  </div>

                  {/* Title ve Progress */}
                  <div className="text-center space-y-3 relative z-10">
                    <h3 className="text-base font-medium text-gray-300 text-center">
                      {score.title}
                    </h3>
                    
                    {/* Progress Dots */}
                    <div className="flex items-center justify-center gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            i < Math.floor(score.score / 20)
                              ? 'w-6 shadow-lg'
                              : 'w-1.5 opacity-30'
                          }`}
                          style={{
                            background: i < Math.floor(score.score / 20)
                              ? `linear-gradient(to right, ${score.color.from}, ${score.color.to})`
                              : '#e5e7eb'
                          }}
                        />
                      ))}
                    </div>

                    {/* Mini Stats */}
                    <div className="pt-3 flex items-center justify-center gap-4 text-xs">
                      <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-50/80 backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: score.color.from }}
                        />
                        <span className="text-gray-600">Min: 30</span>
                      </span>
                      <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-50/80 backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: score.color.to }}
                        />
                        <span className="text-gray-600">Max: 100</span>
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Detaylar Bölümü - margin-top değerini de buna göre ayarladık */}
                <AnimatePresence>
                  {expandedCards.includes(index) ? (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full mt-0 space-y-2"
                    >
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500/20 to-transparent mb-2" />
                      
                      {score.details.map((detail, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5"
                            style={{ backgroundColor: score.color.from }}
                          />
                          <span className="text-gray-300">{detail}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* Detaylar Butonu - En alta taşındı */}
                <motion.div
                  animate={{ 
                    opacity: expandedCards.includes(index) ? 0 : 1,
                    scale: expandedCards.includes(index) ? 0.8 : 1
                  }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-500/10 to-gray-400/10 border border-white/5 group-hover:border-white/10 transition-all"
                >
                  <ChevronDownIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    Detayları Görüntüle
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Positive Insights */}
          <div className="group p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden">
            {/* Header */}
            <div className="relative flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 shadow-md shadow-emerald-500/10">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-500">
                  Olumlu Göstergeler
                </h3>
                <p className="text-xs text-gray-400">
                  Son dönemdeki pozitif gelişmeler
                </p>
              </div>
            </div>

            {/* Insights List */}
            <div className="relative space-y-2">
              {insights.filter(i => i.isPositive).map((insight, index) => (
                <div
                  key={index}
                  className="group/item relative bg-white/5 backdrop-blur-sm rounded-xl p-3 hover:bg-white/10 transition-all border border-white/10"
                >
                  <div className="relative flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 font-medium leading-snug text-sm">
                        {insight.text}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 font-medium text-emerald-500">
                          <div className="w-1 h-1 rounded-full bg-emerald-500" />
                          Pozitif
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-500/10 font-medium text-gray-400">
                          Q4 2023
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Negative Insights */}
          <div className="group p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden">
            {/* Header */}
            <div className="relative flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-500/10 shadow-md shadow-rose-500/10">
                <XCircleIcon className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-rose-500">
                  İyileştirme Alanları
                </h3>
                <p className="text-xs text-gray-400">
                  Dikkat edilmesi gereken noktalar
                </p>
              </div>
            </div>

            {/* Insights List */}
            <div className="relative space-y-2">
              {insights.filter(i => !i.isPositive).map((insight, index) => (
                <div
                  key={index}
                  className="group/item relative bg-white/5 backdrop-blur-sm rounded-xl p-3 hover:bg-white/10 transition-all border border-white/10"
                >
                  <div className="relative flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-rose-500/10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 font-medium leading-snug text-sm">
                        {insight.text}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 font-medium text-rose-500">
                          <div className="w-1 h-1 rounded-full bg-rose-500" />
                          İyileştirme
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-500/10 font-medium text-gray-400">
                          Q4 2023
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 