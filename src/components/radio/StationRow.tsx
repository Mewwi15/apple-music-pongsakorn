// src/components/radio/StationRow.tsx
import { Play, Pause } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';
import type { MusicItem } from '../api/musicService'; // ดึง Interface มาใช้
 // ดึง Interface มาใช้

export const StationRow = (item: MusicItem) => {
  const { currentTrack, isPlaying, setTrack, togglePlay } = usePlayerStore();
  
  // ตรวจสอบว่าเป็นเพลงเดียวกับที่กำลังเล่นอยู่หรือไม่
  const isCurrentTrack = currentTrack?.id === item.id;

  const handlePlayAction = (e: React.MouseEvent) => {
    e.stopPropagation(); // กันไม่ให้ Event ไปกวนส่วนอื่น
    if (isCurrentTrack) {
      togglePlay();
    } else {
      setTrack(item); // ส่งทั้งก้อน MusicItem เข้า Store
    }
  };

  return (
    <div 
      onClick={handlePlayAction}
      className="group flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="relative w-12 h-12 flex-shrink-0">
          <img src={item.cover} alt={item.title} className="w-full h-full object-cover rounded-md shadow-md" />
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isCurrentTrack && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            {isCurrentTrack && isPlaying ? <Pause size={20} fill="white" className="text-white" /> : <Play size={20} fill="white" className="text-white" />}
          </div>
        </div>
        <div className="truncate">
          <h4 className={`text-sm font-bold truncate ${isCurrentTrack ? 'text-[#fa243c]' : 'text-white'}`}>
            {item.title}
          </h4>
          <p className="text-xs text-gray-400 truncate">{item.artist}</p>
        </div>
      </div>
      {item.isExplicit && (
        <span className="text-[10px] bg-gray-500 text-black px-1 rounded-sm font-bold ml-2 flex-shrink-0">E</span>
      )}
    </div>
  );
};