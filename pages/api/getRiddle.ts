
export async function getRiddle(uuid: string) {
    try {
        const response = await fetch("https://ia-codeipsum.vercel.app/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uuid }),
        })

        if (!response.ok) {
            throw new Error("Request failed")
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error:", error)
        throw error
    }
}
