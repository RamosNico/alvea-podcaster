import { createFileRoute } from "@tanstack/react-router";
import fetchPodcastDetails from "../../utils/fetch-podcast-details";

export const Route = createFileRoute("/podcast/$podcastId")({
  loader: async ({ params }) => {
    const podcastDetails = await fetchPodcastDetails(params.podcastId);
    if (!podcastDetails)
      throw new Error("Something went wrong with the podcast details.");
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
    <div className="container mx-auto">
      <h1>Welcome to the podcast: {data.title}</h1>
    </div>
  );
}
