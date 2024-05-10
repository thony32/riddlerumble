import { createRootRouteWithContext, Outlet, ScrollRestoration } from "@tanstack/react-router"
import { QueryClient } from "@tanstack/react-query"
import Loader from "@/components/loader"

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({ component: RootComponent, pendingComponent: Loader })

function RootComponent() {
    return (
        <>
            <ScrollRestoration />
            <div className="px-[3%]">
                <Outlet />
            </div>
        </>
    )
}
