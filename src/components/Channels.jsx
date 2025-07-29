import { useState } from "react";
import { useParams } from "react-router-dom";
import { formatViews } from "./Formats";
import VideoCard from "./VideoCard";
import useFetchVideos from "./Hooks/useFetchVideos";
export default function Channels() {
  const { id } = useParams();
  const { videos } = useFetchVideos({ mode: "channels", id });
  const channel = videos[0];
  if (!channel)return <p className="text-white" >Loading . . .</p>
  const { snippet, statistics, description, brandingSettings } = channel;
  const bannerUrl = channel?.channelBanner;
   const avatar = channel?.channelThumbnail;

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
