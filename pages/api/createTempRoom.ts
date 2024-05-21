import { createClient } from "@/dbschema/edgeql-js"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        const client = createClient({
            instanceName: EDGEDB_INSTANCE,
            secretKey: EDGEDB_SECRET_KEY,
        })

        const { latitude, longitude, time, id_room, id_user } = req.body
        await client.querySingle(
            `
                select (
                    insert default::Temp_room {
                        latitude := <float32>$latitude,
                        longitude := <float32>$longitude,
                        time := <str>$time,
                        id_user := (select detached default::Users filter .id = <uuid>$id_user),
                        id_room := (select detached default::Room filter .id = <uuid>$id_room),
                    }
                ) {latitude, longitude, time, id_user, id_room}`,
            {
                latitude: latitude,
                longitude: longitude,
                time: time,
                id_user: id_user,
                id_room: id_room,
            }
        )
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
