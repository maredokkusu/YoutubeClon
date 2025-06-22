import { Link } from "react-router-dom";
export default function SearchVideoCard({ video }) {
  const { snippet } = video;
  return (
    <article className="flex flex-row border-amber-50 border-1">
      <Link to={`/watch?v=${video.id.videoId}`}>
        <img src={snippet?.thumbnails?.high.url} alt={snippet?.title} />
      </Link>
      <section>
        <h3 className="p-5 text-white">{snippet?.title}</h3>
        <p className="text-gray-400">{snippet?.channelTitle}</p>
        <time className="text-white">
          {snippet?.description}
          {snippet?.publishedAt}
        </time>
      </section>
    </article>
  );
}
