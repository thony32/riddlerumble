import type { NextApiRequest, NextApiResponse } from "next"
import { client } from "@/edgedb"
import e from "@/dbschema/edgeql-js"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { identity, pseudo } = req.body
    await e
        .update(e.Users, (user) => ({
            filter_single: e.op(user.identity.id, "=", e.uuid(identity)),
            set: {
                pseudo: e.str(pseudo),
            },
        }))
        .run(client)

    res.status(200).json({ success: true })
}
