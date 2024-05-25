import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Destructure the user_id and player_score from the request body
        const { user_id, player_score } = req.body

        // Construct a query to select the current score of the user with the provided user_id
        const currentScoreQuery = e.select(e.Users, () => ({
            score: true,
            filter_single: { id: user_id },
        }))

        const currentScore = await currentScoreQuery.run(client)

        // Calculate the new score by adding the player_score to the current score
        const newScore = currentScore?.score + player_score

        // Construct a query to update the user's score with the new calculated score
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

