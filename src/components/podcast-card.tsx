import type { Podcast } from "../types";

const PodcastCard = ({ id, name, artist, image }: Podcast) => {
  return (
    <div className="w-full max-w-xs text-center border border-gray-200 rounded-lg shadow group hover:shadow-lg hover:scale-110 transition-all">
      <a
        href={`podcast/${id}`}
        className="relative flex flex-col items-center w-full h-full"
      >
        <img
          className="absolute w-24 h-24 -top-9 rounded-full transition-all"
          src={image}
          alt={`Cover image for the podcast ${name}.`}
        />
        <div className="pt-16 pb-4 px-4">
          <h5 className="mb-1 text-lg font-medium text-slate-900 group-hover:text-sky-700">
            {name}
          </h5>
          <span className="text-sm text-slate-500 group-hover:text-sky-700">
            {artist}
          </span>
        </div>
      </a>
    </div>
  );
};

export default PodcastCard;
