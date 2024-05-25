import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        const { latitude, longitude, time, id_room, id_user } = req.body

        const insertQuery = e.insert(e.Temp_room, {
            latitude: e.float32(latitude),
            longitude: e.float32(longitude),
            time: e.str(time),
            User: e.select(e.Users, () => ({
                filter_single: { id: e.uuid(id_user) },
            })),
            Room: e.select(e.Room, () => ({
                filter_single: { id: e.uuid(id_room) },
            })),
        })

        await insertQuery.run(client)

        const selectQuery = e.select(e.Temp_room, (temp_room) => ({
            filter: e.op(temp_room.Room.id, "=", e.uuid(id_room as string)),
        }))
        const tempRoom = await selectQuery.run(client)

        

        res.status(200).json({ success: true, temp_room: tempRoom.length })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
