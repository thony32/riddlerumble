import {
	createRootRouteWithContext,
	Outlet,
	ScrollRestoration,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({ component: RootComponent });

function RootComponent() {
	return (
		<>
			<ScrollRestoration />
			<div className="px-[3%]">
				<Outlet />
			</div>
		</>
	);
}
