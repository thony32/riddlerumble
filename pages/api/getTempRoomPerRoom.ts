import { NextApiRequest, NextApiResponse } from "next"
import e, { createClient } from "@/dbschema/edgeql-js"
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from "@/env"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = createClient({
        instanceName: EDGEDB_INSTANCE,
        secretKey: EDGEDB_SECRET_KEY,
    })

    try {

        const { id_room } = req.body;

        const tempRoomQuery = e.select(e.Temp_room, (temp_room) => ({
            id: true,
            latitude: true,
            longitude: true,
            time: true,
            User: {
                pseudo: true,
                nationality: true,
                avatar: true,
            },
            filter: e.op(temp_room.Room.id, '=', e.uuid(id_room)),
        }));

        const temp_room = await tempRoomQuery.run(client);
        res.status(200).json(temp_room);

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error })
    }
}
