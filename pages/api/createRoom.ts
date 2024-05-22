import type { NextApiRequest, NextApiResponse } from "next"
import e, { createClient } from "@/dbschema/edgeql-js"
import { pusherServer } from "@/lib/pusher"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"
// import { broadcastMessage } from "@/lib/websocket"

const room_api = async (level: string) => {
    let url: string
    if (level === "normal-level") {
        url = "https://ia-codeipsum.vercel.app"
    } else {
        url = `https://ia-codeipsum.vercel.app/${level}`
    }

    const response = await fetch(url, {
        method: "POST",
    })
    const data = await response.json()
    return data
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: EDGEDB_INSTANCE,
        secretKey: EDGEDB_SECRET_KEY,
    })
    const { level, user_pseudo } = req.body
    const room_data = await room_api(level)
    const delay_party = level == "high-level" ? 420000 : 300000

    const latitude = parseFloat(room_data.response.lat)
    const longitude = parseFloat(room_data.response.lng)

    const query = e.insert(e.Room, {
        delay: delay_party,
        latitude: latitude,
        longitude: longitude,
        level: level,
        nb_players: 1,
        prompt: room_data.enigm,
        user_pseudo: user_pseudo,
        isActive: true,
    })

    const room = await e
        .select(query, () => ({
            id: true,
            delay: true,
            latitude: true,
            longitude: true,
            level: true,
            nb_players: true,
            prompt: true,
            user_pseudo: true,
        }))
        .run(client)

    pusherServer.trigger("lobby", "new-room", {})

    // broadcastMessage("lobby", "new-room", {
    //     id: room.id,
    //     delay: room.delay,
    //     latitude: room.latitude,
    //     longitude: room.longitude,
    //     level: room.level,
    //     nb_players: room.nb_players,
    //     prompt: room.prompt,
    //     user_pseudo: room.user_pseudo,
    // })

    res.status(200).json({ success: true, room: room })
}
