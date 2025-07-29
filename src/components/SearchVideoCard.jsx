import { useNavigate } from "react-router-dom";
import he from "he";
import { formatViews, formatRelativeDate } from "./Formats";
import { useVideoStore } from "./store/useVideoStore";
export default function SearchVideoCard({ video }) {
  const { snippet, statistics,viewCount, channelThumbnail, channelSuscribers } = video;
  const setVideo = useVideoStore((state) => state.setVideo);
  const navigate = useNavigate();
  const handleClick = () => {
    setVideo(video);
    navigate(`/watch?v=${video.id.videoId}`, { state: { video },});
  };
  return (
    <article className="flex flex-col sm:flex-row gap-4 p-2 rounded-2xl hover:bg-zinc-800 transition">
      <img
        onClick={handleClick}
        className="w-full  sm:w-100 aspect-video object-cover rounded-2xl"
        src={snippet?.thumbnails?.high.url}
        alt={snippet?.title}
      />
      <section className="flex flex-col text-white flex-1">
        <h2 onClick={handleClick} className=" text-white">
          {he.decode(snippet?.title)}
        </h2>
        <time className="text-sm text-zinc-300 block mt-1">
          {formatViews(viewCount)} views •{" "}
          {formatRelativeDate(snippet?.publishedAt)}
        </time>
        <div className="mb-2 mt-2">
          <img
            className="mr-1 ml-1 w-6 inline-block rounded-2xl"
            src={channelThumbnail}
            alt=""
          />
          <p
            onClick={(e) => {
              e.stopPropagation;
              navigate(`/channel/${video.snippet.channelId}`);
            }}
            className="inline-block text-sm text-gray-400 hover:text-white "
          >
            {snippet?.channelTitle}
          </p>
        </div>
        <p onClick={handleClick} className="text-xs text-gray-400">
          {snippet?.description}
        </p>
      </section>
    </article>
  );
}
