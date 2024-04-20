import { useEffect, useState } from "react";

const useGetPodcasts = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

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
        image: d["im:image"][d["im:image"].length - 1].label,
      }));

      setData(podcasts);
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
