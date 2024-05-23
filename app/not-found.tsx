import { Button } from "@nextui-org/button"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-4">
            <h1 className="text-9xl">404</h1>
            <h2 className="text-7xl">Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/">
                <Button>Return Home</Button>
            </Link>
        </div>
    )
}
