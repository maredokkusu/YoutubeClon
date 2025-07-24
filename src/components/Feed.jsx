import VideoCard from "./VideoCard";
import useFetchVideos from "./Hooks/useFetchVideos";
export default function Feed() {
const {videos,loading}=useFetchVideos({mode:"feed"})

  if (loading)
    return <p className="text-gray-600 text-center text-3xl">Loading . . .</p>;
document.title="Youtube Clon"
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 w-full">
      {videos.map((video, index) => {
        const key = video?.id.videoId || video?.id || index;
        return <VideoCard key={key} video={video} />;
      })}
    </div>
  );
}
