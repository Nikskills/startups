import Link from "next/link"
import LogOutButton from "./logout-button"
import { auth } from "../../auth"
import { Button } from "./ui/button"
export const NavBar = async() => {
    const loggedIn = await auth()
    return (
        <div className="w-full flex flex-row justify-between  px-4 py-4 rounded-lg">
            <div><Link href={'/'}>logo</Link></div>
            <div>
                {loggedIn ? 
                (<div className="flex flex-row gap-3">
                    <Link href={'/newstartup'}><Button variant={"outline"}>New Startup</Button></Link> 
                    <LogOutButton /> 
                </div>): 
                (<Link href={'/login'}><Button>Login</Button></Link>)}
            </div>
        </div>
   )
}