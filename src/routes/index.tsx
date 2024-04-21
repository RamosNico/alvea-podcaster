import { createFileRoute } from "@tanstack/react-router";
import useGetPodcasts from "../utils/useGetPodcasts";
import PodcastCard from "../components/podcast-card";
import { useDebounce } from 'use-debounce';
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  staleTime: 120_000,
});

function Home() {
  let params = new URLSearchParams(document.location.search);
  const [filter, setFilter] = useState(params.get("filter") || "");
  const [debouncedFilter] = useDebounce(filter, 100);
  const { data, isLoading, error } = useGetPodcasts();

  const results = useMemo(() => {
    if (!filter.trim()) {
      return data;
    }

    const normalizedFilter = filter.trim().toLowerCase();
    return data?.filter((d) => d.name.toLowerCase().includes(normalizedFilter));
  }, [data, debouncedFilter]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedFilter) {
      params.set("filter", debouncedFilter);
      // Update the URL in the browser without reloading the page
      window.history.pushState({}, "", `${window.location.pathname}?${params.toString()}`);
    } else {
      params.delete("filter");
      window.history.pushState({}, "", `${window.location.pathname}`);
    }
  }, [debouncedFilter])

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
              {results?.length || 0}
            </span>
            <input
              type="text"
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full max-w-xs px-2.5 py-2 border border-gray-300 text-slate-900 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500"
              placeholder="Filter podcasts..."
              required
            />
          </header>

          <section className="py-16 grid max-sm:justify-center max-sm:gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-32">
            {results?.map((podcast) => (
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
