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
        // Destructure the score, id_room, and id_user from the request body
        const { score, id_room, id_user } = req.body

        // Construct a query to insert a new Player_stats entry
        const insertQuery = e.insert(e.Player_stats, {
            score: e.float32(score),
            // Select the User associated with the provided id_user
            User: e.select(e.Users, () => ({
                filter_single: { id: e.uuid(id_user) },
            })),
            // Select the Room associated with the provided id_room
            Room: e.select(e.Room, () => ({
                filter_single: { id: e.uuid(id_room) },
            })),
        })

        const result = await insertQuery.run(client)

        res.status(200).json({ success: true, player_stats: result })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}

