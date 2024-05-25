import { SOCKETIO_URL } from "@/env"
import io from "socket.io-client"

export const socket = io(SOCKETIO_URL)
