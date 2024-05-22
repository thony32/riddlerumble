import { NextApiRequest, NextApiResponse } from "next"
import e, { createClient } from "@/dbschema/edgeql-js"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: EDGEDB_INSTANCE,
        secretKey: EDGEDB_SECRET_KEY,
    })

    try {

        const { id_user } = req.body;

        const userGamesQuery = e.select(e.Player_stats, (player_stats) => ({
            id: true,
            score: true,
            created_at: true,
            Room: {
                level: true,
                nb_players: true,
            },
            filter: e.op(player_stats.User.id, '=', e.uuid(id_user)),
            order_by: {
                expression: player_stats.created_at,
                direction: e.DESC,
            },
        }));

        const response = await userGamesQuery.run(client);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
