import { Link } from "react-router-dom";
export default function RelatedVideoCard({ video }) {
  const { snippet } = video;
  const thumbnail = snippet?.thumbnails?.medium?.url;
  return (
     <Link
      to={`/watch?v=${video?.id?.videoId}`}
      className="flex gap-3 mb-4 hover:bg-zinc-800 p-2 rounded-md transition-colors"
    >
      <img
        src={thumbnail}
        alt={snippet?.title}
        className="w-40 h-24 object-cover rounded-md flex-shrink-0"
      />

      <div className="flex flex-col justify-start text-white overflow-hidden">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2">
          {snippet?.title}
        </h3>
        <p className="text-xs text-zinc-400 truncate">{snippet?.channelTitle}</p>
      </div>
    </Link>
  );
}