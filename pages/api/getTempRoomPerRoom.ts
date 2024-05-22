import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@/dbschema/edgeql-js"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: EDGEDB_INSTANCE,
        secretKey: EDGEDB_SECRET_KEY,
    })

    try {
        const tempRoomQuery = `
            select Temp_room {
                id,
                latitude,
                longitude,
                time,
                User: {
                  pseudo,
                  nationality,
                  avatar
                },
              }filter .Room.id = <uuid>$id_room;
            `
        const params = {
            id_room: req.body.id_room,
        }

        const response = await client.query(tempRoomQuery, params)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error })
    }
}
