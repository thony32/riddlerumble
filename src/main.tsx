import React from 'react'
import ReactDOM from "react-dom/client"
import "./index.css"
import { Providers } from "./services/providers"
import { NextUIProvider } from '@nextui-org/react'

const rootElement = document.getElementById("root")!

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <React.StrictMode>
            <NextUIProvider>
                <Providers />
            </NextUIProvider >
        </React.StrictMode>
    )
}
