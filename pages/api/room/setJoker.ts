import type { NextApiRequest, NextApiResponse } from "next"
import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the request method is PUT
    if (req.method !== "PUT") {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        const { id, user_pseudo } = req.body

        // Check if id is missing in the request body
        if (!id) {
            res.status(400).json({ success: false, error: "Missing required field: id" })
            return
        }

        // Split the user_pseudo string into an array and filter out any empty values
        const user_array = user_pseudo.split(', ');
        const user_array_filtered = user_array.filter(Boolean)

        // Randomly select a joker from the filtered user_array
        const joker = user_array_filtered[Math.floor(Math.random() * user_array_filtered.length)]

        // Construct a query to update the joker of the room with the provided id
        const updateQuery = e.update(e.Room, () => ({
            filter_single: { id: e.uuid(id) }, // Filter the room by its id
            set: {
                joker: joker // Update the joker
            },
        }))

        await updateQuery.run(client)

        res.status(200).json({ success: true, message: 'Joker set' })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ success: false, error: error })
    }
}

