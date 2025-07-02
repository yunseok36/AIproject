import { create } from "zustand";

const useCalendarStore = create((set) => ({
  emotionMap: {},
  noteMap: {},
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
}));

export default useCalendarStore;