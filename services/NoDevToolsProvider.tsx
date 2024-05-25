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

            const checkDevTools = () => {
                if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
                    alert("Veuillez fermer les outils de développement.")
                }
            }

            const checkChromeDevTools = () => {
                if (typeof (window as any).chrome !== "undefined" && (window as any).chrome.runtime) {
                    ;(window as any).chrome.runtime.sendMessage("", {}, function (response: any) {
                        if (response && response.type === "DevToolsOpened") {
                            alert("Veuillez fermer les outils de développement.")
                        }
                    })
                }
            }

            const checkFirefoxDevTools = () => {
                if (typeof (window as any).InstallTrigger !== "undefined") {
                    window.addEventListener("devtoolschange", function (e: any) {
                        if (e.detail.open) {
                            alert("Veuillez fermer les outils de développement.")
                        }
                    })
                }
            }

            document.addEventListener("contextmenu", handleContextMenu)
            document.addEventListener("keydown", handleKeyDown)

            const checkDevToolsInterval = setInterval(() => {
                checkDevTools()
                checkChromeDevTools()
                checkFirefoxDevTools()
            }, 1000)

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
