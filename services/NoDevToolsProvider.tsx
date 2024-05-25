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

            const closeDevTools = () => {
                const devToolsWindow = window.open("", "_blank")
                if (devToolsWindow) {
                    devToolsWindow.close()
                }

                if (typeof (window as any).chrome !== "undefined" && (window as any).chrome.devtools) {
                    ;(window as any).chrome.devtools.inspectedWindow.eval("window.close()")
                }
            }

            const checkDevTools = () => {
                const threshold = 160
                const widthThreshold = window.outerWidth - window.innerWidth > threshold
                const heightThreshold = window.outerHeight - window.innerHeight > threshold
                if (widthThreshold || heightThreshold) {
                    closeDevTools()
                }
            }

            document.addEventListener("contextmenu", handleContextMenu)
            document.addEventListener("keydown", handleKeyDown)
            const checkDevToolsInterval = setInterval(checkDevTools, 1000)

            return () => {
                document.removeEventListener("contextmenu", handleContextMenu)
                document.removeEventListener("keydown", handleKeyDown)
                clearInterval(checkDevToolsInterval)
            }
        }
    }, [])

    return <>{children}</>
}

export default NoDevToolsProvider
