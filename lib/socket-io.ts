import { SOCKETIO_UPDATE_URL, SOCKETIO_URL } from "@/env"
import io from "socket.io-client"

// export const socket = io('https://stuck-charis-icecold-c98c43b3.koyeb.app')
export const socket = io(SOCKETIO_URL)
// export const socket_update = io("https://full-ethelda-codeipsum-204d9720.koyeb.app")
export const socket_update = io(SOCKETIO_UPDATE_URL)
