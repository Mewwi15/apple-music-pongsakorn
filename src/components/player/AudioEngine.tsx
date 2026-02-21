import { useEffect, useRef } from 'react';
import { usePlayerStore } from '../store/usePlayerStore';

export const AudioEngine = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currentTrack, isPlaying, playerMode, setDuration, setCurrentTime } = usePlayerStore();

  useEffect(() => {
    const active = playerMode === 'video' ? videoRef.current : audioRef.current;
    const inactive = playerMode === 'video' ? audioRef.current : videoRef.current;

    if (inactive) {
      inactive.pause();
      inactive.src = "";
    }

    if (active && currentTrack?.previewUrl) {
      if (active.src !== currentTrack.previewUrl) {
        active.src = currentTrack.previewUrl;
      }
      if (isPlaying) active.play().catch(() => {});
      else active.pause();
    }
  }, [currentTrack, isPlaying, playerMode]);

  return (
    <div className="hidden">
      <audio 
        ref={audioRef} 
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => usePlayerStore.getState().nextTrack()}
      />
      <video 
        ref={videoRef} 
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => usePlayerStore.getState().nextTrack()}
      />
    </div>
  );
};