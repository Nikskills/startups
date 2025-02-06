import CreateStartupForm from "@/components/create-startup-form"


const NewStartupPage = () => {

    return (
        <div>
            <div className="pink-container">
                <div className="flex justify-center m-4">
                    <h1 className="bg-black text-white text-5xl p-4">SUBMIT YOUR STARTUP</h1>
                </div>
            </div>
            <div className="grid grid-cols-5 justify-center items-center h-full my-10">
               <div className="col-span-3 col-start-2"><CreateStartupForm /></div>
            </div>
        </div>
    )
}

export default NewStartupPage