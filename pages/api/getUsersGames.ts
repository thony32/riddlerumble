import { NextApiRequest, NextApiResponse } from "next"
import e, { createClient } from "@/dbschema/edgeql-js"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: EDGEDB_INSTANCE,
        secretKey: EDGEDB_SECRET_KEY,
    })

    try {
        const userGamesQuery = `
        select Player_stats {
            id,
            score,
            created_at,
            Room: {
              level,
              nb_players
            },
          }
          filter .User.id = <uuid>$id_user
          order by .created_at desc;
        `
        const params = {
            id_user: req.body.id_user,
        }

        const response = await client.query(userGamesQuery, params)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
