import { Startup } from "@/types/types";
import { notFound } from "next/navigation";

async function getStartup(slug: string) {
    try {
        const res = await fetch(`http://localhost:3000/api/startups/${slug}`)
        
        if (res.status === 200) {
            const data = await res.json();
            const startup: Startup = data
            return startup
        }
        if (res.status === 400) {
            return null;
        }
        if (res.status === 404) {
            return null
        }
        throw new Error("Unexpected status code: " + res.status)
    }catch (error) {
        console.error(error)
        return null
    }
}
const StartupDetailsPage = async({params}: {params: Promise<{slug: string}>}) => {
    const startupSlug = (await params).slug
    const startup = await getStartup(startupSlug);
    
    if (!startup) {notFound()}

    const { title, description, author, views, category, image, pitch} = startup;

    return (
        <div>
            <div className="pink-container">
                <div className="bg-black text-white p-6 mx-auto text-center text-5xl my-5">{title}</div>
                <div className="text-white">{description}</div>
            </div>
            <div>{image ? 
                (<div className="flex justify-center">{image}</div>): 
                (<div></div>)
                }
            </div>
            <div className="flex w-full my-5">
                <div className="flex-1"></div>
                <div className="w-3/5 flex flex-row justify-between">
                    <div className="py-1">Geschreven door: {author}</div>
                    <div className="flex flex-row gap-5">
                        <div className="bg-purple-300 px-2 py-1 rounded-lg">{category}</div>
                        <div className="py-1">{views} views</div>
                    </div>
                </div>
                <div className="flex-1"></div>
            </div>
            <div className="flex w-full my-5">
                <div className="flex-1"></div>
                <div className="w-3/5 flex flex-col gap-2">
                    <p className="text-2xl font-bold">Pitch Details</p>
                    <p className="text-xl">{pitch}</p>
                </div>
                <div className="flex-1"></div>
                
            </div>
        </div>
    )
}

export default StartupDetailsPage