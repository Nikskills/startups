import { HeroSection } from "@/components/herosection";
import { StartupCard } from "@/components/startup-cards";
import { Startup } from '@/types/types'

type StartupProps = {
  startups: Startup[] 
}

async function getStartups(): Promise<StartupProps['startups']> {
  try {
    const response = await fetch('http://localhost:3000/api/startups')
    if (!response.ok) {
      throw new Error('Failed to fetch startups')
    }
    const data = await response.json()
    return data.startups as Startup[]
  } catch (error) {
    console.error('Error fetching startups:', error)
    return []
  }
}

export default async function Home() {
  const startups = await getStartups()

  return (
    <div className="container mx-auto px-4">
      <HeroSection />
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start m-10">
        {startups.length > 0 ? (
          startups.map((startup: Startup) => (
            <div key={startup.id}>
              <StartupCard {...startup} />
            </div>
          ))
        ) : (
          <p>No startups found</p>
        )}
      </div>
    </div>
  )
}

