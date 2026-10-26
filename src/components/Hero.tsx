import { HeroBadge, HeroHeading, HeroDescription, HeroCTA } from './HeroSections'
import { HeroDashboard } from './HeroDashboard'

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <HeroBadge />
            <HeroHeading />
            <HeroDescription />
            <HeroCTA />
          </div>
          <HeroDashboard />
        </div>
      </div>
    </section>
  )
}