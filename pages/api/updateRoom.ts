import type { NextApiRequest, NextApiResponse } from "next"
import e, { createClient } from "@/dbschema/edgeql-js"
import { pusherServer } from "@/lib/pusher"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        const client = createClient({
            instanceName: EDGEDB_INSTANCE,
            secretKey: EDGEDB_SECRET_KEY,
        })

        const { id, delay, latitude, longitude, nb_players, prompt, user_pseudo } = req.body

        if (!id) {
            res.status(400).json({ success: false, error: "Missing required field: id" })
            return
        }

        const updateQuery = e.update(e.Room, (room) => ({
            filter_single: { id: e.uuid(id) },
            set: {
                delay: e.int32(delay ?? 0),
                latitude: e.float32(latitude ?? 0),
                longitude: e.float32(longitude ?? 0),
                nb_players: e.int32(nb_players ?? 0),
                prompt: e.str(prompt ?? ""),
                user_pseudo: e.str(user_pseudo ?? ""),
            },
        }))

        await updateQuery.run(client)

        const selectQuery = e.select(e.Room, (room) => ({
            filter_single: { id: e.uuid(id) },
            id: true,
            delay: true,
            latitude: true,
            longitude: true,
            nb_players: true,
            prompt: true,
            user_pseudo: true,
        }))

        const result = await selectQuery.run(client)

        pusherServer.trigger(id, "join-room", {
            id: id,
            nb_players: nb_players,
            user_pseudo: user_pseudo,
        })

        res.status(200).json({ success: true, result })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ success: false, error: error })
    }
}
