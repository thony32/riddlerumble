"use server"
import { Octokit } from "@octokit/core"
import { BuiltinProviderNames, TokenData } from "@edgedb/auth-nextjs/app"
import { auth, client } from "@/edgedb"

// Auth actions

export const { signout, emailPasswordSignIn, emailPasswordSignUp, emailPasswordSendPasswordResetEmail, emailPasswordResetPassword, emailPasswordResendVerificationEmail } = auth.createServerActions()

export async function createUser(tokenData: TokenData, nationality: string, provider?: BuiltinProviderNames,) {
    let pseudo: string | null = null;
    let fullname: string | null = null;
    let email: string | null = null;
    let avatar: string | null = null;

    // if (tokenData.provider_token && provider === "builtin::oauth_google") {
    //     const { data } = await new Octokit({
    //         auth: tokenData.provider_token,
    //     }).request("get /user");

    //     fullname = data.login;
    // }

    // * for google
    if (tokenData.provider_token && provider === "builtin::oauth_google") {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenData.provider_token}`);
        if (!response.ok) {
            throw new Error('Failed to fetch IP info');
        }
        const data = await response.json();
        pseudo = data.name.toLowerCase().replace(/\s/g, '') + Math.floor(1000 + Math.random() * 9000);
        fullname = data.name;
        email = data.email;
        avatar = data.picture;
    }

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
            nationality: nationality,
            avatar: avatar,
            pseudo: pseudo,
            fullname: fullname,
            email: email,
        }
    )
}
