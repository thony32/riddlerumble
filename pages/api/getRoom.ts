import { NextApiRequest, NextApiResponse } from "next"
import e, { createClient } from "@/dbschema/edgeql-js"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: EDGEDB_INSTANCE,
        secretKey: EDGEDB_SECRET_KEY,
    })

    try {
        const roomQuery = e.select(e.Room, () => ({
            id: true,
            latitude: true,
            longitude: true,
            prompt: true,
            delay: true,
            level: true,
            user_pseudo: true,
            nb_players: true,
            created_at: true,
            modified_at: true,
            isActive: true,
            filter_single: { id: e.uuid(req.body.room_id) },
        }))
        const room = await roomQuery.run(client)

        if (!room) {
            res.status(404).json({ error: "Room not found" })
            return
        }

        res.status(200).json(room)
    } catch (error) {
        res.status(404).json({ error })
    }
}
