import { redirect } from "next/navigation"
import { auth } from "@/edgedb"
import { createUser } from "@/services/edgedb-action"

const { GET, POST } = auth.createAuthRouteHandlers({
    async onOAuthCallback({ error, tokenData, isSignUp }) {
        if (error) {
            return redirect(`?oauth_error=${encodeURIComponent(`OAuth sign in failed: ${error.message}`)}`)
        }
        if (isSignUp) {
            const response = await fetch('/api/getClientNationality');
            if (!response.ok) {
                throw new Error('Failed to fetch IP info');
            }
            const data = await response.json();
            await createUser(tokenData, data.localisation.country);
        }
        redirect("/")
    },
    onSignout() {
        redirect("/")
    },
})

export { GET, POST }
