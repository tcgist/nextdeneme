"use client";

import { 
  BoltIcon, 
  ChartBarIcon, 
  CubeTransparentIcon, 
  LightBulbIcon,
  ArrowPathIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from 'next/image';
import { useRef } from 'react';

const features = [
  {
    icon: BoltIcon,
    title: "Yapay Zeka Destekli Finansal Analiz",
    description: "Gelişmiş yapay zeka algoritmalarımız, finansal raporları derinlemesine analiz ederek, insan gözünün kaçırabileceği kritik detayları tespit eder. Her bir finansal veriyi titizlikle işleyerek, şirketlerin gerçek finansal durumunu ortaya çıkarır.",
    color: {
      light: "bg-blue-50",
      dark: "bg-blue-900",
      text: "text-blue-600",
      gradient: "from-blue-500 to-cyan-500"
    }
  },
  {
    icon: ChartBarIcon,
    title: "Kapsamlı Sektörel Kıyaslama",
    description: "Sistem, 400'den fazla finansal oranı anlık olarak analiz eder ve her bir şirketi kendi sektöründeki rakipleriyle karşılaştırır. Bu sayede şirketlerin sektördeki konumunu ve rekabet gücünü net bir şekilde ortaya koyar.",
    color: {
      light: "bg-purple-50",
      dark: "bg-purple-900",
      text: "text-purple-600",
      gradient: "from-purple-500 to-pink-500"
    }
  },
  {
    icon: CubeTransparentIcon,
    title: "Akıllı Sektör Sınıflandırması",
    description: "Yapay zeka algoritmalarımız, geleneksel sektör sınıflandırmalarının ötesine geçerek, şirketlerin gerçek iş modellerini ve rekabet dinamiklerini analiz eder. Bu sayede çok daha isabetli rakip gruplandırmaları oluşturur.",
    color: {
      light: "bg-emerald-50",
      dark: "bg-emerald-900",
      text: "text-emerald-600",
      gradient: "from-emerald-500 to-teal-500"
    }
  },
  {
    icon: LightBulbIcon,
    title: "Öğrenen Analiz Sistemi",
    description: "Sistemimiz, bilanço analizlerini geçmiş fiyat hareketleriyle sürekli karşılaştırarak kendini geliştirir. Bu öğrenme süreci sayesinde, finansal verilerdeki kritik sinyalleri çok daha erken ve doğru tespit eder.",
    color: {
      light: "bg-amber-50",
      dark: "bg-amber-900",
      text: "text-amber-600",
      gradient: "from-amber-500 to-orange-500"
    }
  },
  {
    icon: ArrowPathIcon,
    title: "Bütünsel Piyasa Analizi",
    description: "Yapay zeka motorumuz sadece şirket verilerini değil, makroekonomik göstergeleri, piyasa haberlerini ve ekonomi politikalarını da analiz eder. Bu çok boyutlu analiz yaklaşımı, çok daha isabetli piyasa öngörüleri sunar.",
    color: {
      light: "bg-rose-50",
      dark: "bg-rose-900",
      text: "text-rose-600",
      gradient: "from-rose-500 to-red-500"
    }
  }
];

export default function SystemIntroduction() {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-b from-[#0D0B21] to-[#121212]">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 flex flex-col lg:block"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
                <SparklesIcon className="w-5 h-5 text-orange-500" />
                <span className="text-white/80 text-sm">CoT Destekli Yapay Zeka</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10 mb-6 ml-4">
                <SparklesIcon className="w-5 h-5 text-orange-500" />
                <span className="text-white font-semibold">FinansGPT-2 Yayında!</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Finansal Doğruluğu En Yüksek{' '}
                <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                  Yapay Zeka Modeli
                </span>
              </h1>

              <div className="space-y-6 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                    FinansGPT-2
                  </span>{' '}
                  ile Tanış
                </h2>

                <div className="grid gap-4">
                  {[
                    "Hisselerle ilgili tüm metrikleri (bilançolar, oranlar vs.) anında analiz eden",
                    "Bilançoları puanlayıp sana bildirim gönderen",
                    "CoT gibi en ileri yapay zeka teknolojilerini kullanan",
                    "Kazanç oranı çok yüksek",
                    "Seni günlerce temel analiz yapma derdinden kurtaran",
                    "Sen çalışırken gelen bilançoları bile tek tıkla analiz eden",
                    "Finans ile ilgili tüm bilimsel yöntemlere hakim",
                    "Geçmiş fiyat hareketlerinin sebeplerini ezbere bilen (Hem de sektör ve hisse bazında)",
                    "Bu sayede en isabetli tahminleri yapan"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-orange-500/20 to-purple-600/20 flex items-center justify-center mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-purple-600" />
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl blur opacity-25 animate-pulse" />
                  <button className="relative px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-all">
                    👉🏻 Hemen Başla
                  </button>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  onClick={scrollToFeatures}
                >
                  <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500 to-purple-600" />
                  <div className="text-sm text-gray-300 font-medium tracking-wider uppercase hover:text-white transition-colors">
                    Keşfetmek İçin Tıkla veya Kaydır
                  </div>
                  <div className="relative w-8 h-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full opacity-20 animate-ping" />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full opacity-40 animate-pulse" />
                    <motion.div
                      animate={{
                        y: [0, 4, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <svg 
                        className="w-4 h-4 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                        />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="/Tanitim/yukselis.jpg"
                  alt="AI Financial Analysis"
                  width={1000}
                  height={800}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Speed Analysis Section */}
      <div ref={featuresRef} className="relative py-16 border-t border-white/5">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-purple-500/5" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Sol Taraf - İçerik */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="relative w-5 h-5">
                  <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-25" />
                  <div className="relative w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <span className="text-white/80 text-sm">Rakiplerden Hızlı Analiz</span>
              </div>
             
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Dakikalar İçinde{' '}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Binlerce Veriyi
                </span>{' '}
                Analiz Ediyor
              </h2>

              <div className="space-y-4">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-300 leading-relaxed"
                >


                  <div className="grid gap-4">
                    <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <SparklesIcon className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium text-white mb-1">Anında Analiz</h4>
                        <p className="text-gray-300 text-sm">Bilanço yayınlanır yayınlanmaz, FinansGPT binlerce veriyi saniyeler içinde analiz eder.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <ArrowPathIcon className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium text-white mb-1">Veri Dönüşümü</h4>
                        <p className="text-gray-300 text-sm">Karmaşık finansal veriler anlaşılır ve sade bir formata dönüştürülür.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <BoltIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium text-white mb-1">Hızlı İletişim</h4>
                        <p className="text-gray-300 text-sm">Analiz sonuçları anında size iletilir, büyük finans kuruluşlarından bile önce bilgi sahibi olursunuz.</p>
                      </div>
                    </div>
                  </div>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-6 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-white">İlk Öğrenen Sen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="text-white">En Çok Kazanan Sen</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
              >
                <p className="text-gray-300 italic">
                  "Bu sayede şirketin geleceği hakkında herkesten önce fikir sahibi oluyorsun. 
                  İlk pozisyon alan ve en çok kazanan da sen olursun."
                </p>
              </motion.div>
            </motion.div>

            {/* Sağ Taraf - Görsel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="/Tanitim/tablet.jpg"
                  alt="Fast Financial Analysis"
                  width={800}
                  height={600}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20 mix-blend-overlay" />
                
                {/* Overlay Elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-white/80">Binlerce veri tek ekranda</span>
                  </div>
                  <div className="text-xs text-white/80">
                    Analiz Süresi: &lt; 5 dakika
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hero section'dan sonra, AI Insight section'dan önce */}
      <div  className="relative py-8 border-t border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-orange-500/10" />
          <div className="absolute top-0 left-1/3 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4">
            <div className="flex space-x-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-0.5 h-0.5 rounded-full bg-orange-500 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <span className="text-white/80 text-xs">
              Yapay Zeka Destekli Yatırım
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            <span className="text-orange-500">
              FinansGPT
            </span>
            'nin En İleri Yapay Zeka Teknolojileri{' '}
            <br className="hidden md:block" />
            Yatırım Başarınızı{' '}
            <span className="relative">
              <span className="text-orange-500">
                Zirveye Taşısın
              </span>
              <motion.svg
                className="absolute -top-1 -right-6 w-4 h-4 text-orange-500"
                viewBox="0 0 24 24"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <path
                  fill="currentColor"
                  d="M13 20h-2V8l-5.5 5.5-1.42-1.42L12 4.16l7.92 7.92-1.42 1.42L13 8v12z"
                />
              </motion.svg>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto"
          >
            Binlerce finansal veriyi analiz eden, geçmiş tecrübelerden öğrenen ve 
            size özel stratejiler üreten yapay zeka teknolojimizle tanışın
          </motion.p>
        </motion.div>
      </div>

      {/* AI Insight Section */}
      <div className="relative py-24 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-orange-900/20 opacity-30" />
        
        {/* Floating Elements */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Sol Taraf - Görsel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/Tanitim/beyin-2.jpg"
                  alt="AI Chain of Thought"
                  width={800}
                  height={800}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>

            {/* Sağ Taraf - İçerik */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-white/80 text-sm">En İleri Yapay Zeka Teknolojisi "Controlled CoT"</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Bu Teknoloji Sayesinde Her Zaman Diğerlerinden{' '}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                   Daha Fazla Kazanacaksın
                </span>
              </h2>

              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  Controlled Chain-of-Thought (CoT) yaklaşımı, En ileri yapay zeka teknolojisi olan CoT yani düşünce zinciri yaklaşımının 
                  finans alanına uygun en ileri versiyonudur. Bu versiyon finansal raporları, oranları ve bize özel verileri
                  geçmiş fiyat hareketleriyle sürekli karşılaştırarak, finansal verilerdeki kritik sinyalleri çok daha erken ve doğru tespit eder.
                  Adeta her an binlerce veriyle beslenen üstün bir beyin gibi çalışır. Sarmal düşünce zinciri sayesinde karmaşık finansal verileri en derin
                  noktasına kadar analiz eder.
                  Başarı oranınızda büyük bir sıçrama sağlar.    
                </p>
                
                <div className="grid gap-4 mt-8">
                  {[
                    {
                      title: "Derinlemesine Analiz",
                      description: "Finansal verileri adım adım analiz ederek, gizli bağlantıları ortaya çıkarır"
                    },
                    {
                      title: "Geçmişe dönük karşılaştırma",
                      description: (
                        <span>
                          Analiz adımlarını{' '}
                          <span className="text-orange-500">geçmiş verilerle karşılaştırır</span>.{' '}
                          <span className="text-purple-500">En etkili metrikleri</span>{' '}
                          her hisse ve sektör için{' '}
                          <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent font-semibold">
                            ayrı ayrı tespit eder
                          </span>
                        </span>
                      )
                    },
                    {
                      title: "Büyük Başarı Artışı",
                      description: "Hiç bir insanın yapamayacağı büyüklükte veri analizi ve kurduğu mantıksal alt yapı ile yatırım başarınızı zirveye taşır."
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-purple-600/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-300">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Güçlü{' '}
              <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                Özellikler
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              En son teknolojilerle donatılmış sistemimiz, finansal analizlerinizi yeni bir boyuta taşıyor.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all border border-white/10"
              >
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${feature.color.gradient}`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Showcase */}
      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Image
                src="/Tanitim/robot.jpg"
                alt="AI Technology"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl border border-white/10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-2xl" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Yapay Zeka ile{' '}
                <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                  Gelişmiş Analiz
                </span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Sistemimiz, binlerce veriyi saniyeler içinde analiz ederek, size en doğru finansal içgörüleri sunar.
                Gelişmiş yapay zeka algoritmaları sayesinde, piyasadaki fırsatları ve riskleri önceden tespit eder.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-orange-500 mb-1">400+</div>
                  <div className="text-sm text-gray-300">Finansal Oran Analizi</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-purple-500 mb-1">%95</div>
                  <div className="text-sm text-gray-300">Tahmin Doğruluğu</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Geleceği{' '}
              <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                Şimdi Keşfedin
              </span>
            </h2>
            <p className="text-gray-300 mb-8">
              14 günlük ücretsiz deneme ile sistemimizin tüm özelliklerini keşfedin.
            </p>
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-all">
              Hemen Başlayın
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 