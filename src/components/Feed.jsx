import { useEffect, useState } from "react";
import { fetchFromAPI } from "./api/youtube.js";
import VideoCard from "./VideoCard";

export default function Feed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromAPI("search?part=snippet&type=video&q=Hololive&maxResults=50")
      .then(async(data) => {
        if (data?.items) setVideos(data.items);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Error fetching videos:", e);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-white text-center text-5xl">Cargando . . .</p>;

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {videos.map((video) => (
        <VideoCard key={video.id.videoId || video.id.channelId} video={video} />
      ))}
    </div>
  );
}
