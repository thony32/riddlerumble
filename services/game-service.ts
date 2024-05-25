import { Room } from "@/types/room"

export const getAllRoom = async () => {
    const res = await fetch("/api/room")
    if (!res.ok) {
        throw new Error("Failed to fetch room info")
    }
    const jsonData = await res.json()
    return jsonData
}

export const createRoom = async (level: string, pseudo: string) => {
    const response = await fetch("/api/room/create", {
        body: JSON.stringify({ level, user_pseudo: pseudo }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create room")
    return await response.json()
}

export const updateRoom = async (room: Room) => {
    const response = await fetch("/api/room/update", {
        body: JSON.stringify(room),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) {
        throw new Error("Failed to join the room")
    }

    const data = await response.json()
    return data
}

export const setJoker = async (id: string, user_pseudo: string) => {
    const response = await fetch("/api/room/setJoker", {
        body: JSON.stringify({ id, user_pseudo }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create room")
    return await response.json()
}


export const setBombCoordonate = async (id: string, bombCoordonate: string) => {
    const response = await fetch("/api/room/setBombCoordonate", {
        body: JSON.stringify({ id, bombCoordonate }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create room")
    return await response.json()
}
