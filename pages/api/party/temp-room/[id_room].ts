import { NextApiRequest, NextApiResponse } from "next"
import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id_room } = req.query

        const tempRoomQuery = e.select(e.Temp_room, (temp_room) => ({
            id: true,
            latitude: true,
            longitude: true,
            time: true,
            User: {
                pseudo: true,
                nationality: true,
                avatar: true,
            },
            filter: e.op(temp_room.Room.id, "=", e.uuid(id_room as string)),
        }))

        const temp_room = await tempRoomQuery.run(client)
        res.status(200).json(temp_room)
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error })
    }
}
