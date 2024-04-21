import { useState, useEffect } from "react";
import fetchXML from "./fetch-xml";

interface Data {
  podcastCover: string;
  podcastDescription: string;
};

const useGetPodcastFeed = (url: string) => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const feedData: any = await fetchXML(url)

      setData({
        podcastCover: feedData.rss.channel.image.url,
        podcastDescription: feedData.rss.channel.description,
      });
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

export default useGetPodcastFeed;