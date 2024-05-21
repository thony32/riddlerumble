import e, { createClient } from "@/dbschema/edgeql-js"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "PUT") {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        const client = createClient({
            instanceName: EDGEDB_INSTANCE,
            secretKey: EDGEDB_SECRET_KEY,
        })

        const { user_id, full_name, pseudo, natinality } = req.body

        const userUpdateQuery = e.update(e.Users, () => ({
            filter_single: { id: user_id },
            set: {
                full_name: full_name,
                pseudo: pseudo,
                nationality: natinality,
            },
        }))

        await userUpdateQuery.run(client)
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
