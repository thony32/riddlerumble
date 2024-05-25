import type { NextApiRequest, NextApiResponse } from "next"
import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        const { id, user_pseudo } = req.body

        if (!id) {
            res.status(400).json({ success: false, error: "Missing required field: id" })
            return
        }

        const user_array = user_pseudo.split(', ');
        const user_array_filtered = user_array.filter(Boolean)
        const joker = user_array_filtered[Math.floor(Math.random() * user_array_filtered.length)]

        const updateQuery = e.update(e.Room, () => ({
            filter_single: { id: e.uuid(id) },
            set: {
                joker: joker
            },
        }))

        await updateQuery.run(client)

        res.status(200).json({ success: true, message: 'Joker set' })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ success: false, error: error })
    }
}
