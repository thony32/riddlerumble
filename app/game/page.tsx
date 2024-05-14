import Navbar from "@/components/game/Navbar";
import { auth, client } from "@/edgedb"
import { redirect } from "next/navigation";
import e from "@/dbschema/edgeql-js"
import { cookies } from "next/headers";

export default async function Game() {
    const session = auth.getSession();
    if (await session.isSignedIn() == false) {
        redirect('/')
    }

    const identityCookie = cookies().get('identity')?.value as string;
    const identity = identityCookie.replace(/"/g, '');
    const getUserData = e.select(e.Users, (user) => ({
        avatar: true,
        email: true,
        full_name: true,
        pseudo: true,
        score: true,
        nationality: true,
        filter_single: e.op(user.identity.id, '=', e.uuid(identity))
    }))
    const user = await getUserData.run(client)
    return (
        <div>
            <Navbar user={user} />
        </div>
    )
}