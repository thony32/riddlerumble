const getAllUser = async () => {
    const response = await fetch("/api/getAllUser")
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
    const response = await fetch("/api/syncUserScore", {
        body: JSON.stringify({ id_user }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to update user score")
    return await response.json()
}

export { getAllUser, getAllCountry, syncUserScore }
