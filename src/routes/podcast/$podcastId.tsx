import { createFileRoute } from "@tanstack/react-router";
import fetchPodcastDetails from "../../utils/fetch-podcast-details";
import PodcastDetailsCard from "../../components/podcast-details-card";
import Card from "../../components/card";
import EpisodesTable from "../../components/episodes-table";

export const Route = createFileRoute("/podcast/$podcastId")({
  loader: async ({ params }) => {
    const podcastDetails = await fetchPodcastDetails(params.podcastId);
    if (!podcastDetails) throw new Error("Something went wrong with the podcast details.");
    return podcastDetails;
  },
  onError: ({ error }) => console.error(error),
  pendingComponent: () => (
    <main className="flex justify-center mt-12">
      <h1 className="text-5xl">Loading podcast details...</h1>
    </main>
  ),
  component: PodcastPage,
});

function PodcastPage() {
  const data = Route.useLoaderData();

  return (
    <main className="py-8 px-4 container mx-auto max-lg:space-y-8 lg:flex gap-x-4 xl:gap-x-12">
      <section className="flex justify-center lg:block w-full">
        <PodcastDetailsCard
          feedUrl={`https://api.allorigins.win/get?url=${encodeURIComponent(data.feedUrl)}`}
          lowResCover={data.lowResCover}
          title={data.title}
          artist={data.artist}
        />
      </section>

      <section className="space-y-4">
        <Card className="w-full p-4">
          <p className="text-2xl font-bold">Episodes: {data.totalEpisodes}</p>
        </Card>

        <Card className="w-full p-4">
          <EpisodesTable podcastId={data.id} episodes={data.episodes} />
        </Card>
      </section>
    </main>
  );
}
