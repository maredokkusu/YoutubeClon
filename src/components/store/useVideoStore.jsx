import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";
export const useVideoStore = create(
  persist(
    (set, get) => ({
      video: null,
      videoCache: {},
      setVideoList: (videos) =>
        set(() => ({
          videoCache: Object.fromEntries(videos.map((v) => [v.id.videoId, v])),
        })),
      getVideoById: (id) => get().videoCache[id],
      setVideo: (videoData) => set({ video: videoData }),
      clearVideo: () => set({ video: null }),
    }),
    {
      name: "video-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
