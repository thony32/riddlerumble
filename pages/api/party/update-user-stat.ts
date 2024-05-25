import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id_user, id_room, bomb_point } = req.body

        const currentScoreQuery = e.select(e.Player_stats, (player_stats) => ({
            id: true,
            score: true,
            filter: e.op(e.op(player_stats.User.id, "=", e.uuid(id_user)), 'and', e.op(player_stats.Room.id, "=", e.uuid(id_room))
            ),
        }));

        const currentScore = await currentScoreQuery.run(client)

        const newScore = currentScore[0]?.score + parseInt(bomb_point)

        const userScoreUpdateQuery = e.update(e.Player_stats, () => ({
            filter_single: { id: currentScore[0]?.id },
            set: {
                score: newScore,
            },
        }))

        await userScoreUpdateQuery.run(client)

        res.status(200).json({ success: true, message: "Stats User score updated successfully" })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
