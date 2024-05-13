import { createClient } from "edgedb"
import createAuth from "@edgedb/auth-nextjs/app"

export const client = createClient({
    instanceName: process.env.EDGEDB_INSTANCE,
    secretKey: process.env.EDGEDB_SECRET_KEY,
})

export const auth = createAuth(client, {
    baseUrl: "http://localhost:3000",
})
