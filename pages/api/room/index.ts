import { NextApiRequest, NextApiResponse } from "next"
import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"
import getUsersPseudo from "@/utils/getUsersPseudo"
import { MAX_PLAYERS } from "@/utils/constants"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const roomsQuery = e.select(e.Room, (room) => ({
        id: true,
        latitude: true,
        longitude: true,
        prompt: true,
        delay: true,
        level: true,
        user_pseudo: true,
        created_at: true,
        modified_at: true,
        isActive: true,
        order_by: {
            expression: room.created_at,
            direction: e.DESC,
        },
        filter: e.op(room.isActive, "=", true),
    }))
    const rooms = await roomsQuery.run(client)
    

    res.status(200).json(rooms)
}
