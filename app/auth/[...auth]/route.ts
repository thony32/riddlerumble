import { redirect } from "next/navigation";
import { auth } from "@/edgedb";

const { GET, POST } = auth.createAuthRouteHandlers({
    onOAuthCallback({ error, tokenData, isSignUp }) {
        redirect("/");
    },
    onSignout() {
        redirect("/");
    },
});

export { GET, POST };