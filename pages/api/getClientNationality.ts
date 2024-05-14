export default async function handler(req: any, res: any) {
    const response = await fetch('https://api.ipify.org');
    const publicIP = await response.text();

    const ip_localisation_response = await fetch(`http://ip-api.com/json/${publicIP}`);
    const ip_localisation = await ip_localisation_response.json();

    const flag_respone = await fetch(`https://flagsapi.com/${ip_localisation.countryCode}/flat/64.png`);
    const flag = flag_respone.url;

    res.status(200).json({
        ip: publicIP,
        localisation: ip_localisation,
        flag: flag
    });
}