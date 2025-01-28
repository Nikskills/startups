import { Startup } from "@/types/types"
import { StartupCard } from "./startup-cards"

async function getPosts() {
    try {
        const res = await fetch('http://localhost:3000/api/startups/popular')
        
        if (!res.ok){
            throw new Error("something went wrong")
        }
        const posts = res.json()
        return posts
    }
    catch (err) {
        console.error(err)
    }
}


const PopularPosts = async() => {
    const res = await getPosts()
    const posts: Startup[] = res.posts
    if (!posts) return (<div>No Posts Found</div>)
        return (
            <div className="flex justify-center">
              <div className="w-3/5">
                {/* Title aligned with the posts */}
                <div className="mb-5 text-2xl font-bold pl-1">Popular Picks</div>
                {/* Posts grid */}
                <div className="flex flex-row space-x-8">
                  {posts.map((post) => (
                    <div key={post.id}>
                      <StartupCard {...post} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
}
export default PopularPosts