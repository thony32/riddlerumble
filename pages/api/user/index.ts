import { NextApiRequest, NextApiResponse } from "next"
import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const limit = req.body.limit;
    const getUserData = e.select(e.Users, (user) => ({
        avatar: true,
        email: true,
        full_name: true,
        pseudo: true,
        score: true,
        nationality: true,
        created_at: true,
        modified_at: true,
        // Order users by their score in descending order
        order_by: {
            expression: user.score,
            direction: e.DESC,
        },
        limit: limit ? limit : null
    }))

    const user = await getUserData.run(client)

    res.status(200).json(user)
}

