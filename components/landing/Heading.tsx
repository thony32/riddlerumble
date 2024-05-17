"use client"
import Link from "next/link"
import { Button } from "@nextui-org/button"
import { Chip } from "@nextui-org/react"
import Wordz from "../Misc/Wordz"
import SvgMapDraw from "../Misc/SvgMapDraw"
import { useQuery } from "@tanstack/react-query"
import { getOAuthUrl, getSession } from "@/services/user-action"
import { useState } from "react"

const Heading = () => {
    const [isLoading, setIsLoading] = useState(false)

    const { data: isSignedIn, isPending: sessionPending } = useQuery({
        queryKey: ["session"],
        queryFn: async () => {
            return await getSession()
        },
    })

    const { data: urlsData, isPending: urlsPending } = useQuery({
        queryKey: ["oauth_url"],
        queryFn: async () => {
            const urls = await getOAuthUrl()
            return urls
        },
    })

    return (
        <div className="h-screen flex justify-center items-center relative">
            <div className="absolute right-0 bottom-4">
                <Chip
                    color="success"
                    variant="dot"
                    size="lg"
                >
                    World tournament
                </Chip>
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <SvgMapDraw />
            </div>
            <div className="w-1/2 text-center space-y-5">
                <Wordz />
                <div className="translate-y-10 space-y-5">
                    <div>
                        <h1 className="text-[9rem] font-title">Enigmap</h1>
                    </div>
                    <p className="text-center text-3xl max-w-3xl m-auto">
                        Embark on a mysterious journey through an interactive map, where each location holds a cryptic puzzle waiting to be solved in our enigma-filled gaming experience!
                    </p>
                    <div className="flex justify-center">
                        {sessionPending || isSignedIn ? (
                            <Link href="/game">
                                <Button
                                    className="flex items-center gap-2 bg-blue-500 text-white tracking-wider font-title group"
                                    size="lg"
                                    isLoading={sessionPending}
                                >
                                    <span className="font-bold">Play Now</span>
                                    <svg
                                        className="w-6 fill-current group-hover:scale-125 duration-100"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8.5 15.5v-7l6 3.5z"></path>
                                    </svg>
                                </Button>
                            </Link>
                        ) : (
                            <div className="flex gap-5 items-center">
                                <span className="font-bold text-2xl tracking-wide text-primary">Get Started</span>
                                <Link href={urlsData?.googleUrl ?? ""}>
                                    <Button
                                        className="bg-blue-500 text-white"
                                        size="lg"
                                        onClick={() => setIsLoading(true)}
                                    >
                                        {isLoading ? (
                                            <div className="flex justify-center">
                                                <span className="loading loading-dots loading-md"></span>
                                            </div>
                                        ) : (
                                            <svg
                                                className="w-7 fill-current group-hover:scale-125 duration-100"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                            </svg>
                                        )}
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Heading
