import { WebSocket, WebSocketServer } from "ws"

const wss = new WebSocketServer({ port: process.env.NODE_ENV === "production" ? 443 : 8080 })

interface WebSocketMessage {
    event: string
    data: any
}

const roomClients: { [roomId: string]: WebSocket[] } = {}

wss.on("connection", (ws: WebSocket) => {
    ws.on("message", (message: string) => {
        console.log("Received message:", message)
        const { event, data } = JSON.parse(message) as WebSocketMessage
        if (event === "subscribe") {
            const roomId = data
            if (!roomClients[roomId]) {
                roomClients[roomId] = []
            }
            roomClients[roomId].push(ws)
        }
    })
})

export const broadcastMessage = (roomId: string, event: string, data: any) => {
    const message: WebSocketMessage = { event, data }
    if (roomClients[roomId]) {
        roomClients[roomId].forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message))
            }
        })
    }
    if (event === "delete-room") {
        delete roomClients[roomId]
    }
}
