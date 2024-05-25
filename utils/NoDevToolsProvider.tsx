"use client"
import { ReactNode, useEffect } from "react"

const NoDevToolsProvider = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        if (process.env.NODE_ENV === "production") {
            const handleContextMenu = (e: MouseEvent) => {
                e.preventDefault()
            }

            const handleKeyDown = (e: KeyboardEvent) => {
                if ((e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.key === "u") || e.key === "F12" || (e.ctrlKey && e.key === "N")) {
                    e.preventDefault()
                }
            }

            document.addEventListener("contextmenu", handleContextMenu)
            document.addEventListener("keydown", handleKeyDown)

            return () => {
                document.removeEventListener("contextmenu", handleContextMenu)
                document.removeEventListener("keydown", handleKeyDown)
            }
        }
    }, [])

    return <>{children}</>
}

export default NoDevToolsProvider
