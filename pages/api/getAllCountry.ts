import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const jsonFilePath = path.join(process.cwd(), '/public/json/countries.json');
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        const countries = JSON.parse(jsonData);
        res.status(200).json(countries);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
}
