import type { NextApiRequest, NextApiResponse } from "next"
import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the request method is PUT
    if (req.method !== "PUT") {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    // Destructure the request body to extract necessary fields
    const { id, delay, latitude, longitude, prompt, user_pseudo } = req.body

    // Check if id is missing in the request body
    if (!id) {
        res.status(400).json({ success: false, error: "Missing required field: id" })
        return
    }

    // Construct a query to update the room with the provided id
    const updateQuery = e.update(e.Room, () => ({
        filter_single: { id: e.uuid(id) },
        set: {
            delay: e.int32(delay ?? 0),
            latitude: e.float32(latitude ?? 0),
            longitude: e.float32(longitude ?? 0),
            prompt: e.str(prompt ?? ""),
            user_pseudo: e.str(user_pseudo ?? ""),
        },
    }))

    await updateQuery.run(client)

    // Return a success response with status 200 and a message
    res.status(200).json({ success: true, message: "Room update" })
}

