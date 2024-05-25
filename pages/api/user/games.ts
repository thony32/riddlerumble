import { NextApiRequest, NextApiResponse } from "next"
import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Destructure the id_user from the request body
        const { id_user } = req.body

        // Construct a query to select Player_stats associated with the provided id_user
        const userGamesQuery = e.select(e.Player_stats, (player_stats) => ({
            id: true,
            score: true,
            created_at: true,
            Room: {
                level: true,
                user_pseudo: true,
            },
            // Filter Player_stats by id_user
            filter: e.op(player_stats.User.id, "=", e.uuid(id_user)),
            // Order results by created_at in descending order
            order_by: {
                expression: player_stats.created_at,
                direction: e.DESC,
            },
        }))

        const response = await userGamesQuery.run(client)

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}

