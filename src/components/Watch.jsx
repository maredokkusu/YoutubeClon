import { useVideoStore } from "./store/useVideoStore";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Video from "./Video";
import { formatViews } from "./Formats";
import he from "he";
import { formatRelativeDate } from "./Formats";
import RelatedVideos from "./RelatedVideos";
import { useEffect, useState } from "react";
import useFetchVideos from "./Hooks/useFetchVideos";
export default function Watch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const localVideo = useVideoStore((state) => state?.videoCache?.[videoId]);
  const setVideo = useVideoStore((state) => state.setVideo);
  const setVideoList = useVideoStore((state) => state.setVideoList);
  const [video, setVideoState] = useState(localVideo);
  const { state } = useLocation();
  const { videos: fetchedVideos, loading } = useFetchVideos({
    mode: "single",
    videoId,
  });
  useEffect(() => {
    const isValidVideo = state?.video?.snippet && state?.video?.statistics;
    if (isValidVideo) {
      setVideo(state.video);
      setVideoState(state.video);
      return;
    }
    if (fetchedVideos.length > 0) {
      const enriched = fetchedVideos[0];
      setVideo(enriched);
      setVideoList([enriched]);
      setVideoState(enriched);
    }
  }, [fetchedVideos]);
  const snippet = video?.snippet;

  document.title = `${snippet?.title} - YouTube Clon`;

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-6 w-full max-w-screen-xl mx-auto">
      <main className=" w-full lg:w-2/3">
        <Video videoId={videoId} />
        <p className="mt-2.5 text-xl font-bold w-200 text-white">
          {video?.snippet?.title &&
            he.decode(video.snippet.title.replace(/regex/, ""))}
        </p>

        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-3">
            <img
              className="rounded-full w-10 h-10"
              src={video?.channelThumbnail}
              alt=""
            />
            <div className="flex flex-col">
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  if (snippet?.channelId) {
                    navigate(`/channel/${snippet.channelId}`);
                  }
                }}
                className="text-white font-medium"
              >
                {snippet?.channelTitle}
              </p>
              <p className="text-sm text-gray-400">
                {formatViews(video?.channelSubscribers)} subscribers
              </p>
            </div>
          </div>

          <section className="flex items-center rounded-3xl overflow-hidden  w-fit">
            <button className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-500 transition-colors">
              <ThumbsUp size={20} className="text-white" />
              <p className="ml-2 text-gray-400 text-sm">
                {formatViews(video?.likeCount)}
              </p>
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-500 border-l border-gray-500 transition-colors">
              <ThumbsDown size={20} className="text-white" />
            </button>
          </section>
        </div>
        <section>
          <p className="text-gray-400">{formatViews(video?.viewCount)} views</p>
          <p className="text-gray-400">
            {formatRelativeDate(snippet?.publishedAt)}{" "}
          </p>
        </section>
      </main>
      <aside className="w-full lg:w-1/3 max-h-full overflow-hidden bg-zinc-900">
        <RelatedVideos videoId={videoId} />
      </aside>
    </div>
  );
}
