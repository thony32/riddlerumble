import { NextApiRequest, NextApiResponse } from "next";
import e, { createClient } from "@/dbschema/edgeql-js"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: process.env.EDGEDB_INSTANCE,
        secretKey: process.env.EDGEDB_SECRET_KEY,
    })

    const getUserData = e.select(e.Users, (user) => ({
        avatar: true,
        email: true,
        full_name: true,
        pseudo: true,
        score: true,
        nationality: true,
        created_at: true,
        modified_at: true,
        order_by: {
            expression: user.score,
            direction: e.DESC,
        },
    }))
    const user = await getUserData.run(client)
    res.status(200).json(user)
}