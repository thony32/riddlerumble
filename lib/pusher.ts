import { PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER } from "@/env"
import PusherServer from "pusher"
import PusherClient from "pusher-js"

export const pusherServer = new PusherServer({
    appId: PUSHER_APP_ID!,
    key: PUSHER_KEY!,
    secret: PUSHER_SECRET!,
    cluster: PUSHER_CLUSTER!,
    useTLS: true,
})

export const pusherClient = new PusherClient("09e318bef2fb6346410b", {
    cluster: "ap2",
})
