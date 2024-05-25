"use client"

import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen min-w-screen flex flex-col justify-center gap-4 items-center text-center">
            <Image className="w-1/3" src="/images/500.svg" width={800} height={600} alt="404" />
            <Button
                onClick={
                    () => reset()
                }
            >
                Try again
            </Button>
        </div>
    )
}
