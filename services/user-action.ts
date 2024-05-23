"use server"
import e, { createClient } from "@/dbschema/edgeql-js"
import { auth } from "@/edgedb"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const client = createClient({
    instanceName: EDGEDB_INSTANCE,
    secretKey: EDGEDB_SECRET_KEY,
})

export async function getSession() {
    const session = auth.getSession()
    return await session.isSignedIn()
}

export async function getData() {
    const isSignedIn = await getSession()
    const identityCookie = cookies().get("identity")?.value as string
    if (!identityCookie) {
        redirect(auth.getSignoutUrl())
    }
    const identity = identityCookie.replace(/"/g, "")
    const getUserData = e.select(e.Users, (user) => ({
        id: true,
        avatar: true,
        email: true,
        full_name: true,
        pseudo: true,
        score: true,
        nationality: true,
        filter_single: e.op(user.identity.id, "=", e.uuid(identity)),
    }))
    const user = await getUserData.run(client)
    return { user, isSignedIn }
}

export async function getOAuthUrl() {
    const googleUrl = auth.getOAuthUrl("builtin::oauth_google")

    return { googleUrl }
}

export async function getLogoutUrl() {
    const logoutUrl = auth.getSignoutUrl()
    return logoutUrl
}
