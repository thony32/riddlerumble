import { redirect } from "next/navigation"
import { auth } from "@/edgedb"
import { createUser } from "@/services/edgedb-action"
import { cookies } from 'next/headers';
import getIpInformation from "@/services/getIpInformation";

const { GET, POST } = auth.createAuthRouteHandlers({
    async onOAuthCallback({ error, tokenData, provider, isSignUp }) {
        if (error) {
            return redirect(`?oauth_error=${encodeURIComponent(`OAuth sign in failed: ${error.message}`)}`)
        }
        cookies().set('identity', JSON.stringify(tokenData.identity_id))
        if (isSignUp) {
            const ipInformation = await getIpInformation();
            await createUser(tokenData, ipInformation.localisation.country + ' , ' + ipInformation.localisation.countryCode, provider);
        }
        redirect("/game")
    },
    onSignout() {
        cookies().delete('identity');
        redirect("/")
    },
})

export { GET, POST }
