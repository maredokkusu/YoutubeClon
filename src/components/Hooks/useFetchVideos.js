import { useState, useEffect, use } from "react";
import { fetchFromAPI } from "../api/youtube";
import { useVideoStore } from "../store/useVideoStore";
export default function useFetchVideos({
  query = "programming",
  mode = "feed",
  title = "",
  videoId = "",
}) {
  const setVideoList = useVideoStore((state) => state.setVideoList);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const base = `search?part=snippet&type=video`;
    let endpoint = "";
    if (mode === "feed" || mode === "search") {
      endpoint = `${base}&q=${encodeURIComponent(
        query
      )}&maxResults=50&videoDuration=medium`;
    } else if (mode === "related") {
      endpoint = `${base}&q=${encodeURIComponent(
        title
      )}&maxResults=50&videoDuration=medium`;
    } else if (mode === "single") {
      endpoint = `videos?part=snippet,statistics&id=${videoId}`;
    }
    const fetchFeed = async () => {
      try {
        const data = await fetchFromAPI(endpoint);
        if (!data.items || data.items.length === 0) {
          setVideos([]);
          setLoading(false);
          return;
        }
        const videoIds = data.items
          .map((v) => (mode === "single" ? v.id : v.id.videoId))
          .join(",");
        const channelIds = data.items
          .map((v) =>
            mode === "single" ? v.snippet.channelId : v.snippet.channelId
          )
          .join(",");

        if (!videoIds || !channelIds) {
          console.warn("Missing videoIds or channelIds", {
            videoIds,
            channelIds,
          });
          setVideos([]);
          setLoading(false);
          return;
        }

        const [statsData, channelsData] = await Promise.all([
          fetchFromAPI(`videos?part=statistics&id=${videoIds}`),
          fetchFromAPI(`channels?part=snippet,statistics&id=${channelIds}`),
        ]);

        if (!statsData.items || !channelsData.items) {
          console.error("Invalid stats or channel data", {
            statsData,
            channelsData,
          });
          setVideos([]);
          setLoading(false);
          return;
        }
        const merge = data.items
          .filter((video) => video && video.snippet && video.snippet.title)
          .map((video) => {
            const snippet = video.snippet || {};
            const isSingle = mode === "single";
            const videoId = isSingle ? video.id : video.id?.videoId || video.id;
            const channelId = snippet.channelId;

            const videoStats = statsData.items.find((vs) => vs.id === videoId);
            const ChannelInfo = channelsData.items.find(
              (ch) => ch.id === channelId
            );

            return {
              ...video,
              viewCount: videoStats?.statistics?.viewCount,
              likeCount: videoStats?.statistics?.likeCount,
              channelThumbnail: ChannelInfo?.snippet?.thumbnails?.default?.url,
              channelSubscribers:
                ChannelInfo?.statistics?.subscriberCount || "Subs not found",
            };
          });
        setVideos(merge);
        setVideoList(merge);
      } catch (e) {
        console.error("Fetch Error", e);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, [query, mode, title, videoId]);
  return { videos, loading };
}
