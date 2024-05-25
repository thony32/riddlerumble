"use server"

import { BuiltinProviderNames, TokenData } from "@edgedb/auth-nextjs/app"
import { auth, client } from "@/edgedb"
import { cookies } from "next/headers"

export const { signout, emailPasswordSignIn, emailPasswordSignUp, emailPasswordSendPasswordResetEmail, emailPasswordResetPassword, emailPasswordResendVerificationEmail } = auth.createServerActions()

// Function to create a new user
export async function createUser(tokenData: TokenData, provider?: BuiltinProviderNames) {
    let fullname: string | null = null
    let email: string | null = null
    let avatar: string | null = null

    // Check if the provider is Google OAuth and fetch user info from Google API
    if (tokenData.provider_token && provider === "builtin::oauth_google") {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenData.provider_token}`)
        if (!response.ok) {
            throw new Error('Failed to fetch user info from Google')
        }
        const data = await response.json()
        fullname = data.name
        email = data.email
        avatar = data.picture
    }

    // Insert new user into the database
    await client.query(
        `
        with identity := (select ext::auth::Identity filter .id = <uuid>$identity_id),
        insert Users {
          identity := identity,
          nationality := <str>$nationality,
          score := 0,
          avatar := <str>$avatar,
          pseudo := <str>$pseudo,
          full_name := <str>$fullname,
          email := <str>$email,
        };`,
        {
            identity_id: tokenData.identity_id,
            nationality: cookies().get('nationality')?.value ?? "Madagascar, MG", // Get nationality from cookies or default to "Madagascar, MG"
            avatar: avatar, // User's avatar URL from Google or null
            pseudo: cookies().get('pseudo')?.value ?? "Anonymous", // Get pseudo from cookies or default to "Anonymous"
            fullname: fullname,
            email: email,
        }
    )
}
