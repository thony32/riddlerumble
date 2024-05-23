import { NextApiRequest, NextApiResponse } from "next"
import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Get the total score of a user
        const { id_user } = req.body
        const userGamesQuery = e.select(e.Player_stats, (player_stats) => ({
            score: true,
            filter: e.op(player_stats.User.id, "=", e.uuid(id_user)),
        }))

        const userGames = await userGamesQuery.run(client)
        const totalScore = userGames.reduce((total, game) => total + game.score, 0)

        // update users score
        const userScoreUpdateQuery = e.update(e.Users, () => ({
            filter_single: { id: id_user },
            set: {
                score: totalScore,
            },
        }))

        await userScoreUpdateQuery.run(client)
        res.status(200).json({ success: true, message: "User score updated successfully" })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
