import { Link } from "react-router-dom";
import he from "he"
export default function RelatedVideoCard({ video }) {
  const { snippet } = video;
  const thumbnail = snippet?.thumbnails?.medium?.url;
  return (
   <Link
  to={`/watch?v=${video?.id?.videoId}`}
  className="flex flex-col sm:flex-row gap-3 mb-4 hover:bg-zinc-800 p-2 rounded-md transition-colors"
>
  <img
    src={thumbnail}
    alt={he.decode(snippet?.title)}
    className="aspect-video w-full sm:w-40 object-cover rounded-md"
  />
  <div className="text-white overflow-hidden sm:w-60">
    <h3 className="text-sm font-semibold line-clamp-2">
      {he.decode(snippet?.title)}
    </h3>
    <p className="text-xs text-zinc-400 truncate">{snippet?.channelTitle}</p>
  </div>
</Link>
  );
}