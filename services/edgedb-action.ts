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
    provider?: BuiltinProviderNames
) {
    let username: string | null = null;
    if (tokenData.provider_token && provider === "builtin::oauth_github") {
        const { data } = await new Octokit({
            auth: tokenData.provider_token,
        }).request("get /user");

        username = data.login;
    }
    await client.query(
        `
  with identity := (select ext::auth::Identity filter .id = <uuid>$identity_id),
  insert Users {
    identity := identity,
    name := <optional str>$username ?? (
      select ext::auth::EmailFactor filter .identity = identity
    ).email
  } unless conflict on .identity`,
        {
            identity_id: tokenData.identity_id,
            username: username,
        }
    );
}