import { Button } from "@nextui-org/button"
import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-4">
            <Image className="w-1/3" src="/images/404.svg" width={800} height={600} alt="404" />
            <Link href="/">
                <Button>Return Home</Button>
            </Link>
        </div>
    )
}
