import type { NextApiRequest, NextApiResponse } from "next"
import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the request method is PUT
    if (req.method !== "PUT") {
        // If not, return a 405 Method Not Allowed response
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        // Extract id and bombCoordonate from the request body
        const { id, bombCoordonate } = req.body

        // Check if id is missing in the request body
        if (!id) {
            res.status(400).json({ success: false, error: "Missing required field: id" })
            return
        }

        // Construct a query to update the bomb coordinates of the room with the provided id
        const updateQuery = e.update(e.Room, () => ({
            filter_single: { id: e.uuid(id) }, // Filter the room by its id
            set: {
                bombCoordinates: bombCoordonate // Update the bomb coordinates
            },
        }))

        await updateQuery.run(client)

        res.status(200).json({ success: true, message: 'Bomb set' })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ success: false, error: error })
    }
}

