import { Navigation } from "@/components/layout/navigation"
import { HeroSection } from "@/components/sections"

const HomePage = () => {
  return (
    <>
      <Navigation />
      <main className="flex flex-1 flex-col">
        <HeroSection />
      </main>
    </>
  )
}

export default HomePage
