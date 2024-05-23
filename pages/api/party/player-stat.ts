import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        const { score, id_room, id_user } = req.body

        const insertQuery = e.insert(e.Player_stats, {
            score: e.float32(score),
            User: e.select(e.Users, () => ({
                filter_single: { id: e.uuid(id_user) },
            })),
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
