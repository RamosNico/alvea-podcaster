import type { Podcast } from "../types";

const PodcastCard = ({ id, name, artist, image }: Podcast) => {
  return (
    <a href={`podcast/${id}`} className="w-fit group">
      <div className="w-full max-w-xs text-center border border-gray-200 rounded-lg shadow group-hover:shadow-lg group-hover:scale-110 transition-all">
        <div className="relative pt-16 flex flex-col items-center pb-4 px-4">
          <img
            className="absolute w-24 h-24 -top-9 rounded-full transition-all"
            src={image}
            alt={`Cover image for the podcast ${name}.`}
          />
          <h5 className="mb-1 text-lg font-medium text-slate-900 group-hover:text-sky-700">
            {name}
          </h5>
          <span className="text-sm text-slate-500 group-hover:text-sky-700">{artist}</span>
        </div>
      </div>
    </a>
  );
};

export default PodcastCard;
