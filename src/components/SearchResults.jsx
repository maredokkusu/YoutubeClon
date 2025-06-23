import SearchVideoCard from "./SearchVideoCard";
import { fetchFromAPI } from "./api/youtube";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function SearchResults() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const SearchParams = new URLSearchParams(location.search);
  const query = SearchParams.get("search_query");
  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetchFromAPI(`search?part=snippet&type=video&q=${query}&maxResults=50`)
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
            viewCount: videoStats?.statistics?.viewCount || 0,
            channelThumbnail:
              channelInfo?.snippet?.thumbnails?.default?.url || "",
            channelSuscribers: channelInfo?.statistics?.subscriberCount || 0,
          };
        });
        setVideos(merge);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Fetching Error");
      });
  }, [query]);
  if (loading) return <p className="text-gray-400">Cargando...</p>;

  return (
    <div className="flex flex-col gap-4 p-4">
      {videos.map((video) => (
        <SearchVideoCard key={video.id.videoId} video={video} />
      ))}
    </div>
  );
}
