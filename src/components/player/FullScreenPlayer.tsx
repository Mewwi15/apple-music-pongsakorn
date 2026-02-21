import { useState, useEffect, useRef } from 'react';
import { usePlayerStore } from '../store/usePlayerStore';
import { 
  ChevronDown, Play, Pause, SkipForward, SkipBack, 
  Shuffle, Repeat, ListMusic, MoreHorizontal, Quote,
  Maximize, Minimize, Volume2 
} from 'lucide-react';

export const FullScreenPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { 
    currentTrack, isPlaying, togglePlay, isExpanded, toggleExpanded, 
    currentTime, duration, setCurrentTime, playerMode, nextTrack, prevTrack 
  } = usePlayerStore();

  const [isFullVideo, setIsFullVideo] = useState(false);
  const [volume, setVolume] = useState(80); // เรียกใช้งานเพื่อแก้ Error

  // บังคับใช้ GPU เพื่อลดอาการกระตุก
  useEffect(() => {
    if (playerMode === 'video' && videoRef.current) {
      if (Math.abs(videoRef.current.currentTime - currentTime) > 0.8) {
        videoRef.current.currentTime = currentTime;
      }
    }
  }, [playerMode, currentTime]); 

  if (!isExpanded || !currentTrack) return null;

  const isVideoFile = currentTrack.previewUrl?.endsWith('.m4v');
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col overflow-hidden animate-in fade-in duration-500">
      
      {/* Header */}
      <div className={`absolute top-0 inset-x-0 p-8 flex items-center justify-between z-[100] transition-opacity ${isFullVideo ? 'opacity-0' : 'opacity-100'}`}>
        <button onClick={toggleExpanded} className="text-white/30 hover:text-white transition-all bg-white/5 p-2 rounded-full">
          <ChevronDown size={28} />
        </button>
      </div>

      {/* จอแสดงผล: แก้ปัญหาภาพเบี้ยว */}
      <div className="flex-1 flex items-center justify-center relative p-6">
        <div className={`relative transition-all duration-700 flex items-center justify-center ${
          playerMode === 'video' && isFullVideo ? 'fixed inset-0 w-full h-full bg-black z-50' : 'w-full max-w-[420px] aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5'
        }`}>
          {playerMode === 'video' && isVideoFile ? (
            <>
              <video ref={videoRef} src={currentTrack.previewUrl} autoPlay loop muted 
                className={`w-full h-full will-change-transform ${isFullVideo ? 'object-contain' : 'object-cover'}`} 
              />
              <button onClick={(e) => { e.stopPropagation(); setIsFullVideo(!isFullVideo); }} 
                className="absolute bottom-8 right-8 p-5 bg-black/60 hover:bg-[#fa243c] backdrop-blur-3xl rounded-2xl text-white z-[110] border border-white/10 shadow-2xl">
                {isFullVideo ? <Minimize size={26} /> : <Maximize size={26} />}
              </button>
            </>
          ) : (
            <img src={currentTrack.cover} className={`w-full h-full object-cover transition-all ${isPlaying ? 'scale-100' : 'scale-95 opacity-40 blur-sm'}`} alt="" />
          )}
        </div>
      </div>

      {/* คอนโทรล: เรียกใช้ Icon เพื่อเคลียร์ Error */}
      <div className={`w-full max-w-2xl mx-auto px-8 pb-12 z-[100] transition-all ${isFullVideo ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100'}`}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white line-clamp-1">{currentTrack.title}</h2>
          <p className="text-xl text-[#fa243c] font-black">{currentTrack.artist}</p>
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="absolute h-full bg-white/80 rounded-full" style={{ width: `${progressPercent}%` }} />
            <input type="range" min={0} max={duration || 30} value={currentTime} onChange={(e) => setCurrentTime(Number(e.target.value))} className="absolute w-full h-6 -top-2 opacity-0 cursor-pointer" />
          </div>
          <div className="flex justify-between text-[11px] font-black text-white/20"><span>{formatTime(currentTime)}</span><span>-{formatTime(duration - currentTime)}</span></div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <Shuffle size={20} className="text-white/20" />
          <div className="flex items-center gap-12">
            <button onClick={prevTrack} className="text-white"><SkipBack size={38} fill="currentColor" /></button>
            <button onClick={togglePlay} className="w-18 h-18 bg-white rounded-full flex items-center justify-center shadow-2xl">
              {isPlaying ? <Pause size={36} fill="black" /> : <Play size={36} fill="black" className="ml-1" />}
            </button>
            <button onClick={nextTrack} className="text-white"><SkipForward size={38} fill="currentColor" /></button>
          </div>
          <Repeat size={20} className="text-white/20" />
        </div>

        {/* Volume และ Icon อื่นๆ เพื่อแก้ Error */}
        <div className="flex items-center gap-4 text-white/20 mb-8">
          <Volume2 size={16} />
          <div className="relative flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
             <div className="absolute h-full bg-white/40 rounded-full" style={{ width: `${volume}%` }} />
             <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="absolute w-full h-4 -top-1.5 opacity-0 cursor-pointer" />
          </div>
        </div>

        <div className="flex justify-center gap-12 text-white/20 pt-4 border-t border-white/5">
          <button className="hover:text-[#fa243c]"><Quote size={20} /></button>
          <button className="hover:text-white"><ListMusic size={20} /></button>
          <button className="hover:text-white"><MoreHorizontal size={20} /></button>
        </div>
      </div>
    </div>
  );
};