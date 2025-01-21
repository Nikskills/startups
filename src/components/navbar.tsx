import Link from "next/link"
import LogOutButton from "./logout-button"
export const NavBar = () => {

    return (
        <div className="w-full flex flex-row justify-between  px-4 py-4 rounded-lg">
            <div><Link href={'/'}>logo</Link></div>
            <div><LogOutButton></LogOutButton></div>
        </div>
    )
}