import { NextApiRequest, NextApiResponse } from "next"
import e, { createClient } from "@/dbschema/edgeql-js"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: process.env.EDGEDB_INSTANCE,
        secretKey: process.env.EDGEDB_SECRET_KEY,
    })

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
        filter_single: { id: req.body.room_id },
    }))
    const room = await roomQuery.run(client)

    res.status(200).json(room)
}
