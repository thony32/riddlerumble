import Heading from "@/components/landing/heading"
import Ranking from "@/components/landing/ranking"
import TutoVideo from "@/components/landing/tuto-video"
import { createLazyFileRoute } from "@tanstack/react-router"
import "plyr-react/plyr.css"
import * as edgedb from "edgedb";
import { useEffect } from "react"

const client = edgedb.createHttpClient();

export const Route = createLazyFileRoute("/")({
    component: Index,
})

function Index() {
    useEffect(() => {
        const fetchData = async () => {
            const result = await client.querySingle(`select Room { * }`);
            console.log(result);
        }
        fetchData();
    }, [])
    return (
        <div>
            <Heading />
            <TutoVideo />
            <Ranking />
        </div>
    )
}
