import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the request method is PUT
    if (req.method != "PUT") {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        // Destructure the user_id, full_name, pseudo, and nationality from the request body
        const { user_id, full_name, pseudo, natinality } = req.body

        // Construct a query to update user data
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

