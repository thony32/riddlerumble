
import Heading from "@/components/landing/Heading";
import Ranking from "@/components/landing/Ranking";
import TutoVideo from "@/components/landing/TutoVideo";

export default async function Home() {
    return (
        <div className="space-y-5">
            <Heading />
            <TutoVideo />
            <Ranking />
        </div>
    )
}
