import { useState, useEffect } from 'react';
import { Play, Loader2 } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';
import { searchLibrary, type MusicItem } from '../api/musicService';
import Mewwi from '../img/mewwi.jpeg';

export const ListenNowView = () => {
  const [mixedTracks, setMixedTracks] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { setTrack } = usePlayerStore();

  useEffect(() => {
    const fetchMixedContent = async () => {
      try {
        setLoading(true);
        // ดึงข้อมูลจากหลายศิลปินพร้อมกันเพื่อให้เกิดความหลากหลาย
        const artists = ['Bruno Mars', 'Lady Gaga', 'Post Malone', 'The Weeknd'];
        const requests = artists.map(artist => searchLibrary(artist));
        const results = await Promise.all(requests);
        
        // รวมเพลงจากทุกคนเข้าด้วยกันและสลับลำดับ (Shuffle) ให้ดูเป็นธรรมชาติ
        const allTracks = results.flat().sort(() => Math.random() - 0.5);
        setMixedTracks(allTracks);
      } catch (error) {
        console.error("Failed to fetch mixed content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMixedContent();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-white/10">
        <Loader2 className="animate-spin" size={32} />
        <p className="font-black uppercase tracking-[0.3em] text-[10px]">Creating your mix...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 pb-40 animate-in fade-in duration-1000">
      
      {/* 1. Header Section */}
      <div className="flex items-center justify-between border-b border-white/5 pb-8 px-2">
        <div className="space-y-1">
          <p className="text-[#fa243c] font-black uppercase tracking-[0.2em] text-[10px] opacity-80">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-5xl font-black tracking-tighter text-white">{getGreeting()}</h1>
        </div>
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#fa243c] to-pink-500 p-[2px] shadow-2xl cursor-pointer active:scale-95 transition-all">
          <div className="w-full h-full rounded-full border-2 border-black overflow-hidden">
            <img src= {Mewwi} className="w-full h-full object-cover" alt="User" />
          </div>
        </div>
      </div>

      {/* 2. Top Picks (Mixed Artists) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-white px-2 tracking-tight">Top Picks for You</h2>
        <div className="flex gap-8 overflow-x-auto pb-6 no-scrollbar -mx-4 px-6">
          {mixedTracks.slice(0, 6).map((track) => (
            <div 
              key={track.id} 
              className="min-w-[300px] md:min-w-[350px] group cursor-pointer"
              onClick={() => setTrack(track, mixedTracks)}
            >
              <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-5 shadow-2xl transition-all duration-700 group-hover:scale-[1.03] group-hover:-translate-y-2">
                <img src={track.cover} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={track.title} />
                
                {/* Glassmorphism Label */}
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">{track.artist}</p>
                </div>

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-[2px]">
                   <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-all duration-500">
                      <Play fill="black" size={32} className="ml-1.5 text-black" />
                   </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10">
                  <h3 className="text-xl font-black text-white leading-tight truncate">{track.title}</h3>
                  <p className="text-white/50 font-bold text-sm">Recently Added</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Your Personal Library (Mixed) */}
      <section className="space-y-6 px-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white tracking-tight">Based on your listening</h2>
          <button className="text-[#fa243c] text-xs font-black uppercase tracking-widest">Update Mix</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {mixedTracks.slice(6, 16).map((track) => (
            <div 
              key={track.id} 
              className="group cursor-pointer"
              onClick={() => setTrack(track, mixedTracks)}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-500">
                <img src={track.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={track.title} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                   <div className="w-12 h-12 bg-[#fa243c] rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                      <Play size={24} fill="white" className="text-white ml-1" />
                   </div>
                </div>
              </div>
              <h3 className="text-[15px] font-bold text-white truncate mb-0.5">{track.title}</h3>
              <p className="text-[12px] font-black text-white/30 truncate uppercase tracking-tighter">{track.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};