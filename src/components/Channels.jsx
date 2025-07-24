import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "./api/youtube";
import { formatViews } from "./Formats";
import VideoCard from "./VideoCard";
export default function Channels() {
  const { id } = useParams();
  const [videos, setVideos] = useState([]); 
  const [channel, setChannel] = useState([]);
  useEffect(() => {
    const fetchChannelandVideos = async () => {
      try {
        const ChannelRes = await fetchFromAPI(
          `channels?part=snippet,brandingSettings,statistics&id=${id}`
        );
        const VideosRes = await fetchFromAPI(
          `search?channelId=${id}&part=snippet&type=video&order=date&videoDuration=medium&maxResults=50`
        );
        const ChannelData = ChannelRes?.items?.[0];
        
        const VideoData = VideosRes?.items || [];
        setChannel(ChannelData || null);
        setVideos(VideoData || []);
      } catch (e) {
        console.error("Fetching get error", e);
      }
    };
    fetchChannelandVideos();
  }, [id]);
  if (!channel) return <p className="text-white p-4">Cargando canal...</p>;

  const { snippet, brandingSettings, statistics } = channel;
  const bannerUrl =
    brandingSettings?.image?.bannerTvImageUrl ||
    brandingSettings?.image?.bannerImageUrl ||
    brandingSettings?.image?.bannerExternalUrl;
  const avatar = snippet?.thumbnails?.high?.url;
 document.title= `${snippet?.title}`
  return (
    <div className="w-full text-white">
      {bannerUrl && (
        <header
          className=" w-300 h-50 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bannerUrl})`,
          }}
        />
      )}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={avatar}
          alt={snippet?.title}
          className="w-28 h-28 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-semibold">{snippet?.title}</h1>
          <p className="text-sm text-zinc-400">
            {formatViews(Number(statistics?.subscriberCount))} subscribers
          </p>
          <p className="text-zinc-400 mt-2">{snippet?.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id.videoId} video={video} />
        ))}
      </div>
    </div>
  );
}
