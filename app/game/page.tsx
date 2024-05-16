import Navbar from "@/components/game/Navbar"
import { auth } from "@/edgedb"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import UserAction from "@/services/user-action"
import { useUser } from "@/store/useUser"

const setUser = useUser.getState().setUser
export default async function Game() {
    const session = auth.getSession()
    if ((await session.isSignedIn()) == false) {
        redirect("/")
    }

    const identityCookie = cookies().get("identity")?.value as string
    const identity = identityCookie.replace(/"/g, "")
    const user = await UserAction.getData(identity)
    setUser({ id: identity, ...user })

    return (
        <div>
            <Navbar />
        </div>
    )
}
