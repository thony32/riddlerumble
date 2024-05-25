import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id_room } = req.body

        // Construct the query to update the room's isActive status to false
        const disableRoomQuery = e.update(e.Room, () => ({
            filter_single: { id: id_room }, // Filter the room by the given ID
            set: {
                isActive: false, // Set isActive to false to disable the room
            },
        }))

        await disableRoomQuery.run(client)

        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
