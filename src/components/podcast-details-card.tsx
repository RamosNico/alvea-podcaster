import fetchXML from "../utils/fetch-xml";
import Card from "./card";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./spinner";

interface Props {
  feedUrl: string;
  lowResCover: string;
  title: string;
  artist: string;
}

const PodcastDetailsCard = ({ feedUrl, lowResCover, title, artist }: Props) => {
  const { data } = useQuery({
    queryKey: [feedUrl],
    queryFn: async () => {
      try {
        const feedData: any = await fetchXML(feedUrl);

        return {
          podcastCover: feedData.rss.channel.image.url,
          podcastDescription: feedData.rss.channel.description,
        };
      } catch (error: any) {
        console.error("Something went wrong while fetching the feedUrl.");
      }
    },
  });

  return (
    <Card className="w-80 lg:w-72">
      <div className="divide-y">
        <section className="p-4">
          <img
            className="mx-auto w-48 h-w-48 rounded-md transition-all"
            src={data?.podcastCover || lowResCover}
            alt={`Cover image for the podcast ${title}.`}
          />
        </section>

        <section className="p-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <p>by {artist}</p>
        </section>

        <section className="p-4">
          <p className="font-bold">Description</p>
          {data?.podcastDescription && (
            <p className="break-words">{data.podcastDescription}</p>
          )}
          {!data?.podcastDescription && (
            <div className="flex items-center gap-x-2">
              <p>Loading description</p> <Spinner className="w-5 h-5" />
            </div>
          )}
        </section>
      </div>
    </Card>
  );
};

export default PodcastDetailsCard;
