import { StartupCard } from "@/components/startup-cards";
import { Startup } from '@/types/types'

type StartupProps = {
    startups: Startup[] 
  }
  
async function getStartups(query: string | undefined): Promise<StartupProps['startups']> {
    try {
        const url = query ? `http://localhost:3000/api/startups?query=${query}` : 'http://localhost:3000/api/startups'
        const response = await fetch(url)
        if (response.status === 404) {
            console.error("No startups found for that query")
            return []
        }
        if (response.ok) {
            const data = await response.json()
            return data.startups as Startup[]
        }
        throw new Error("Something went wrong")
    } catch (error) {
        console.error('Error fetching startups:', error)
        return []
    }
}
export const Startups = async({query}: {query?: string}) => {
    const startups = await getStartups(query)
    return (
        <div className="mx-auto w-3/4 mt-5">
            <div className="text-3xl font-bold">
                {query ? (<div>Search for: {query}</div>):
                (<div>All Startups </div>)} 
            </div>
            <div className="flex flex-row gap-8 row-start-2 items-center sm:items-start m-10">
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