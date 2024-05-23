const fetchRoom = async (roomId: string) => {
    const response = await fetch("/api/getRoom", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ room_id: roomId }),
    })
    if (!response.ok) {
        throw new Error("Failed to fetch room data")
    }
    return response.json()
}

const create_temp_room = async (latitude: number, longitude: number, time: string, id_user: string, id_room: string) => {
    const response = await fetch("/api/createTempRoom", {
        body: JSON.stringify({ latitude, longitude, time, id_user, id_room }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create temp room")
    return await response.json()
}

const create_player_stat = async (score: number, id_user: string, id_room: string) => {
    const response = await fetch("/api/createPlayerStat", {
        body: JSON.stringify({ score, id_user, id_room }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create temp room")
    return await response.json()
}

const getTempRoom = async (id_room: string) => {
    const response = await fetch("/api/getTempRoomPerRoom", {
        body: JSON.stringify({ id_room }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to fetch temp room")
    const jsonData = await response.json()
    return jsonData
}

const disableRoom = async (id_room: string) => {
    const response = await fetch("/api/disableRoom", {
        body: JSON.stringify({ id_room }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create temp room")
    return await response.json()
}

const updateUserScore = async (user_id: string, player_score: number) => {
    const response = await fetch("/api/updateUserScore", {
        body: JSON.stringify({ user_id, player_score }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to update user score")
    return await response.json()
}

export { fetchRoom, create_temp_room, create_player_stat, getTempRoom, disableRoom, updateUserScore }