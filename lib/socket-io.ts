import { SOCKETIO_UPDATE_URL, SOCKETIO_URL } from "@/env"
import io from "socket.io-client"

export const socket = io(SOCKETIO_URL)
export const socket_update = io(SOCKETIO_UPDATE_URL);
