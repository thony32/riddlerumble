import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { user_id, player_score } = req.body

        const currentScoreQuery = e.select(e.Users, () => ({
            score: true,
            filter_single: { id: user_id },
        }))
        const currentScore = await currentScoreQuery.run(client)

        const newScore = currentScore?.score + player_score

        const userScoreUpdateQuery = e.update(e.Users, () => ({
            filter_single: { id: user_id },
            set: {
                score: newScore,
            },
        }))

        await userScoreUpdateQuery.run(client)
        res.status(200).json({ success: true, message: "User score updated successfully" })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
