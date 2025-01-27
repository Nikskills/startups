import { Input } from "./ui/input"

export const HeroSection = ({query}: {query?: string}) => {
    return (
        <div className="pink-container">
            <div className="flex w-full ">
                <div className="flex-1"></div>
                <div className="w-2/3 ">
                    <div className="text-white flex flex-col items-center justify-center my-5">
                        <h1 className="bg-black p-4 min-w-fit mx-auto text-center text-5xl">
                            PITCH YOUR STARTUP, CONNECT WITH ENTREPENEURS
                        </h1>
                    </div>
                    <div className="text-white text-xl my-5 text-center">
                        <p>Submit Ideas, Vote on Pitches and Get Noticed in Virtual Competitions</p>
                    </div>
                    <div className="my-5 flex flex-row justify-center">
                        <form action={'/'} className="flex flex-row rounded-lg border-4 border-solid border-black text-gray-500 bg-white w-full">
                            <Input
                                defaultValue={query}
                                name="query"
                                id="searchbar"
                                className="border-none"
                            />
                            <div className="flex gap-2">
                                {query}
                                <button type="submit">S</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex-1"></div>
            </div>
        </div>
    )
}