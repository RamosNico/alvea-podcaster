import type { PodcastDetails, PodcastEpisode } from "../types";

const fetchPodcastDetails = async (podcastId: string) => {
  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`;

  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(
        "Something went wrong while fetching the podcast details."
      );

    const data = await response.json();
    if (!data.contents) {
      console.error("No data received");
      return null;
    }

    const results = JSON.parse(data.contents).results;
    // Assuming the first entry is the podcast and the rest are episodes
    const podcastInfo = results[0];
    const episodes = results.slice(1);

    const podcast: PodcastDetails = {
      id: podcastInfo.collectionId,
      title: podcastInfo.collectionName,
      artist: podcastInfo.artistName,
      lowResCover: podcastInfo.artworkUrl1600 || podcastInfo.artworkUrl100,
      feedUrl: podcastInfo.feedUrl,
      totalEpisodes: podcastInfo.trackCount,
      episodes: episodes.map((episode: PodcastEpisode) => ({
        trackId: episode.trackId,
        trackName: episode.trackName,
        releaseDate: episode.releaseDate,
        trackTimeMillis: episode.trackTimeMillis,
        description: episode.description,
        episodeUrl: episode.episodeUrl,
      })),
    };
    return podcast;
  } catch (error) {
    console.error("Failed to fetch or parse podcast data", error);
    return null;
  }
};

export default fetchPodcastDetails;
