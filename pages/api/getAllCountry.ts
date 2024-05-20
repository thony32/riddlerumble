import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const countryResponse = await fetch(`https://countriesnow.space/api/v0.1/countries/iso`)
        if (!countryResponse.ok) {
            throw new Error("Failed to fetch flag")
        }
        const countries = await countryResponse.json()

        res.status(200).json(countries)
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        } else {
            res.status(500).json({ error: "An unknown error occurred" })
        }
    }
}
