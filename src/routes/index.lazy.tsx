import Heading from "@/components/landing/heading"
import Ranking from "@/components/landing/ranking"
import TutoVideo from "@/components/landing/tuto-video"
import { createLazyFileRoute } from "@tanstack/react-router"
import "plyr-react/plyr.css"
import * as edgedb from "edgedb";
import { useEffect } from "react"

const client = edgedb.createHttpClient({
    instanceName:"codeipsum/enigmap",
    secretKey:"nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pLmFsbCI6dHJ1ZSwiZWRiLnIuYWxsIjp0cnVlLCJpYXQiOjE3MTU0NTU1MTcsImlzcyI6ImF3cy5lZGdlZGIuY2xvdWQiLCJqdGkiOiJNekJOLWdfTUVlLWRSUk9TQ0UwQ0dnIiwic3ViIjoienhGSHdnNDVFZS1iVUxNYS05bmdBZyJ9.38lZS_M1bPWSGFgBw7Gn1TdBal8YM1L7Mge5xSAk0poiSDsTYJ4PDq38LeGmSlsO8kbmag1MKtYj5QhZUAAwuAnbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pLmFsbCI6dHJ1ZSwiZWRiLnIuYWxsIjp0cnVlLCJpYXQiOjE3MTU0NTU2NjgsImlzcyI6ImF3cy5lZGdlZGIuY2xvdWQiLCJqdGkiOiJqT1UtM0FfTUVlLXo0THRmTTBpNkFnIiwic3ViIjoiMzhISm9nMWRFZS1za2d1Z2lEWFh3USJ9.e8GcILVSKhh3nFAijvAdf1l8FBe5YVxUzYgVeKBkJ4_4fS6VEUvxmU5wd8-6DSr5gLVuZf-Go43bKuTWWVr75wnbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pLmFsbCI6dHJ1ZSwiZWRiLnIuYWxsIjp0cnVlLCJpYXQiOjE3MTU0NTU1MTcsImlzcyI6ImF3cy5lZGdlZGIuY2xvdWQiLCJqdGkiOiJNekJOLWdfTUVlLWRSUk9TQ0UwQ0dnIiwic3ViIjoienhGSHdnNDVFZS1iVUxNYS05bmdBZyJ9.38lZS_M1bPWSGFgBw7Gn1TdBal8YM1L7Mge5xSAk0poiSDsTYJ4PDq38LeGmSlsO8kbmag1MKtYj5QhZUAAwuA"
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
