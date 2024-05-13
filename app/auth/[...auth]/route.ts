import { redirect } from "next/navigation";
import { auth } from "@/edgedb";
import { createUser } from "@/services/edgedb-action";

const { GET, POST } = auth.createAuthRouteHandlers({
    async onOAuthCallback({ error, tokenData, provider, isSignUp }) {
        if (error) {
            return redirect(
                `?oauth_error=${encodeURIComponent(
                    `OAuth sign in failed: ${error.message}`
                )}`
            );
        }
        if (isSignUp) {
            await createUser(tokenData, provider);
        }
        redirect("/");
    },
    onSignout() {
        redirect("/");
    },
});

export { GET, POST };