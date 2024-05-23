import Mockup from "@/components/landing/Mockup"
import dynamic from "next/dynamic"
const Heading = dynamic(() => import("@/components/landing/Heading"))
const ModelContainer = dynamic(() => import("@/components/landing/ModelContainer"))
const Ranking = dynamic(() => import("@/components/landing/Ranking"))
const TutoVideo = dynamic(() => import("@/components/landing/TutoVideo"))

export default async function Home() {
    return (
        <div className="space-y-10 sm:space-y-20 overflow-y-hidden">
            <Heading />
            <div className="absolute top-[50%] -z-50 left-0 w-full h-screen">
                <ModelContainer />
            </div>
            <TutoVideo />
            <Ranking />
            <Mockup />
        </div>
    )
}
