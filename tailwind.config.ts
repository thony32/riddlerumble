import type { Config } from "tailwindcss"

import { nextui } from "@nextui-org/react"

const config = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/@nextui-org/**/*.{js,ts,jsx,tsx}"],
    prefix: "",
    theme: {},
    plugins: [require("tailwindcss-animate"), nextui(), require('daisyui')],
} satisfies Config

export default config
