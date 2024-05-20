import { NextApiRequest, NextApiResponse } from "next"
import e, { createClient } from "@/dbschema/edgeql-js"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: process.env.EDGEDB_INSTANCE,
        secretKey: process.env.EDGEDB_SECRET_KEY,
    })

    const roomsQuery = e.select(e.Room, (room) => ({
        id: true,
        latitude: true,
        longitude: true,
        prompt: true,
        delay: true,
        level: true,
        nb_players: true,
        user_pseudo: true,
        created_at: true,
        modified_at: true,
        order_by: {
            expression: room.modified_at,
            direction: e.DESC,
        },
    }));
    const rooms = await roomsQuery.run(client)

    res.status(200).json(rooms)
}
