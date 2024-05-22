import { NextApiRequest, NextApiResponse } from "next"
import e, { createClient } from "@/dbschema/edgeql-js"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"
import { MAX_PLAYERS } from "@/utils/constants"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: EDGEDB_INSTANCE,
        secretKey: EDGEDB_SECRET_KEY,
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
        isActive: true,
        order_by: {
            expression: room.modified_at,
            direction: e.DESC,
        },
        filter: e.op(e.op(room.isActive, "=", true), "and", e.op(room.nb_players, "<", MAX_PLAYERS)),
    }))
    const rooms = await roomsQuery.run(client)

    res.status(200).json(rooms)
}
