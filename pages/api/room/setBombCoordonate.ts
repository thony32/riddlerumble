import type { NextApiRequest, NextApiResponse } from "next"
import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        const { id, bombCoordonate } = req.body

        if (!id) {
            res.status(400).json({ success: false, error: "Missing required field: id" })
            return
        }

        const updateQuery = e.update(e.Room, () => ({
            filter_single: { id: e.uuid(id) },
            set: {
                bombCoordinates: bombCoordonate
            },
        }))

        await updateQuery.run(client)

        res.status(200).json({ success: true, message: 'Bomb set' })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ success: false, error: error })
    }
}
