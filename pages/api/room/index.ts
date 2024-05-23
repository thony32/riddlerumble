import { NextApiRequest, NextApiResponse } from "next"
import e from "@/dbschema/edgeql-js"
import { MAX_PLAYERS } from "@/utils/constants"
import client from "@/lib/edgedb-client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
