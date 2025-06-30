import { create } from "zustand";
import { useLocation, useSearchParams } from "react-router-dom";
import Video from "./Video";
useSearchParams;
export const useVideostore = create((set) => ({
  video: null,
  setVideo: (videoData) => set(() => ({ video: videoData })),
  clearVideo: () => set({ video: null }),
}));
export default function Watch() {
  const localVideo = useVideostore((state) => state.video);
  const { state } = useLocation();
  const video = state?.video || localVideo;
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const snippet = video?.snippet;
  const statistics = video?.statistics;

  return (
    <div>
      <Video videoId={videoId} />
      <p className="text-white">{snippet?.channelTitle}</p>
    </div>
  );
}
