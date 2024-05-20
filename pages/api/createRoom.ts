import type { NextApiRequest, NextApiResponse } from "next"
import e, { createClient } from "@/dbschema/edgeql-js"
import { pusherServer } from "@/lib/pusher"

const room_api = async (level: string) => {
    const response = await fetch(`https://ia-codeipsum.vercel.app/${level}`, {
        method: "POST",
    })
    const data = await response.json()
    return data
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: process.env.EDGEDB_INSTANCE,
        secretKey: process.env.EDGEDB_SECRET_KEY,
    })
    const { level, user_pseudo } = req.body
    const room_data = await room_api(level)

    const delay_party = level == "high-level" ? 420000 : 300000

    const latitude = parseFloat(room_data.response.lat)
    const longitude = parseFloat(room_data.response.lng)

    const room: any = await client.querySingle(
        `
            select (
                insert Room {
                    delay := <int32>$delay_party,
                    latitude := <float32>$latitude,
                    longitude := <float32>$longitude,
                    level := <str>$level,
                    nb_players := 1,
                    prompt := <str>$prompt,
                    user_pseudo := <str>$user_pseudo,
                    isActive := <bool>true
                }
            ) {id, delay, latitude, longitude, level, nb_players, prompt, user_pseudo}`,
        {
            delay_party: delay_party,
            latitude: latitude,
            longitude: longitude,
            level: level,
            prompt: room_data.enigm,
            user_pseudo: user_pseudo,
        }
    )

    pusherServer.trigger("lobby", "new-room", {
        id: room.id,
        delay: room.delay,
        latitude: room.latitude,
        longitude: room.longitude,
        level: room.level,
        nb_players: room.nb_players,
        prompt: room.prompt,
        user_pseudo: room.user_pseudo,
    })

    res.status(200).json({ success: true, room: room })
}
