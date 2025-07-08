import { useNavigate } from "react-router-dom";
import he from "he"
import { useVideoStore } from "./store/useVideoStore";
export default function SearchVideoCard({ video }) {
  const { snippet, viewCount, channelThumbnail } = video;
  const setVideo = useVideoStore((state) => state.setVideo);
  const navigate = useNavigate();
  function formatRelativeDate(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const secondsAgo = Math.floor((now - date) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];
 const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    for (const interval of intervals) {
      const count = Math.floor(secondsAgo / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  }
  function formatViews(views) {
    const num = Number(views);
    if (isNaN(num)) return "";

    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + " M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + " K";
    return num.toString();
  }
  const handleClick = () => {
    setVideo(video);
    navigate(`/watch?v=${video.id.videoId}`);
  };
  return (
    <article className="p-5 flex flex-row  rounded-2xl" onClick={handleClick}>
      <img
        className="aspect-video object-cover rounded-2xl mr-5"
        src={snippet?.thumbnails?.high.url}
        alt={snippet?.title}
      />
      <section>
        <h2 className=" text-white">{he.decode(snippet?.title)}</h2>
        <time className="text-sm text-zinc-300 block mt-1">
          {formatViews(viewCount)} 
          {" "}views{" "} • {" "}
          {formatRelativeDate(snippet?.publishedAt)}
        </time>
        <div className="mb-2 mt-2">
          <img
            className="mr-1 ml-1 w-6 inline-block rounded-2xl"
            src={channelThumbnail}
            alt=""
          />
          <p className="inline-block text-sm text-gray-400 hover:text-white ">
            {snippet?.channelTitle}
          </p>
        </div>
        <p className="text-xs text-gray-400">{snippet?.description}</p>
      </section>
    </article>
  );
}
