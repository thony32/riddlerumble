import e, { createClient } from "@/dbschema/edgeql-js"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = createClient({
            instanceName: EDGEDB_INSTANCE,
            secretKey: EDGEDB_SECRET_KEY,
        })

        const { id_room } = req.body

        const disableRoomQuery = e.update(e.Room, () => ({
            filter_single: { id: id_room },
            set: {
                isActive: false,
            },
        }))

        await disableRoomQuery.run(client)

        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
