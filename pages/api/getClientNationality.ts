import { NextApiRequest, NextApiResponse } from "next"
import requestIp from 'request-ip'

interface LocationResponse {
    countryCode?: string
}

interface ApiResponse {
    localisation: LocationResponse
    flag: string
}

interface ApiError {
    error: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse | ApiError>) {
    try {
        const detectedIp = requestIp.getClientIp(req) as any
        const [locationResponse] = await Promise.all([
            fetch(`http://ip-api.com/json/${detectedIp}`).then((response) => response.json()),
        ])

        const { countryCode } = locationResponse

        if (!countryCode) {
            throw new Error("Country code not found")
        }

        const flagResponse = await fetch(`https://flagsapi.com/${countryCode}/flat/64.png`)
        if (!flagResponse.ok) {
            throw new Error("Failed to fetch flag")
        }

        const flagUrl = flagResponse.url

        res.status(200).json({
            localisation: locationResponse,
            flag: flagUrl,
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        } else {
            res.status(500).json({ error: "An unknown error occurred" })
        }
    }
}
