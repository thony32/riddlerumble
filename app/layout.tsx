import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextUIProvider } from "@nextui-org/react"
import { ReactLenis } from "@/utils/lenis"
import Footer from "@/components/landing/Footer"
import ThemeHandler from "@/components/misc/ThemeHandler"
import ReactQueryProvider from "@/utils/ReactQueryProvider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "RR - The Map Quest",
    description: "Generated by create next app",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            data-theme="light"
        >
            <body className={inter.className}>
                <NextUIProvider>
                    <main className="px-[2%] py-3">
                        <ReactLenis root>
                            <ReactQueryProvider>
                                {children}
                            </ReactQueryProvider>
                        </ReactLenis>
                    </main>
                    <footer className="mt-20">
                        <Footer />
                    </footer>
                    {/* theme handler */}
                    <div className="fixed z-50 bottom-0 left-[50%] -translate-x-[50%] py-1 px-3">
                        <ThemeHandler />
                    </div>
                </NextUIProvider>
            </body>
        </html>
    )
}
