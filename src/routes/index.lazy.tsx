import Heading from "@/components/landing/heading"
import Ranking from "@/components/landing/ranking"
import TutoVideo from "@/components/landing/tuto-video"
import { createLazyFileRoute } from "@tanstack/react-router"
import "plyr-react/plyr.css"
import { createHttpClient } from "edgedb";
import { useEffect } from "react"
// import { createClient } from "";


export const Route = createLazyFileRoute("/")({
    component: Index,
})



function Index() {
    useEffect(() => {
        function fetchData() {
            const query = encodeURIComponent("select Post {*}");
            const url = `https://enigmap--codeipsum.c-82.i.aws.edgedb.cloud:5656/branch/main/edgeql?query=${query}`;

            fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer nbwt1_eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZGIuZC5hbGwiOnRydWUsImVkYi5pLmFsbCI6dHJ1ZSwiZWRiLnIuYWxsIjp0cnVlLCJpYXQiOjE3MTU0NjQyOTAsImlzcyI6ImF3cy5lZGdlZGIuY2xvdWQiLCJqdGkiOiJuX2RjLUFfZ0VlLXYybGZWQkF0NmhnIiwic3ViIjoienhGSHdnNDVFZS1iVUxNYS05bmdBZyJ9.Qq9Amq5Gg-hJtAQdVsw72XdsOdKdSja6qwzGe21Upy-hHr9hK0J9k4hh7QMFzNSXavOMoMbatY8apVRd_JRuzg",
                    "Content-Type": "application/json"
                },
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error("Error:", error));
        }

        // Call the function to fetch the data
        fetchData();


    }, [])
    return (
        <div>
            <Heading />
        </div>
    )
}
