import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id_user, id_room } = req.body

        const userScoreUpdateQuery = e.update(e.Player_stats, (player_stats) => ({
            filter: e.op(e.op(player_stats.User.id, "=", e.uuid(id_user)), 'and', e.op(player_stats.Room.id, "=", e.uuid(id_room))),
            set: {
                score: 0,
            },
        }))

        await userScoreUpdateQuery.run(client)

        res.status(200).json({ success: true, message: "Stats User score updated successfully" })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
