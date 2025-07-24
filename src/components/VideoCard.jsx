import { Link, useNavigate } from "react-router-dom";
import he from "he"
import { formatViews, formatRelativeDate } from "./Formats";
export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const {
    snippet,
    viewCount,
    channelThumbnail,
    channelSubscribers,
    likeCount,
  } = video;
  return (
    <article className="bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform">
      <Link to={`/watch?v=${video.id.videoId}`}>
        <img
          className=""
          src={snippet?.thumbnails?.high.url}
          alt={snippet?.title}
        />
      </Link>
      <section className="p-4 text-white">
        <div className="flex items-start gap-3 mb-2">
          <img
            src={channelThumbnail}
            alt={snippet?.title}
            className="w-8 h-8 rounded-full"
          />

          <h3 className=" line-clamp-2 text-sm font-semibold ">
            {he.decode(snippet?.title)}
          </h3>
        </div>
        <p
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/channel/${video.snippet.channelId}`);
          }}
          className="text-xs not-italic text-zinc-400 hover:text-white "
        >
          {snippet?.channelTitle}
        </p>
        <time className="text-xs text-zinc-400">
          {formatViews(viewCount)}{"  "} views •{"  "}
          {formatRelativeDate(snippet?.publishedAt)}
        </time>
      </section>
    </article>
  );
}
