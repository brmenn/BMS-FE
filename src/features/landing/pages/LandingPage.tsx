import { AboutSection } from '../components/AboutSection'
import { AdvantageSection } from '../components/AdvantageSection'
import { FeatureSection } from '../components/FeatureSection'
import { HeroSection } from '../components/HeroSection'
import { LandingFooter } from '../components/LandingFooter'
import { LandingHeader } from '../components/LandingHeader'
import { TestimonialSection } from '../components/TestimonialSection'

export function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f8fafc]">
      <LandingHeader />
      <main className="flex w-full flex-1 flex-col">
        <HeroSection />
        <AboutSection />
        <FeatureSection />
        <AdvantageSection />
        <TestimonialSection />
      </main>
      <LandingFooter />
    </div>
  )
}
