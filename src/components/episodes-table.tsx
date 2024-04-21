import { Link } from "@tanstack/react-router";
import type { PodcastEpisode } from "../types";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  return date.toLocaleDateString("en-GB"); // 'en-GB' uses day/month/year format
}

const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => (num < 10 ? "0" + num : num);

  return `${hours ? `${pad(hours)}:` : ""}${pad(minutes)}:${pad(seconds)}`;
};

interface Props {
  podcastId: number;
  episodes: PodcastEpisode[];
}

const EpisodesTable = ({ podcastId, episodes }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-gray-500">
        <thead className="text-gray-700 border-b-2">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((e: PodcastEpisode) => (
            <tr
              className="even:bg-white odd:bg-gray-50 border-b"
              key={e.episodeUrl}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap"
              >
                <Link
                  to="/podcast/$podcastId/episode/$episodeId"
                  params={{
                    podcastId: podcastId.toString(),
                    episodeId: e.trackId.toString(),
                  }}
                  className="text-sky-600 hover:text-sky-700 hover:underline transition-all"
                >
                  {e.trackName}
                </Link>
              </th>
              <td className="px-6 py-4">{formatDate(e.releaseDate)}</td>
              <td className="px-6 py-4">{formatDuration(e.trackTimeMillis)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EpisodesTable;
