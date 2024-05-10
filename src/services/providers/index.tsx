import { RouterProvider } from "@tanstack/react-router"
import { QueryClientProvider } from "@tanstack/react-query"
import { HelmetProvider } from "react-helmet-async"
import { queryClient } from "./react-query"
import { router } from "./react-router"
export function Providers() {
    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </HelmetProvider>
    )
}
