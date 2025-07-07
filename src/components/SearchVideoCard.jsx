import { useNavigate } from "react-router-dom";
import { useVideoStore } from "./store/useVideoStore";
export default function SearchVideoCard({ video }) {
  const { snippet, viewCount, channelThumbnail } = video;
  const setVideo = useVideoStore((state) => state.setVideo);
  const navigate = useNavigate();
  const handleClick = () => {
    setVideo(video);
    navigate(`/watch?v=${video.id.videoId}`);
  };
  return (
    <article
      className="p-5 flex flex-row  border-1 border-gray-600 rounded-2xl"
      onClick={handleClick}
    >
      <img
        className="aspect-video object-cover rounded-2xl border-gray-600 border-1 mr-5"
        src={snippet?.thumbnails?.high.url}
        alt={snippet?.title}
      />
      <section>
        <h2 className=" text-white">{snippet?.title}</h2>
        <span className="inline-block text-gray-400 text-xs">
          {Number(viewCount).toLocaleString()} views •
        </span>
        <time className="inline-block text-gray-400 text-xs mt-1">
          {new Date(snippet?.publishedAt).toLocaleDateString()}
        </time>
        <div className="mb-2 mt-2">
          <img
            className="mr-1 ml-1 w-6 inline-block rounded-2xl"
            src={channelThumbnail}
            alt=""
          />
          <p className="inline-block text-sm text-gray-400 hover:text-white "> {snippet?.channelTitle}</p>
        </div>
        <p className="text-sm text-gray-400">{snippet?.description}</p>
      </section>
    </article>
  );
}
