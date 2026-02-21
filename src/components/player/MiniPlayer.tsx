import { Play, Pause, SkipForward, SkipBack, Volume2, ListMusic, Shuffle, Repeat, Quote, MoreHorizontal } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';

export const MiniPlayer = () => {
  // ดึง toggleExpanded มาใช้เพื่อเปิดหน้าจอใหญ่
  const { currentTrack, isPlaying, togglePlay, currentTime, duration, setCurrentTime, toggleExpanded } = usePlayerStore();

  if (!currentTrack) return null;

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[900px] z-[100]">
      <div className="bg-[#2c2c2e]/80 backdrop-blur-2xl border border-white/10 rounded-full h-16 px-6 flex items-center justify-between shadow-2xl relative">
        
        {/* ส่วนปุ่มควบคุมด้านซ้าย */}
        <div className="flex items-center gap-5 text-white/70">
          <Shuffle size={16} />
          <SkipBack size={22} fill="currentColor" />
          <button onClick={togglePlay} className="text-white hover:scale-110 transition-transform">
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>
          <SkipForward size={22} fill="currentColor" />
          <Repeat size={16} />
        </div>

        {/* ส่วนกลาง: คลิกตรงนี้เพื่อเปิด FullScreen */}
        <div 
          onClick={toggleExpanded} 
          className="flex-1 flex flex-col justify-center px-8 min-w-0 h-full cursor-pointer group"
        >
          <div className="flex items-center gap-3 self-center mb-1 transition-transform group-hover:scale-105">
            <div className="w-8 h-8 rounded overflow-hidden shadow-lg">
              <img src={currentTrack.cover} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="truncate text-center max-w-[200px]">
              <h4 className="text-[13px] font-bold text-white truncate">{currentTrack.title}</h4>
              <p className="text-[11px] text-white/50 truncate">{currentTrack.artist}</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-10 translate-y-[-4px]">
            <span className="text-[9px] text-white/30">{formatTime(currentTime)}</span>
            <div className="relative flex-1 h-[3px] bg-white/10 rounded-full">
              <div className="absolute h-full bg-white/60 rounded-full" style={{ width: `${progressPercent}%` }} />
              <input 
                type="range" min={0} max={duration || 30} value={currentTime}
                onChange={(e) => {
                  e.stopPropagation(); // กันไม่ให้กดโดนแล้วหน้าจอขยาย
                  setCurrentTime(Number(e.target.value));
                }}
                className="absolute w-full h-5 -top-2 opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-[9px] text-white/30">{formatTime(duration)}</span>
          </div>
        </div>

        {/* ส่วนปุ่มฟังก์ชันด้านขวา (เรียกใช้ MoreHorizontal เพื่อแก้รูปที่ 11) */}
        <div className="flex items-center gap-5 text-white/70">
          <MoreHorizontal size={20} className="cursor-pointer hover:text-white" />
          <Quote size={18} className="cursor-pointer hover:text-[#fa243c]" />
          <ListMusic size={20} className="cursor-pointer hover:text-white" />
          <Volume2 size={18} />
        </div>
      </div>
    </div>
  );
};