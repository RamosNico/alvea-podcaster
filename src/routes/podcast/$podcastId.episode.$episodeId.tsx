import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/podcast/$podcastId/episode/$episodeId')({
  component: () => <div>Hello /podcast/$podcastId/episode/episodeId!</div>
})