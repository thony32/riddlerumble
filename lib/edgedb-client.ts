import { createClient } from "@/dbschema/edgeql-js"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"

const client = createClient({
    instanceName: EDGEDB_INSTANCE,
    secretKey: EDGEDB_SECRET_KEY,
})

export default client
