import calculDistancePosition from "@/utils/calculDistancePostion"

const fetchRoom = async (roomId: string) => {
    const response = await fetch(`/api/room/${roomId}`)
    if (!response.ok) {
        throw new Error("Failed to fetch room data")
    }
    return response.json()
}

const create_temp_room = async (latitude: number, longitude: number, time: string, id_user: string, id_room: string) => {
    const response = await fetch("/api/party/temp-room/create", {
        body: JSON.stringify({ latitude, longitude, time, id_user, id_room }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create temp room")
    return await response.json()
}

const create_player_stat = async (score: number, id_user: string, id_room: string) => {
    const response = await fetch("/api/party/player-stat", {
        body: JSON.stringify({ score, id_user, id_room }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create temp room")
    return await response.json()
}

const getTempRoom = async (id_room: string) => {
    const response = await fetch(`/api/party/temp-room/${id_room}`)
    if (!response.ok) throw new Error("Failed to fetch temp room")
    const jsonData = await response.json()
    return jsonData
}

const disableRoom = async (id_room: string) => {
    const response = await fetch("/api/room/disable", {
        body: JSON.stringify({ id_room }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create temp room")
    return await response.json()
}

const updateUserScore = async (user_id: string, player_score: number) => {
    const response = await fetch("/api/user/update-score", {
        body: JSON.stringify({ user_id, player_score }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to update user score")
    return await response.json()
}

const updateScoreBomb = async (temp_room: any, bombCoordonates: any) => {
    temp_room.forEach((player: any) => {
        const distance = calculDistancePosition({ latitude: player.latitude, longitude: player.longitude }, { latitude: bombCoordonates.split(',')[0], longitude: bombCoordonates.split(',')[1] })
        if (distance <= 300) {
            updateUserScore(player.User.id, -20)
        }
    })
}

export { fetchRoom, create_temp_room, create_player_stat, getTempRoom, disableRoom, updateUserScore, updateScoreBomb }
