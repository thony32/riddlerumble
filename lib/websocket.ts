import { Server as WebSocketServer } from "socket.io"
import * as http from "http"

const port = process.env.NODE_ENV === "production" ? 443 : 8080
const server = http.createServer()
const io = new WebSocketServer(server, {
    cors: {
        origin: ["*"],
        methods: ["GET", "POST", "PUT"],
    },
})

const roomClients: { [roomId: string]: any } = {}

io.on("connection", (socket) => {
    console.log("WebSocket connected")

    socket.on("subscribe", (roomId: string) => {
        console.log("Client subscribed to room:", roomId)
        if (!roomClients[roomId]) {
            roomClients[roomId] = []
        }
        roomClients[roomId].push(socket)
    })

    socket.on("disconnect", () => {
        console.log("WebSocket disconnected")
        // Remove the disconnected client from all subscribed rooms
        Object.keys(roomClients).forEach((roomId) => {
            roomClients[roomId] = roomClients[roomId].filter((client: any) => client !== socket)
            if (roomClients[roomId].length === 0) {
                delete roomClients[roomId]
            }
        })
    })
})

server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`)
})

export const broadcastMessage = (roomId: string, event: string, data: any) => {
    console.log("Broadcasting message to room:", roomId)
    if (roomClients[roomId]) {
        roomClients[roomId].forEach((client: any) => {
            client.emit(event, data)
        })
    }
    if (event === "delete-room") {
        delete roomClients[roomId]
    }
}
