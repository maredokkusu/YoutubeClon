import { useState } from "react";
import { fetchFromAPI } from "./youtube";
export default function LoadingContent() {
  const [videos, setVideos] = useState([]);
  fetchFromAPI("search?part=snippet&type=video&q=Hololive&maxResults=50").then(
    (data) => {
      if (data?.items) {
        setVideos(data.items);
      }
    }
  );
}
