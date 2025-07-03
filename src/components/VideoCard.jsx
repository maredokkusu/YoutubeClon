import { Link } from "react-router-dom";
export default function VideoCard({ video }) {
  const { snippet,viewCount,channelThumbnail } = video;
  return (
    <article className="w-full h-65 sm:w-72 bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform">
      <Link to={`/watch?v=${video.id.videoId}`}>
        <img
          className="w-full h-40 object-cover rounded"
          src={snippet?.thumbnails?.high.url}
          alt={snippet?.title}
        />
      </Link>
      <section className="p-3 text-white">
       <img src={channelThumbnail} alt="" />
        <h3 className="text-sm font-semibold line-clamp-2">{snippet?.title}</h3>
        <p className="text-xs not-italic text-zinc-400 mt-1">
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
