import { IpInformation } from "@/models/ipInformation"

const IpInfoLink = process.env.NODE_ENV === "production" ? "https://enigmap.vercel.app" : "http://localhost:3000"

export default async function getIpInformation(): Promise<IpInformation> {
    const response = await fetch(`${IpInfoLink}/api/getClientNationality`)
    if (!response.ok) {
        throw new Error("Failed to fetch IP info")
    }
    const jsonData = await response.json()
    return jsonData as IpInformation
}
