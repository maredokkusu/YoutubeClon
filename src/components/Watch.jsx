import { useVideoStore } from "./store/useVideoStore";
import { useLocation, useSearchParams } from "react-router-dom";
import Video from "./Video";
export default function Watch() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const localVideo = useVideoStore((state) => state?.videoCache?.[videoId]);
  const { state } = useLocation();
  const video = state?.video || localVideo;
  const snippet = video?.snippet;
  const statistics = snippet?.statistics;
  const title = snippet?.title;

  return (
    <div>
      <Video videoId={videoId} />
      <p className="text-xl font-bold w-200 text-white">{title}</p>
      <img className="rounded-full inline-block w-10 h-10 " src={video?.channelThumbnail} alt="" />
      <p className="inline-block text-white">{snippet?.channelTitle}</p>
      <p className="text-gray-400"></p>
      <p>{statistics}</p>
    </div>
  );
}
