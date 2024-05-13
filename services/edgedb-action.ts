"use server";
import { Octokit } from "@octokit/core";
import { BuiltinProviderNames, TokenData } from "@edgedb/auth-nextjs/app";
import { auth, client } from "@/edgedb";

// Auth actions

export const {
    signout,
    emailPasswordSignIn,
    emailPasswordSignUp,
    emailPasswordSendPasswordResetEmail,
    emailPasswordResetPassword,
    emailPasswordResendVerificationEmail,
} = auth.createServerActions();

export async function createUser(
    tokenData: TokenData,
) {

    await client.query(
        `
        with identity := (select ext::auth::Identity filter .id = <uuid>$identity_id),
        insert Users {
          identity := identity,
        };`,
        {
            identity_id: tokenData.identity_id,
        }
    );
}