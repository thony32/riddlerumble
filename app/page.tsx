import Heading from "@/components/landing/Heading";
import ModelContainer from "@/components/landing/ModelContainer";
import Ranking from "@/components/landing/Ranking";
import TutoVideo from "@/components/landing/TutoVideo";

export default async function Home() {
    return (
        <div className="space-y-5">
            <Heading />
            <div className="absolute top-[50%] -z-50 left-0 w-full h-screen">
                <ModelContainer />
            </div>
            <TutoVideo />
            <Ranking />
        </div>
    )
}
