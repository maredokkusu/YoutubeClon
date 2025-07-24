import SearchVideoCard from "./SearchVideoCard";
import useFetchVideos from "./Hooks/useFetchVideos";
import { useLocation } from "react-router-dom";
export default function SearchResults() {
  const location = useLocation();
  const SearchParams = new URLSearchParams(location.search);
  const query = SearchParams.get("search_query");
  const {videos,loading}=useFetchVideos({mode:"search",query})
 
  if (loading) return <p className="text-center text-gray-400">Cargando...</p>;

  return (
    <div className="grid  gap-6 p-4">
      {videos.map((video) => (
        <SearchVideoCard key={video.id.videoId} video={video} />
      ))}
    </div>
  );
}
