import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"
import { socket } from "@/lib/socket-io"
import { MAX_PLAYERS } from "@/utils/constants"
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

        const result = await insertQuery.run(client)

        const selectQuery = e.select(e.Temp_room, (temp_room) => ({
            filter: e.op(temp_room.Room.id, "=", e.uuid("67cd03c8-1a8f-11ef-9253-537f68dd2da1" as string)),
        }))
        const tempRoom = await selectQuery.run(client)

        if (tempRoom.length >= MAX_PLAYERS) {
            socket.emit("completed", id_room)
        }

        res.status(200).json({ success: true, temp_room: result })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
