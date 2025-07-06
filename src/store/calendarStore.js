import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCalendarStore = create(
  persist(
    (set) => ({
      emotionMap: {},
      noteMap: {},
      hasHydrated: false,
      setHasHydrated: () => set({ hasHydrated: true }),

      setEmotion: (dayKey, emoji) =>
        set((state) => ({
          emotionMap: { ...state.emotionMap, [dayKey]: emoji },
        })),

      saveNote: (dayKey, note) =>
        set((state) => ({
          noteMap: { ...state.noteMap, [dayKey]: note },
        })),

      deleteNote: (dayKey) =>
        set((state) => {
          const next = { ...state.noteMap };
          delete next[dayKey];
          return { noteMap: next };
        }),
    }),
    {
      name: "calendar-storage",
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated();
      },
    }
  )
);

export default useCalendarStore;