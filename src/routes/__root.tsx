import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRoute,
  Link,
  MatchRoute,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Spinner from "../components/spinner";

export const Route = createRootRoute({
  pendingComponent: LoadingComponent,
  component: RootComponent,
});

function RootComponent() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-2 flex gap-2">
        <nav className="navbar">
          <Link
            to="/"
            className="font-medium text-2xl text-sky-600 hover:underline"
          >
            Podcaster
          </Link>

          <MatchRoute to="/podcast/$podcastId" pending>
            <Spinner />
          </MatchRoute>

          <MatchRoute to="/podcast/$podcastId/episode/$episodeId" pending>
            <Spinner />
          </MatchRoute>
        </nav>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </QueryClientProvider>
  );
}

function LoadingComponent() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <nav className="navbar">
          <Link
            to="/"
            className="font-medium text-lg text-sky-600 hover:underline"
          >
            Podcaster
          </Link>

          <Spinner />
        </nav>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}