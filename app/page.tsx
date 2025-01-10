import HeroSection from '../components/HeroSection'
import FeatureCards from '../components/FeatureCards'
import PricingSection from '../components/PricingSection'
import SearchBar from '../components/SearchBar'
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D0B21]">
      <main>
        <HeroSection />
        <SearchBar />        
        <FeatureCards />
        <PricingSection />
      </main>
    </div>
  )
}
