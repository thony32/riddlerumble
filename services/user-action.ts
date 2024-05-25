"use server"
import e, { createClient } from "@/dbschema/edgeql-js"
import { auth } from "@/edgedb"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Create an EdgeDB client with instance name and secret key
const client = createClient({
    instanceName: EDGEDB_INSTANCE,
    secretKey: EDGEDB_SECRET_KEY,
})

// Function to get the current session and check if the user is signed in
export async function getSession() {
    const session = auth.getSession() // Get the current session
    return await session.isSignedIn() // Check if the session is signed in and return the result
}

// Function to get user data
export async function getData() {
    const isSignedIn = await getSession() // Check if the user is signed in
    const identityCookie = cookies().get("identity")?.value as string // Get the identity cookie
    if (!identityCookie) {
        redirect(auth.getSignoutUrl()) // Redirect to sign out URL if no identity cookie is found
    }
    const identity = identityCookie.replace(/"/g, "") // Remove double quotes from the identity cookie value

    // Query to select user data from the database
    const getUserData = e.select(e.Users, (user) => ({
        id: true,
        avatar: true,
        email: true,
        full_name: true,
        pseudo: true,
        score: true,
        nationality: true,
        filter_single: e.op(user.identity.id, "=", e.uuid(identity)), // Filter user by identity
    }))

    const user = await getUserData.run(client) // Run the query to get user data
    return { user, isSignedIn } // Return user data and sign-in status
}

// Function to get the OAuth URL for Google
export async function getOAuthUrl() {
    const googleUrl = auth.getOAuthUrl("builtin::oauth_google") // Get the Google OAuth URL

    return { googleUrl } // Return the Google OAuth URL
}

// Function to get the logout URL
export async function getLogoutUrl() {
    const logoutUrl = auth.getSignoutUrl() // Get the sign-out URL
    return logoutUrl // Return the sign-out URL
}
