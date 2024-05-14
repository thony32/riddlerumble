import { auth } from "@/edgedb"
import { redirect } from "next/navigation";
export default async function Game() {
    const session = auth.getSession();
    if (await session.isSignedIn() == false) {
        redirect('/')
    }
    return (
        <div className="space-y-5">
            Game here
        </div>
    )
}