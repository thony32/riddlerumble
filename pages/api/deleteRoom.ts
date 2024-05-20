import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/dbschema/edgeql-js";
import { pusherServer } from "@/lib/pusher";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        res.status(405).json({ success: false, error: "Method not allowed" });
        return;
    }

    try {
        const client = createClient({
            instanceName: process.env.EDGEDB_INSTANCE,
            secretKey: process.env.EDGEDB_SECRET_KEY,
        });

        const { id } = req.body;

        if (!id) {
            res.status(400).json({ success: false, error: "Missing required field: id" });
            return;
        }

        // Construction de la requête de suppression
        const query = `
        delete Room
        filter .id = <uuid>$id
        `;

        const params = { id: id };

        const result: any = await client.query(query, params);

        // Optionnel : Émettre un événement avec Pusher pour informer que la salle a été supprimée
        pusherServer.trigger(id, "delete-room", { id });

        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error });
    }
}
