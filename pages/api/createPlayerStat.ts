import { createClient } from '@/dbschema/edgeql-js';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'POST') {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        const client = createClient({
            instanceName: process.env.EDGEDB_INSTANCE,
            secretKey: process.env.EDGEDB_SECRET_KEY,
        })

        const { score, id_room, id_user } = req.body
        await client.querySingle(
            `
                select (
                    insert default::Player_stats {
                        score := <float32>$score,
                        id_user := (select detached default::Users filter .id = <uuid>$id_user),
                        id_room := (select detached default::Room filter .id = <uuid>$id_room),
                    }
                ) {score, id_user, id_room}`,
            {
                score: score,
                id_user: id_user,
                id_room: id_room,
            }
        )
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}