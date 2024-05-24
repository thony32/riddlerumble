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
                nb_players: 1, // mila ovaina refa vita migration
                prompt: e.str(prompt ?? ""),
                user_pseudo: e.str(user_pseudo ?? ""),
            },
        }))

        const selectQuery = e.select(updateQuery, () => ({
            filter_single: { id: e.uuid(id) },
            id: true,
            delay: true,
            latitude: true,
            longitude: true,
            prompt: true,
            user_pseudo: true,
        }))

        const result = await selectQuery.run(client)

        socket.emit(
            "send",
            JSON.stringify({
                type: "update",
                success: true,
            })
        )

        res.status(200).json({ success: true, result })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ success: false, error: error })
    }
}
