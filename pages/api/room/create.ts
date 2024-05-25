import type { NextApiRequest, NextApiResponse } from "next"
import e from "@/dbschema/edgeql-js"
import client from "@/lib/edgedb-client"
import { socket } from "@/lib/socket-io"
import { AI_LINK, MAPBOX_TOKEN } from "@/env"

const room_api = async (level: string) => {
    let url: string
    if (level === "normal-level") {
        url = AI_LINK
    } else {
        url = `${AI_LINK}/${level}`
    }

    const response = await fetch(url, {
        method: "POST",
    })
    const data = await response.json()
    return data
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { level, user_pseudo } = req.body
    const room_data = await room_api(level)

    const q = room_data.response.city
    const access_token = MAPBOX_TOKEN

    const response_api_geo = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${q}&access_token=${access_token}&limit=1`)
    const api_geo = await response_api_geo.json()

    const delay_party = level == "high-level" ? 420000 : 300000

    const latitude = parseFloat(api_geo.features[0].properties.coordinates.latitude)
    const longitude = parseFloat(api_geo.features[0].properties.coordinates.longitude)

    const query = e.insert(e.Room, {
        delay: delay_party,
        latitude: latitude,
        longitude: longitude,
        level: level,
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
            prompt: true,
            user_pseudo: true,
        }))
        .run(client)

    socket.emit("room-create")

    res.status(200).json({ success: true, room })
}
