import type { NextApiRequest, NextApiResponse } from "next"
import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"
import { socket } from "@/lib/socket-io"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        const { id, delay, latitude, longitude, prompt, user_pseudo } = req.body

        if (!id) {
            res.status(400).json({ success: false, error: "Missing required field: id" })
            return
        }

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

        socket.emit("room-create")

        res.status(200).json({ success: true, message: "Room update" })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ success: false, error: error })
    }
}
