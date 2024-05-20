import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@/dbschema/edgeql-js"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: process.env.EDGEDB_INSTANCE,
        secretKey: process.env.EDGEDB_SECRET_KEY,
    })

    try {
        const tempRoomQuery =
            `
                select Temp_room {
                    id,
                    latitude,
                    longitude,
                    time,
                    id_user: {
                        pseudo,
                        nationality,
                        avatar,
                        full_name
                    },
                    id_room: {
                    } filter .id = <uuid>$id_room
                };
            `
        const params = {
            id_room: "20b56dc2-16ca-11ef-bb7b-9fefffc6af34"
        }

        const response = await client.query(tempRoomQuery, params)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
