import e, { createClient } from "@/dbschema/edgeql-js"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        const client = createClient({
            instanceName: EDGEDB_INSTANCE,
            secretKey: EDGEDB_SECRET_KEY,
        })

        const { score, id_room, id_user } = req.body

        const insertQuery = e.insert(e.Player_stats, {
            score: e.float32(score),
            id_user: e.select(e.Users, () => ({
                filter_single: { id: e.uuid(id_user) },
            })),
            id_room: e.select(e.Room, () => ({
                filter_single: { id: e.uuid(id_room) },
            })),
        })

        const result = await insertQuery.run(client)

        res.status(200).json({ success: true, player_stats: result })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
