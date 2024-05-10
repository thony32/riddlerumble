import { routeTree } from "@/routeTree.gen"
import { queryClient } from "./react-query"
import { createRouter } from "@tanstack/react-router"

// Set up a Router instance
export const router = createRouter({
    routeTree,
    context: {
        queryClient,
    },
    defaultPreload: "intent",
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
})

// Register things for typesafety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}
