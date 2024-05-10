import Heading from "@/components/landing/heading"
import Ranking from "@/components/landing/ranking"
import TutoVideo from "@/components/landing/tuto-video"
import { createLazyFileRoute } from "@tanstack/react-router"
import "plyr-react/plyr.css"

export const Route = createLazyFileRoute("/")({
    component: Index,
})

function Index() {
    return (
        <div>
            <Heading />
            <TutoVideo />
            <Ranking />
        </div>
    )
}
