import ReactDOM from "react-dom/client"
import "./index.css"
import { Providers } from "./services/providers"

const rootElement = document.getElementById("root")!

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(<Providers />)
}
