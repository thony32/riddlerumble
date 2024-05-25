// Function to fetch all user data
const getAllUser = async (limit?: any) => {
    const response = await fetch("/api/user", {
        body: JSON.stringify({ limit }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) {
        throw new Error("Failed to fetch user info")
    }
    const jsonData = await response.json()
    return jsonData
}

// Function to fetch all country data
const getAllCountry = async () => {
    const response = await fetch("/api/getAllCountry")
    if (!response.ok) {
        throw new Error("Failed to fetch country info")
    }
    const jsonData = await response.json()
    return jsonData
}

// Function to synchronize user score with the server using user ID
const syncUserScore = async (id_user: string) => {
    const response = await fetch("/api/user/sync-score", {
        body: JSON.stringify({ id_user }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to update user score")
    return await response.json()
}

// Function to fetch games of a specific user using user ID
const getUserGames = async (id_user: string) => {
    const response = await fetch("/api/user/games", {
        body: JSON.stringify({ id_user }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to fetch user games")
    const jsonData = await response.json()
    return jsonData
}

// Export all functions for use in other parts of the application
export { getAllUser, getAllCountry, syncUserScore, getUserGames }
