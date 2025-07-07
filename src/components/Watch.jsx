import { useVideoStore } from "./store/useVideoStore";
import { useLocation, useSearchParams } from "react-router-dom";
import Video from "./Video";
import RelatedVideos from "./RelatedVideos";
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
    <div className="flex flex-row gap-6 px-4 py-6">
      <main className="flex-1">
        <Video videoId={videoId} />
        <p className="text-xl font-bold w-200 text-white">{title}</p>
        <div className="flex items-center gap-2 my-2">
          <img
            className="rounded-full inline-block w-10 h-10 "
            src={video?.channelThumbnail}
            alt=""
          />
          <p className="inline-block text-white">{snippet?.channelTitle}</p>
        </div>
        <p className="text-gray-400"></p>
        <p>{statistics}</p>
      </main>
      <aside className="w-80 max-h-[80vh] overflow-y-auto space-y-4:">
        <RelatedVideos videoId={videoId} />
      </aside>
    </div>
  );
}
