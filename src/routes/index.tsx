import { createFileRoute } from "@tanstack/react-router";
import useGetPodcasts from "../utils/useGetPodcasts";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data, isLoading, error } = useGetPodcasts();

  return (
    <div className="container mx-auto">
      {isLoading && (
        <main className="flex justify-center items-center h-screen">
          <h1 className="text-5xl">Loading podcasts...</h1>
        </main>
      )}

      {!isLoading && error && (
        <main className="flex justify-center items-center h-screen">
          <h1>We are sorry! Something went wrong</h1>
        </main>
      )}

      {!isLoading && data && (
        <h1>Loaded</h1>
      )}
    </div>
  );
}
