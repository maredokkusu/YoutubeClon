import { Link } from "react-router-dom";
export default function VideoCard({ video }) {
  const { snippet, viewCount, channelThumbnail } = video;
  return (
    <article className="bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform">
      <Link to={`/watch?v=${video.id.videoId}`}>
        <img
          className="w-full h-60 object-cover"
          src={snippet?.thumbnails?.high.url}
          alt={snippet?.title}
        />
      </Link>
      <section className="p-4 text-white">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={channelThumbnail}
            alt=""
            className="inline-block w-8 h-8 rounded-full"
          />

          <h3 className="line-clamp-2 text-sm font-semibold">
            {snippet?.title}
          </h3>
        </div>
        <p className="text-xs not-italic text-zinc-400 ">
          {snippet?.channelTitle}
        </p>

        <time className="text-xs text-zinc-400">
          {viewCount}
          {snippet?.publishedAt}
        </time>
      </section>
    </article>
  );
}
