import { QueryClient, DefaultOptions } from "@tanstack/react-query"

const queryConfig: DefaultOptions = {
    queries: {
        throwOnError: true,
        refetchOnWindowFocus: false,
        retry: false,
    },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })
