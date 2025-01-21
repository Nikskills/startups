import { signOut } from "../../auth"
import { Button } from "./ui/button"

const logOutButton = () => {

    return (
        <form action={async () => {
            'use server'
            await signOut()
        }}>
            <Button type="submit">Log Out</Button>
        </form>
    )
}

export default logOutButton