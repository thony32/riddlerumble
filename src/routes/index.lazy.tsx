import Heading from "@/components/landing/heading"
import Ranking from "@/components/landing/ranking"
import TutoVideo from "@/components/landing/tuto-video"
import { createLazyFileRoute } from "@tanstack/react-router"
import "plyr-react/plyr.css"
import { createHttpClient } from "edgedb";
import { useEffect } from "react"

const client = createHttpClient({
    dsn:"edgedb://edgedb:wT37EZ7LqMYfj9E9G2zfVhXA@enigmap--codeipsum.c-82.i.aws.edgedb.cloud:10700/main"
});

export const Route = createLazyFileRoute("/")({
    component: Index,
})

function Index() {
    useEffect(() => {
        const fetchData = async () => {
            const result = await client.querySingle(`select 1 + 1`);
            console.log(result);
        }
        fetchData();
    }, [])
    return (
        <div>
            <Heading />
        </div>
    )
}
