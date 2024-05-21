import { NextApiRequest, NextApiResponse } from "next"
import e, { createClient } from "@/dbschema/edgeql-js"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: process.env.EDGEDB_INSTANCE,
        secretKey: process.env.EDGEDB_SECRET_KEY,
    })

    try {
        const userGamesQuery =
            `
        select Player_stats {
            id,
            score,
            created_at,
            id_room: {
              level,
              nb_players
            },
          }
          filter .id_user.id = <uuid>$id_user
          order by .created_at desc;
        `
        const params = {
            id_user: req.body.id_user
        }

        const response = await client.query(userGamesQuery, params)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}