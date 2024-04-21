export type Podcast = {
  id: string;
  name: string;
  artist: string;
  image: string;
};

export type PodcastDetails = {
  id: number;
  title: string;
  artist: string;
  description: string;
  cover?: string;
  lowResCover: string;
  feedUrl: string;
  totalEpisodes: number;
  episodes: PodcastEpisode[];
}
export type PodcastEpisode = {
  trackId: number;
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
  description: string;
  episodeUrl: string;
}