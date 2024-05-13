import Link from "next/link"
import { Button } from "@nextui-org/button"
import { Chip } from "@nextui-org/react"
import Wordz from "../Misc/Wordz"
import SvgMapDraw from "../Misc/SvgMapDraw"
import { auth } from "@/edgedb"
import ButtonTest from "../button"

const Heading = async () => {
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
                        <Button
                            className="flex items-center gap-2 bg-blue-500 text-white tracking-wider font-title"
                            size="lg"
                        >
                            <span className="font-bold">Get Started</span>
                            <Link href={auth.getOAuthUrl("builtin::oauth_google")}>
                                <svg
                                    className="w-6 fill-current hover:scale-125 duration-100"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                </svg>
                            </Link>
                            <label className="text-xs">Or</label>
                            <svg
                                className="w-6 fill-current hover:scale-125 duration-100"
                                viewBox="0 0 24 24"
                            >
                                <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"></path>
                            </svg>
                        </Button>
                        <ButtonTest />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Heading
