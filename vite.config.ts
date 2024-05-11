import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), TanStackRouterVite()],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
        },
    },
    define: {
        'process.env': {}
    }
})
