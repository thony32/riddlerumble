import { BASE_URL } from "@/env"
import { IpInformation } from "@/models/ipInformation"

export default async function getIpInformation(): Promise<IpInformation> {
    const response = await fetch(`${BASE_URL}/api/getClientNationality`)
    if (!response.ok) {
        throw new Error("Failed to fetch IP info")
    }
    const jsonData = await response.json()
    return jsonData as IpInformation
}
