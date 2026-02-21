import { useState, useEffect } from 'react';
import { Play, Clock } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';
import { searchLibrary, type MusicItem } from '../api/musicService';

export const RecentlyAddedView = () => {
  const [recentTracks, setRecentTracks] = useState<MusicItem[]>([]);
  const [, setLoading] = useState(true);
  const { setTrack } = usePlayerStore();

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        setLoading(true);
        // ดึงเพลงใหม่ๆ (เช่น อัลบั้มล่าสุดของปี 2024-2025)
        const data = await searchLibrary('2025 hits'); 
        setRecentTracks(data);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-40 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#fa243c]/10 rounded-2xl text-[#fa243c]">
            <Clock size={28} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Recently Added</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {recentTracks.map((track) => (
          <div key={track.id} className="group cursor-pointer" onClick={() => setTrack(track, recentTracks)}>
            <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-4 shadow-xl group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:-translate-y-2">
              <img src={track.cover} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-all">
                  <Play fill="black" size={24} className="ml-1" />
                </div>
              </div>
            </div>
            <h3 className="text-[15px] font-bold text-white truncate px-1">{track.title}</h3>
            <p className="text-[13px] font-medium text-white/40 truncate px-1">{track.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};