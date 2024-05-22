import { redirect } from "next/navigation"
import { auth } from "@/edgedb"
import { createUser } from "@/services/edgedb-action"
import { cookies } from "next/headers";

const { GET, POST } = auth.createAuthRouteHandlers({
    async onOAuthCallback({ error, tokenData, provider, isSignUp }) {
        if (error) {
            return redirect(`?oauth_error=${encodeURIComponent(`OAuth sign in failed: ${error.message}`)}`)
        }
        cookies().set('identity', JSON.stringify(tokenData.identity_id))
        if (isSignUp) {
            await createUser(tokenData, provider);
        }
        redirect("/game")
    },
    onSignout() {
        cookies().delete('identity');
        redirect("/")
    },
})

export { GET, POST }
