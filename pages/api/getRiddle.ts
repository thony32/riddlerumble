import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch("https://ia-codeipsum.vercel.app/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uuid: req.body.uuid }),
        })

        if (!response.ok) {
            throw new Error("Request failed")
        }

        const data = await response.json()
        res.status(200).json(data)
    } catch (error) {
        console.error("Error:", error)
        throw error
    }
}
