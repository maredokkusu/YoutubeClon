import { useEffect, useState } from "react";
import { fetchFromAPI } from "./api/youtube.js";
import VideoCard from "./VideoCard";
import { useVideoStore } from "./store/useVideoStore.jsx";

export default function Feed() {
  const setVideoList = useVideoStore((state) => state.setVideoList);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromAPI("search?part=snippet&type=video&q=Hololive&maxResults=50")
      .then(async (data) => {
        if (!data?.items || data.items.length === 0) {
          setVideos([]);
          setLoading(false);
          return;
        }
        const VideosId = data.items.map((v) => v.id.videoId).join(",");
        const ChannelsId = data.items.map((v) => v.snippet.channelId).join(",");
        const StatsData = await fetchFromAPI(
          `videos?part=statistics&id=${VideosId}`
        );
        const ChannelsData = await fetchFromAPI(
          `channels?part=snippet,statistics&id=${ChannelsId}`
        );

        const merge = data.items.map((video) => {
          const videoStats = StatsData.items.find(
            (vs) => vs.id === video.id.videoId
          );
          const ChannelInfo = ChannelsData.items.find(
            (ch) => ch.id === video.snippet.channelId
          );
          return {
            ...video,
            viewCount: videoStats?.statistics?.viewCount,
            channelThumbnail: ChannelInfo?.snippet?.thumbnails?.default?.url,
          };
        });
        setVideos(merge);
        setVideoList(merge);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Fetching error", e);
      });
  }, []);

  if (loading)
    return <p className="text-white text-center text-9xl">Cargando . . .</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {videos.map((video, index) => {
        const key = video?.id.videoId || video?.id || index;
      return  <VideoCard key={key} video={video} />;
      })}
    </div>
  );
}
