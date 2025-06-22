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
    fetchFromAPI(
      `search?part=snippet&type=video&q=${query}&maxResults=50`
    ).then((data) => {
      if (data?.items) {
        setVideos(data.items);
      } else setVideos([]);
      setLoading(false)
    }).catch((e)=>{console.log("Error en el fetching de datos ",e)
      setLoading(false)
    });
  },[query]);
  
  if(loading)return(<p>Cargando...</p>)

  return (
    <div className="flex flex-col gap-4 p-4">
      {videos.map((video) => (
        <SearchVideoCard
          key={video.id.videoId || video.id.channelId}
          video={video}
        ></SearchVideoCard>
      ))}
    </div>
  );
}
