import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Destructure the id_user and id_room from the request body
        const { id_user, id_room } = req.body

        // Construct a query to update the score of the Player_stats associated with the provided id_user and id_room
        const userScoreUpdateQuery = e.update(e.Player_stats, (player_stats) => ({
            filter: e.op(
                e.op(player_stats.User.id, "=", e.uuid(id_user)),
                'and', // Combine filters with 'and'
                e.op(player_stats.Room.id, "=", e.uuid(id_room))
            ),
            // Set the score to 0
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

