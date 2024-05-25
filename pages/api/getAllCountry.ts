import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Construct the file path to the countries JSON file
        const jsonFilePath = path.join(process.cwd(), '/public/json/countries.json');
        
        // Read the contents of the JSON file asynchronously
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        
        // Parse the JSON data into JavaScript object
        const countries = JSON.parse(jsonData);
        
        res.status(200).json(countries);
    } catch (error) {
        // If an error occurs during the try block
        if (error instanceof Error) {
            // If it's an instance of Error, return a 500 Internal Server Error response
            res.status(500).json({ error: error.message });
        } else {
            // If it's not an instance of Error, return a generic error message
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
}
