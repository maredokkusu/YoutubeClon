import { useEffect } from "react";
import { useVideoStore } from "./store/useVideoStore";
import { fetchFromAPI } from "./api/youtube";
import { useState } from "react";
import RelatedVideoCard from "./RelatedVideoCard";
import { useSearchParams } from "react-router-dom";
export default function RelatedVideos() {
  const [relatedvideos, setRelatedVideos] = useState([]);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const video = useVideoStore((state) => state.videoCache[videoId]);
  const title = video?.snippet.title;
  useEffect(() => {
    const fetchrelated = async () => {
      try {
        const byTitle = await fetchFromAPI(
          `search?part=snippet&type=video&q=${encodeURIComponent(
            title
          )}&videoDuration=medium&maxResults=20`
        );
        setRelatedVideos(byTitle.items || []);
      } catch (e) {
        console.error("error en el fetching", e);
      }
    };
    fetchrelated();
  }, [title]);
  if (!video || !video.snippet) {
    return;
  }

  return (
    <div className="w-11/12 overflow-hidden">
      {relatedvideos.map((video) => (
        <RelatedVideoCard video={video} key={video.id.videoId} />
      ))}
    </div>
  );
}
