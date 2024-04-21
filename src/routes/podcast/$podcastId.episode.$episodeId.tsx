import { createFileRoute } from "@tanstack/react-router";
import fetchPodcastDetails from "../../utils/fetch-podcast-details";
import PodcastDetailsCard from "../../components/podcast-details-card";
import Card from "../../components/card";
import { PodcastEpisode } from "../../types";

export const Route = createFileRoute("/podcast/$podcastId/episode/$episodeId")({
  loader: async ({ params }) => {
    const podcastDetails = await fetchPodcastDetails(params.podcastId);
    if (!podcastDetails)
      throw new Error("Something went wrong with the podcast details.");
    return podcastDetails;
  },
  component: EpisodePage,
});

function EpisodePage() {
  const data = Route.useLoaderData();
  const params = Route.useParams();

  const episode: PodcastEpisode | undefined = data.episodes.find(
    (e) => e.trackId === +params.episodeId
  );

  return (
    <main className="pt-8 px-4 container mx-auto max-lg:space-y-8 lg:flex gap-x-4 xl:gap-x-12">
      <section className="flex justify-center lg:block w-full">
        <PodcastDetailsCard
          lowResCover={data.lowResCover}
          title={data.title}
          artist={data.artist}
          description={data.description}
        />
      </section>

      <section className="space-y-4 w-full">
        {episode && (
          <Card className="w-full py-6 px-4">
            <h1 className="mb-2 text-2xl font-bold">{episode.trackName}</h1>
            <p>{episode.description}</p>

            <hr className="h-px my-8 bg-gray-300 border-0" />

            <audio
              className="w-full"
              src={episode.episodeUrl}
              controls
            ></audio>
          </Card>
        )}
      </section>
    </main>
  );
}
