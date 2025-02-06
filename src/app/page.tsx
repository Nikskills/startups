import { HeroSection } from "@/components/herosection";
import { Startups } from "@/components/startups";


export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query

  return (
    <div className="w-full">
      <div className="w-full">
        <HeroSection />
      </div>
      <div>
        <Startups query={query}/>
      </div>
    </div>
  )
}

