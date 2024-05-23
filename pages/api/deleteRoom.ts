import type { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@/dbschema/edgeql-js"
import { pusherServer } from "@/lib/pusher"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        const client = createClient({
            instanceName: EDGEDB_INSTANCE,
            secretKey: EDGEDB_SECRET_KEY,
        })

        const { id } = req.body

        if (!id) {
            res.status(400).json({ success: false, error: "Missing required field: id" })
            return
        }

        const query = `
        delete Room
        filter .id = <uuid>$id
        `

        const params = { id: id }

        const result = await client.query(query, params)

        pusherServer.trigger(id, "delete-room", { id })

        res.status(200).json({ success: true, result })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ success: false, error: error })
    }
}
