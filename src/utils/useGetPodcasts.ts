import { useEffect, useState } from "react";
import type { Podcast } from "../types";
import checkLastFetch from "./check-last-fetch";

const useGetPodcasts = () => {
  const [data, setData] = useState<Podcast[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    const localPodcasts = localStorage.getItem("podcasts");
    const lastFetch = localStorage.getItem("lastFetch");

    if (localPodcasts && checkLastFetch(lastFetch)) {
      setIsLoading(false);
      return setData(JSON.parse(localPodcasts));
    } else {
      localStorage.removeItem("podcasts");
      localStorage.removeItem("lastFetch");
    };

    try {
      const response = await fetch(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong when fetching the podcasts");
      }
      const result = await response.json();

      const podcasts = result.feed.entry.map((d: any) => ({
        id: d.id.attributes["im:id"],
        artist: d["im:artist"].label,
        name: d.title.label,
        // Use the latest image of the array as it seems to always be the highest quality
        image: d["im:image"][d["im:image"].length - 1].label,
      }));

      setData(podcasts);

      localStorage.setItem("podcasts", JSON.stringify(podcasts));
      localStorage.setItem("lastFetch", new Date().getTime().toString());
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useGetPodcasts;
