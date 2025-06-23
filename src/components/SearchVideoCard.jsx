import { Link } from "react-router-dom";
import { fetchFromAPI } from "./api/youtube";
export default function SearchVideoCard({ video }) {
  const { snippet, viewCount, channelThumbnail } = video;
  fetchFromAPI();
  return (
    <article className="p-5 flex flex-row  border-1">
      <Link to={`/watch?v=${video.id.videoId}`}>
        <img className="aspect-video object-cover rounded-2xl border-white border-1" src={snippet?.thumbnails?.high.url} alt={snippet?.title} />
      </Link>
      <section>
        <h2 className=" text-white">{snippet?.title}</h2>
        <img className="mr-1 ml-1 w-6 inline-block rounded-2xl" src={channelThumbnail} alt="" />
        <p className="inline-block text-gray-400 "> {snippet?.channelTitle}</p>
        <time className="block text-gray-400 text-xs mt-1">
          {new Date(snippet?.publishedAt).toLocaleDateString()}
        </time>
        <span className="inline-block text-gray-400">• {Number(viewCount).toLocaleString()} views</span>
        <p className="text-gray-400">{snippet?.description}</p>
      </section>
    </article>
  );
}
