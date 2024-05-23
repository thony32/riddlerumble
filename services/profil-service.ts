const getAllUser = async () => {
    const response = await fetch("/api/user")
    if (!response.ok) {
        throw new Error("Failed to fetch IP info")
    }
    const jsonData = await response.json()
    return jsonData
}

const getAllCountry = async () => {
    const response = await fetch("/api/getAllCountry")
    if (!response.ok) {
        throw new Error("Failed to fetch IP info")
    }
    const jsonData = await response.json()
    return jsonData
}

const syncUserScore = async (id_user: string) => {
    const response = await fetch("/api/user/sync-score", {
        body: JSON.stringify({ id_user }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to update user score")
    return await response.json()
}

const getUserGames = async (id_user: string) => {
    const response = await fetch("/api/user/games", {
        body: JSON.stringify({ id_user }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to fetch temp room")
    const jsonData = await response.json()
    return jsonData
}

export { getAllUser, getAllCountry, syncUserScore, getUserGames }
