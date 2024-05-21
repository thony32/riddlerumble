/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from "react"

const ThemeHandler = () => {
    const changeTheme = (value: string) => {
        if (typeof window !== "undefined") {
            const html = document.querySelector("html")
            html?.setAttribute("data-theme", value)
            localStorage.setItem("theme", value)
            window.dispatchEvent(new Event("themeChange"))
        }
    }

    const [currentTheme, setCurrentTheme] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme")
            const html = document.querySelector("html")

            if (theme) {
                html?.setAttribute("data-theme", theme)
                setCurrentTheme(theme)
            } else {
                html?.setAttribute("data-theme", "light")
                setCurrentTheme("light")
            }

            const onThemeChange = () => {
                setCurrentTheme(localStorage.getItem("theme") as string)
            }

            window.addEventListener("themeChange", onThemeChange)

            return () => window.removeEventListener("themeChange", onThemeChange)
        }
    }, [])

    return (
        <div className="flex gap-3 group">
            <svg
                onClick={() => changeTheme("light")}
                className={`w-6 cursor-pointer group-hover:translate-y-0 group-hover:fill-current ${currentTheme == "light" ? "!translate-y-0 fill-current" : ""} duration-200 translate-y-4`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
            </svg>
            <svg
                onClick={() => changeTheme("dark")}
                className={`w-6 cursor-pointer group-hover:translate-y-0 group-hover:fill-current ${currentTheme == "dark" ? "!translate-y-0 fill-current" : ""} duration-200 translate-y-4`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
            </svg>
        </div>
    )
}

export default ThemeHandler
