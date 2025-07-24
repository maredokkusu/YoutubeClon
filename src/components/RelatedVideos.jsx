import { useVideoStore } from "./store/useVideoStore";
import RelatedVideoCard from "./RelatedVideoCard";
import { useSearchParams } from "react-router-dom";
import useFetchVideos from "./Hooks/useFetchVideos";
import { useLocation } from "react-router-dom";
export default function RelatedVideos() {
 const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const videoFromCache = useVideoStore((state) => state.videoCache[videoId]);
  const video = state?.video || videoFromCache;

  const title = video?.snippet?.title;
  const { videos: relatedvideos } = useFetchVideos({
    mode: "related",
    title: title || "",
  });

  if (!video || !video?.snippet) return null;

  return (
    <div className="w-11/12 overflow-hidden">
      {relatedvideos.map((video) => (
        <RelatedVideoCard video={video} key={video.id?.videoId || video.id} />
      ))}
    </div>
  );
}
