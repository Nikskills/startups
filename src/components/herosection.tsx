import { Input } from "./ui/input"


export const HeroSection = () => {

    return (
        <div className="bg-pink-500 flex flex-col h-full mx-5 justify-center p-5 text-center font-bold">
            <div className="text-white flex flex-col items-center justify-center my-5">
                <h1 className="bg-black p-4 min-w-fit mx-auto text-center text-5xl">
                    PITCH YOUR STARTUP, CONNECT WITH ENTREPENEURS
                </h1>
            </div>
            <div className="text-white text-xl my-5">
                <p>Submit Ideas, Vote on Pitches and Get Noticed in Virtual Competitions</p>
            </div>
            <div className="my-5 flex flex-row justify-center">
                <form className="flex flex-row rounded-lg border-4 border-solid border-black text-gray-500 bg-white w-3/4">
                    <Input
                        placeholder="Search Startups"
                        name="searchbar"
                        id="searchbar"
                        className=""
                    />
                    <div>Icon</div>
                </form>
            </div>
        </div>
    )
}