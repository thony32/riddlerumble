import Footer from "@/components/landing/Footer";
import Heading from "@/components/landing/Heading";
import TutoVideo from "@/components/landing/TutoVideo";

export default async function Home() {
    return (
        <div className="space-y-5">
            <Heading />
            <TutoVideo />
        </div>
    )
}
