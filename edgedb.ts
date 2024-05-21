import { createClient } from "edgedb"
import createAuth from "@edgedb/auth-nextjs/app"
import { BASE_URL, EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "./env"

export const client = createClient({
    instanceName: EDGEDB_INSTANCE,
    secretKey: EDGEDB_SECRET_KEY,
})

export const auth = createAuth(client, {
    baseUrl: BASE_URL,
})
