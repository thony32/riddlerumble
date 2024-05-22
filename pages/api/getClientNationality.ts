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
        const [locationResponse] = await Promise.all([
            fetch(`http://ip-api.com/json/${requestIp.getClientIp(req)}`).then((response) => response.json()),
        ])

        const { countryCode } = locationResponse

        res.status(200).json({
            localisation: locationResponse,
            flag: `https://flagsapi.com/${countryCode}/flat/64.png`,
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        } else {
            res.status(500).json({ error: "An unknown error occurred" })
        }
    }
}
