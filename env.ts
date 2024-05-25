export const EDGEDB_INSTANCE = process.env.EDGEDB_INSTANCE!
export const EDGEDB_SECRET_KEY = process.env.EDGEDB_SECRET_KEY!
export const BASE_URL = process.env.NODE_ENV === "production" ? process.env.BASE_URL! : "http://localhost:3000"
export const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN!
export const SOCKETIO_URL = process.env.SOCKETIO_URL!
export const SOCKETIO_UPDATE_URL = process.env.SOCKETIO_UPDATE_URL!