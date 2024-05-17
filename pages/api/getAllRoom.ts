import { NextApiRequest, NextApiResponse } from "next";
import e, { createClient } from "@/dbschema/edgeql-js"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: process.env.EDGEDB_INSTANCE,
        secretKey: process.env.EDGEDB_SECRET_KEY,
    })

    const getRoomData = e.select(e.Room, (room) => ({
        delay: true,
        latitude: true,
        longitude: true,
        nb_players: true,
        prompt: true,
        user_pseudo: true,
        order_by: {
            expression: room.delay,
            direction: e.DESC,
        },
    }))
    const room = await getRoomData.run(client)
    res.status(200).json(room) 
}