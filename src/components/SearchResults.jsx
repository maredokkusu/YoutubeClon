import SearchVideoCard from "./SearchVideoCard";
import { fetchFromAPI } from "./api/youtube";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useVideoStore } from "./store/useVideoStore";
export default function SearchResults() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const SearchParams = new URLSearchParams(location.search);
  const query = SearchParams.get("search_query");
  const setVideoList = useVideoStore((state) => state.setVideoList);
  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetchFromAPI(`search?part=snippet&type=video&q=${query}&maxResults=50&videoDuration=medium`)
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
        const ChannelData = await fetchFromAPI(
          `channels?part=snippet,statistics&id=${ChannelsId}`
        );
        const merge = data.items.map((video) => {
          const videoStats = StatsData.items.find(
            (vs) => vs.id === video.id.videoId
          );
          const channelInfo = ChannelData.items.find(
            (ch) => ch.id === video.snippet.channelId
          );

          return {
            ...video,
            statistics: videoStats?.statistics || 0,
            channelThumbnail:
              channelInfo?.snippet?.thumbnails?.default?.url || "",
            channelSuscribers: channelInfo?.statistics?.subscriberCount || 0,
          };
        });
        setVideos(merge);
        setVideoList(merge);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Fetching Error",e);
      });
  }, [query]);
  if (loading) return <p className="text-center text-gray-400">Cargando...</p>;

  return (
    <div className="grid  gap-6 p-4">
      {videos.map((video) => (
        <SearchVideoCard key={video.id.videoId} video={video} />
      ))}
    </div>
  );
}
