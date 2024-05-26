import calculDistancePosition from "@/utils/calculDistancePostion"

// Function to fetch room details by room ID
const fetchRoom = async (roomId: string) => {
    const response = await fetch(`/api/room/${roomId}`)
    if (!response.ok) {
        throw new Error("Failed to fetch room data")
    }
    const room = response.json()

    const responseTemp = await fetch(`/api/party/temp-room/${roomId}`)
    if (!responseTemp.ok) {
        throw new Error("Failed to fetch temp room data")
    }
    const temp_rooms= response.json()

    return { ...room, temp_rooms}
}

// Function to create a temporary room with provided details
const create_temp_room = async (latitude: number, longitude: number, time: string, id_user: string, id_room: string) => {
    const response = await fetch("/api/party/temp-room/create", {
        body: JSON.stringify({ latitude, longitude, time, id_user, id_room }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create temp room")
    return await response.json()
}

// Function to create player statistics with given score, user ID, and room ID
const create_player_stat = async (score: number, id_user: string, id_room: string) => {
    const response = await fetch("/api/party/player-stat", {
        body: JSON.stringify({ score, id_user, id_room }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create player stat")
    return await response.json()
}

// Function to get details of a temporary room by room ID
const getTempRoom = async (id_room: string) => {
    const response = await fetch(`/api/party/temp-room/${id_room}`)
    if (!response.ok) throw new Error("Failed to fetch temp room")
    const jsonData = await response.json()
    return jsonData
}

// Function to disable a room by room ID
const disableRoom = async (id_room: string) => {
    const response = await fetch("/api/room/disable", {
        body: JSON.stringify({ id_room }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to disable room")
    return await response.json()
}

// Function to update user score with provided user ID and new score
const updateUserScore = async (user_id: string, player_score: number) => {
    const response = await fetch("/api/user/update-score", {
        body: JSON.stringify({ user_id, player_score }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to update user score")
    return await response.json()
}

// Function to update user statistics with user ID, room ID, and bomb points
const updateUserStat = async (id_user: string, id_room: string, bomb_point: number) => {
    const response = await fetch("/api/party/update-user-stat", {
        body: JSON.stringify({ id_user, id_room, bomb_point }),
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to update user statistics")
    return await response.json()
}

// Function to update score based on bomb coordinates within a temporary room
const updateScoreBomb = async (temp_room: any, id_room: string, bombCoordonates: any) => {
    var distance = 0;
    // Loop through each player in the temporary room
    temp_room.forEach((player: any) => {
        // Calculate the distance between the player and the bomb coordinates
        distance = calculDistancePosition({ latitude: player.latitude, longitude: player.longitude }, { latitude: bombCoordonates.split(',')[0], longitude: bombCoordonates.split(',')[1] })
        // If the distance is within 300 meters, update the user's stats
        if (distance <= 300) {
            updateUserStat(player.User.id, id_room, -20)
        }
    })
}

// Export all functions for use in other parts of the application
export { fetchRoom, create_temp_room, create_player_stat, getTempRoom, disableRoom, updateUserScore, updateScoreBomb }
