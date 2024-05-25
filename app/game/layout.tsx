"use client"
import { redirect } from "next/navigation"
import { getData } from "@/services/user-action"
import { useUser } from "@/store/useUser"
import { useQuery } from "@tanstack/react-query"
import Navbar from "@/components/game/Navbar"

export default function GameLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const setUser = useUser((state) => state.setUser)
    const { data, isPending } = useQuery({
        queryKey: ["session"],
        queryFn: async () => {
            const { user, isSignedIn } = await getData()
            setUser(user)
            return isSignedIn
        },
    })

    if (isPending) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        )
    }

    if (!data) {
        redirect("/")
    }

    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}
