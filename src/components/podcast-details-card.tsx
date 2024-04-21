import Card from "./card";

interface Props {
  lowResCover: string;
  title: string;
  artist: string;
  description: string;
}

const PodcastDetailsCard = ({ lowResCover, title, artist, description }: Props) => {
  return (
    <Card className="w-80 lg:w-60">
      <div className="divide-y">
        <section className="p-4">
          <img
            className="mx-auto w-48 h-w-48 rounded-md transition-all"
            src={lowResCover}
            alt={`Cover image for the podcast ${title}.`}
          />
        </section>

        <section className="p-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <p>by {artist}</p>
        </section>

        <section className="p-4">
          <p className="font-bold">Description</p>
          <p>{description || "Loading description..."}</p>
        </section>
      </div>
    </Card>
  );
};

export default PodcastDetailsCard;
