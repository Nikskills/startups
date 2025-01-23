import { HeroSection } from "@/components/herosection";
import { Startups } from "@/components/startups";


export default async function Home() {


  return (
    <div className="w-full">
      <div className="w-full">
        <HeroSection />
      </div>
      <div>
        <Startups/>
      </div>
    </div>
  )
}

