import { useVideoStore } from "./store/useVideoStore";
import { useLocation, useSearchParams } from "react-router-dom";
import Video from "./Video";
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
              `channels?part=snippet&id=${ChannelId}`
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
  return (
    <div className="mt-5 flex flex-row gap-6 px-4 py-6">
      <main className="flex-1">
        <Video videoId={videoId} />
        <p className="text-xl font-bold w-200 text-white">{he.decode(snippet?.title)}</p>
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
      <aside className="w-200 max-h-[full] overflow-y-hidden space-y-4:">
        <RelatedVideos videoId={videoId} />
      </aside>
    </div>
  );
}
