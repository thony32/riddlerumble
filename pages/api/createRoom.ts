import type { NextApiRequest, NextApiResponse } from "next"
import e, { createClient } from "@/dbschema/edgeql-js"

const room_api =  async (level: string) => {
    const response = await fetch(`https://ia-codeipsum.vercel.app/${level}`,{
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
    const { level, user_pseudo  } = req.body
    room_api(level).then( async (room_data) => {
        const room = await client.query(
            `
            insert Room {
                delay := ${delay_party},
                latitude := ${room_data.response.lat},
                longitude := ${room_data.response.lng},
                nb_players := 1,
                prompt := ${room_data.response.enigm},
                user_pseudo := ${user_pseudo}
            }`
        )    

    }).catch((error) => {
        console.log(error)
        throw error
    })
    // const room = await e
    //     .insert(e.Room,{
    //         delay: delay_party,
    //         latitude: e.float32(room_data.response.lat),
    //         longitude: e.float32(room_data.response.lng),
    //         nb_players: 1,
    //         prompt: e.str(room_data.response.enigm),
    //         user_pseudo: e.str(user_pseudo),
    //     })
    //     .run(client)
    res.status(200).json({ success: true })
}