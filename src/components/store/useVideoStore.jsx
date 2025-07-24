import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";
export const useVideoStore = create(
  persist(
    (set, get) => ({
      video: null,
      videoCache: {},
      setVideoList: (videos) => {
        const entries = videos
          .filter((v) => v?.id?.videoId)
          .map((v) => [v.id.videoId, v]);

        set(() => ({
          videoCache: Object.fromEntries(entries),
        }));
      },
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
