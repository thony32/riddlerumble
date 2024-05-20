import { createClient } from "edgedb"
import createAuth from "@edgedb/auth-nextjs/app"

export const client = createClient({
    instanceName: process.env.EDGEDB_INSTANCE,
    secretKey: process.env.EDGEDB_SECRET_KEY,
})

const authLink = process.env.NODE_ENV === "production" ? "https://enigmap.vercel.app" : "http://localhost:3000"

export const auth = createAuth(client, {
    baseUrl: authLink,
})
