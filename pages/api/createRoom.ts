import type { NextApiRequest, NextApiResponse } from "next"
import e, { createClient } from "@/dbschema/edgeql-js"

const room_api =  async (level: string) => {
    const response = await fetch(`https://ia-codeipsum.vercel.app/${level == "high-level" ? "high-level" : ''}`,{
        method: 'POST'
    })
    const data = await response.json()
    return data
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: process.env.EDGEDB_INSTANCE,
        secretKey: process.env.EDGEDB_SECRET_KEY,
    })
    const delay_party = 300000
    const { level,  } = req.body
    const room = await e
        .insert(e.Room,{
            delay: delay_party,
            latitude: 

        })
        .run(client)

    res.status(200).json({ success: true })
}