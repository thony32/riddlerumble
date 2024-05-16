export default async function handler(req: any, res: any) {
    try {
        const [ipResponse, locationResponse] = await Promise.all([
            fetch('https://api.ipify.org').then(response => response.text()),
            fetch('http://ip-api.com/json/').then(response => response.json())
        ]);

        const { countryCode } = locationResponse;

        if (!countryCode) {
            throw new Error('Country code not found');
        }

        const flagResponse = await fetch(`https://flagsapi.com/${countryCode}/flat/64.png`);
        if (!flagResponse.ok) {
            throw new Error('Failed to fetch flag');
        }

        const flagUrl = flagResponse.url;

        res.status(200).json({
            ip: ipResponse,
            localisation: locationResponse,
            flag: flagUrl
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
