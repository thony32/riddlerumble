// Import the Room type
import { Room } from "@/types/room"

// Function to fetch all room data
export const getAllRoom = async () => {
    const res = await fetch("/api/room")
    if (!res.ok) {
        throw new Error("Failed to fetch room info")
    }
    const jsonData = await res.json()
    return jsonData
}

// Function to create a new room with specified level and user pseudo
export const createRoom = async (level: string, pseudo: string) => {
    const response = await fetch("/api/room/create", {
        body: JSON.stringify({ level, user_pseudo: pseudo }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create room")
    return await response.json()
}

// Function to update room details with a Room object
export const updateRoom = async (room: Room) => {
    const response = await fetch("/api/room/update", {
        body: JSON.stringify(room),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) {
        throw new Error("Failed to update the room")
    }

    const data = await response.json()
    return data
}

// Function to set a joker for a room with specified room ID and user pseudo
export const setJoker = async (id: string, user_pseudo: string) => {
    const response = await fetch("/api/room/setJoker", {
        body: JSON.stringify({ id, user_pseudo }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to set joker")
    return await response.json()
}

// Function to set bomb coordinates for a room with specified room ID and bomb coordinates
export const setBombCoordonate = async (id: string, bombCoordonate: string) => {
    const response = await fetch("/api/room/setBombCoordonate", {
        body: JSON.stringify({ id, bombCoordonate }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to set bomb coordinates")
    return await response.json()
}
