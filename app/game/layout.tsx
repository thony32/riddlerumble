import Navbar from "@/components/game/Navbar"
import { auth } from "@/edgedb"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import UserAction from "@/services/user-action"
import { useUser } from "@/store/useUser"

export default async function GameLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = auth.getSession()
    if ((await session.isSignedIn()) == false) {
        redirect("/")
    }

    const identityCookie = cookies().get("identity")?.value as string
    const identity = identityCookie.replace(/"/g, "")
    const user = await UserAction.getData(identity)
    const setUser = useUser.getState().setUser

    setUser({ ...user, id: identity })

    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}
