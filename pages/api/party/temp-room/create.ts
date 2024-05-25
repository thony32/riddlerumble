import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the request method is POST
    if (req.method != "POST") {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        // Destructure the latitude, longitude, time, id_room, and id_user from the request body
        const { latitude, longitude, time, id_room, id_user } = req.body

        // Construct a query to insert a new Temp_room entry
        const insertQuery = e.insert(e.Temp_room, {
            latitude: e.float32(latitude),
            longitude: e.float32(longitude),
            time: e.str(time),
            // Select the User associated with the provided id_user
            User: e.select(e.Users, () => ({
                filter_single: { id: e.uuid(id_user) },
            })),
            // Select the Room associated with the provided id_room
            Room: e.select(e.Room, () => ({
                filter_single: { id: e.uuid(id_room) },
            })),
        })

        await insertQuery.run(client)

        // Construct a query to select Temp_room entries associated with the provided id_room
        const selectQuery = e.select(e.Temp_room, (temp_room) => ({
            filter: e.op(temp_room.Room.id, "=", e.uuid(id_room as string)),
        }))
        
        const tempRoom = await selectQuery.run(client)

        res.status(200).json({ success: true, temp_room: tempRoom.length })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}

