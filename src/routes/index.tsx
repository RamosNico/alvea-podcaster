import { createFileRoute } from "@tanstack/react-router";
import useGetPodcasts from "../utils/useGetPodcasts";
import PodcastCard from "../components/podcast-card";

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
        <main className="py-4">
          <header className="flex items-center justify-end gap-x-4">
            <span className="max-h-6 px-1.5 bg-sky-600 text-white font-bold rounded-lg flex items-center justify-center">
              {data.length}
            </span>
            <input
              type="text"
              id="filter"
              className="w-full max-w-xs px-2.5 py-2 border border-gray-300 text-slate-900 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500"
              placeholder="Filter podcasts..."
              required
            />
          </header>

          <section className="py-16 grid grid-cols-4 gap-x-6 gap-y-32">
            {data.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                id={podcast.id}
                name={podcast.name}
                artist={podcast.artist}
                image={podcast.image}
              />
            ))}
          </section>
        </main>
      )}
    </div>
  );
}
