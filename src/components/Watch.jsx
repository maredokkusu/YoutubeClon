import { useVideoStore } from "./store/useVideoStore";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import Video from "./Video";
import { formatViews } from "./Formats";
import he from "he";
import RelatedVideos from "./RelatedVideos";
import { fetchFromAPI } from "./api/youtube";
import { useEffect, useState } from "react";
export default function Watch() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const localVideo = useVideoStore((state) => state?.videoCache?.[videoId]);
  const setVideo = useVideoStore((state) => state.setVideo);
  const setVideoList = useVideoStore((state) => state.setVideoList);
  const [video, setVideoState] = useState(localVideo);
  const { state } = useLocation();
  useEffect(() => {
    if (state?.video) {
      setVideo(state.video);
      setVideoState(state.video);
      return;
    }
    if (!localVideo && videoId) {
      fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`).then(
        async (data) => {
          const videoData = data?.items?.[0];
          if (videoData) {
            const ChannelId = videoData?.snippet.channelId;
            const ChannelRes = await fetchFromAPI(
              `channels?part=snippet,statistics&id=${ChannelId}`
            );
            const channelInfo = ChannelRes?.items?.[0];
            const VideoComplete = {
              id: { videoId },
              snippet: videoData?.snippet,
              statistics: videoData?.statistics,
              ChannelThumbnail:
                channelInfo?.snippet?.thumbnails?.default.url || "",
            };
            setVideo(VideoComplete);
            setVideoList([VideoComplete]);
            setVideoState(VideoComplete);
          }
        }
      );
    }
  }, [videoId]);
  const snippet = video?.snippet;
  const statistics = video?.statistics;
  document.title = `${snippet?.title} - YouTube Clon`;

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-6 w-full max-w-screen-xl mx-auto">
      <main className=" w-full lg:w-2/3">
        <Video videoId={videoId} />
        <p className="text-xl font-bold w-200 text-white">
          {he.decode(snippet?.title)}
        </p>

        <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
  <img
    className="rounded-full w-10 h-10"
    src={video?.channelThumbnail}
    alt=""
  />
  <div className="flex flex-col">
    <p className="text-white font-medium">{snippet?.channelTitle}</p>
    <p className="text-sm text-gray-400">
      {formatViews(video?.channelSubscribers)} suscriptores
    </p>
  </div>
</div>

          <section className="flex items-center rounded-3xl overflow-hidden border border-white w-fit">
            <button className="flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 transition-colors">
              <ThumbsUp size={20} className="text-white" />
              <p className="ml-2 text-gray-400 text-sm">
                {formatViews(video?.likeCount)}
              </p>
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 border-l border-white transition-colors">
              <ThumbsDown size={20} className="text-white" />
            </button>
          </section>
        </div>


        <p className="text-gray-400">{statistics?.viewCount}</p>
      </main>
      <aside className="w-full lg:w-1/3 max-h-full overflow-hidden bg-zinc-900">
        <RelatedVideos videoId={videoId} />
      </aside>
    </div>
  );
}
