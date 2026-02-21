import { create } from 'zustand';
import type { MusicItem } from '../api/musicService';

interface PlayerState {
  currentTrack: MusicItem | null;
  queue: MusicItem[];
  isPlaying: boolean;
  isExpanded: boolean;
  currentTime: number;
  duration: number;
  playerMode: 'audio' | 'video';
  setTrack: (track: MusicItem, newQueue?: MusicItem[]) => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
  toggleExpanded: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setPlayerMode: (mode: 'audio' | 'video') => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  isExpanded: false,
  currentTime: 0,
  duration: 0,
  playerMode: 'audio',

  setTrack: (track, newQueue) => {
    const isVideo = track.previewUrl?.endsWith('.m4v');
    set({ 
      currentTrack: track, 
      queue: newQueue || get().queue, 
      isPlaying: true, 
      currentTime: 0,
      playerMode: isVideo ? 'video' : 'audio'
    });
  },
  
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration: duration }),
  setPlayerMode: (mode) => set({ playerMode: mode }),

  nextTrack: () => {
    const { queue, currentTrack } = get();
    const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
    if (currentIndex !== -1 && currentIndex < queue.length - 1) {
      const next = queue[currentIndex + 1];
      get().setTrack(next);
    }
  },

  prevTrack: () => {
    const { queue, currentTrack, currentTime } = get();
    if (currentTime > 3) {
      set({ currentTime: 0 });
    } else {
      const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
      if (currentIndex > 0) {
        const prev = queue[currentIndex - 1];
        get().setTrack(prev);
      }
    }
  },
}));