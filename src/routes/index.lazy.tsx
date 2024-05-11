import Heading from "@/components/landing/heading"
import Ranking from "@/components/landing/ranking"
import TutoVideo from "@/components/landing/tuto-video"
import { createLazyFileRoute } from "@tanstack/react-router"
import "plyr-react/plyr.css"
import { useEffect } from "react"
import * as edgedb from "edgedb"

export const Route = createLazyFileRoute("/")({
    component: Index,
})

const client = edgedb.createHttpClient()

function Index() {
    useEffect(() => {
        const fetch = async () => {
            const result = await client.querySingle(`select Room { * }`)
            console.log(result)
        }
        fetch()
    }, [])
    return (
        <div>
            <Heading />
            <TutoVideo />
            <Ranking />
        </div>
    )
}
