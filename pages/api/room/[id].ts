import { NextApiRequest, NextApiResponse } from "next"
import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Construct a query to select a specific room based on the provided ID
        const roomQuery = e.select(e.Room, () => ({
            id: true,
            latitude: true,
            longitude: true,
            prompt: true,
            delay: true,
            level: true,
            user_pseudo: true,
            joker: true,
            bombCoordinates: true,
            created_at: true,
            modified_at: true,
            isActive: true,
            // Filter the room by its ID using the provided query parameter
            filter_single: { id: e.uuid(req.query.id as string) },
        }))
        
        const room = await roomQuery.run(client)

        // Check if the room exists
        if (!room) {
            res.status(404).json({ error: "Room not found" })
            return
        }

        res.status(200).json(room)
    } catch (error) {
        res.status(404).json({ error })
    }
}

