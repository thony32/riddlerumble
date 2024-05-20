import PusherServer from "pusher"
import PusherClient from "pusher-js"

export const pusherServer = new PusherServer({
    appId: "1544547",
    key: "09e318bef2fb6346410b",
    secret: "5bebb34e40158a8c971b",
    cluster: "ap2",
    useTLS: true,
})

export const pusherClient = new PusherClient("09e318bef2fb6346410b", {
    cluster: "ap2",
})
