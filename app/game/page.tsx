import Navbar from "@/components/game/Navbar";
import { auth } from "@/edgedb"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import UserAction from "@/services/user-action";

export default async function Game() {
    const session = auth.getSession();
    if (await session.isSignedIn() == false) {
        redirect('/')
    }

    const identityCookie = cookies().get('identity')?.value as string;
    const identity = identityCookie.replace(/"/g, '');
    const user = await UserAction.getData(identity);
    return (
        <div>
            <Navbar user={user} />
        </div>
    )
}