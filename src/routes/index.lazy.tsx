import Heading from "@/components/landing/heading"
import Ranking from "@/components/landing/ranking"
import TutoVideo from "@/components/landing/tuto-video"
import { createLazyFileRoute } from "@tanstack/react-router"
import "plyr-react/plyr.css"
import * as edgedb from "edgedb";
import { useEffect } from "react"

const client = edgedb.createHttpClient({
    instanceName:"thony32/enigmap",
    secretKey:"nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pLmFsbCI6dHJ1ZSwiZWRiLnIuYWxsIjp0cnVlLCJpYXQiOjE3MTU0NTI5MDIsImlzcyI6ImF3cy5lZGdlZGIuY2xvdWQiLCJqdGkiOiJIQ3NzSUFfR0VlLWRHcmNFTTZMalNRIiwic3ViIjoienhGSHdnNDVFZS1iVUxNYS05bmdBZyJ9.oR-f8SqL4soa0idgNBQxVr1msAN20_UE0cq0joeCHo3lFrZhewbWRpy8rhIRFtZLwdpu4MWWi4H9JdbynCxXYg"
});

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
