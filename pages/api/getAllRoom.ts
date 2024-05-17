import { NextApiRequest, NextApiResponse } from "next";
import e, { createClient } from "@/dbschema/edgeql-js"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: process.env.EDGEDB_INSTANCE,
        secretKey: process.env.EDGEDB_SECRET_KEY,
    })

    // const getRoomData = e.select(e.Room, (room) => ({
    //     id: true,
    //     delay: true,
    //     latitude: true,
    //     longitude: true,
    //     nb_players: true,
    //     prompt: true,
    //     user_pseudo: true,
    // }))
    // const room = await getRoomData.run(client)
    const rooms = await client.query(`
    select Room {
        id,
        delay,
        latitude,
        longitude,
        nb_players,
        prompt,
        user_pseudo
    }
`)
    res.status(200).json(rooms) 
}