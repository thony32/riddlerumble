import type { Config } from "tailwindcss"

import { nextui } from "@nextui-org/react"

const config = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/@nextui-org/**/*.{js,ts,jsx,tsx}"],
    prefix: "",
    theme: {},
    plugins: [require("tailwindcss-animate"), nextui()],
} satisfies Config

export default config
