import type { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@/dbschema/edgeql-js"
import { pusherServer } from "@/lib/pusher"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        res.status(405).json({ success: false, error: "Method not allowed" })
        return
    }

    try {
        const client = createClient({
            instanceName: process.env.EDGEDB_INSTANCE,
            secretKey: process.env.EDGEDB_SECRET_KEY,
        })

        const { id, delay, latitude, longitude, nb_players, prompt, user_pseudo } = req.body

        // Vérifier que l'ID est présent
        if (!id) {
            res.status(400).json({ success: false, error: "Missing required field: id" })
            return
        }

        // Construction de la requête de mise à jour
        const query = `
        update Room
            filter .id = <uuid>$id
            set {
                delay := <int32>$delay,
                latitude := <float32>$latitude,
                longitude := <float32>$longitude,
                nb_players := <int32>$nb_players,
                prompt := <str>$prompt,
                user_pseudo := <str>$user_pseudo
            }
        `

        const params = {
            id: id,
            delay: delay ?? null,
            latitude: latitude ?? null,
            longitude: longitude ?? null,
            nb_players: nb_players ?? null,
            prompt: prompt ?? null,
            user_pseudo: user_pseudo ?? null
        }

        const result: any = await client.query(query, params)

        pusherServer.trigger(id, "join-room", {
            nb_players: nb_players,
            user_pseudo: user_pseudo
        })

        res.status(200).json({ success: true, result })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ success: false, error: error })
    }
}
