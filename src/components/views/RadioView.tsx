import { useState, useEffect } from 'react';
import { Play, Loader2, Mic2, Radio as RadioIcon } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';
import { searchLibrary, type MusicItem } from '../api/musicService';

export const RadioView = () => {
  const [podcastShows, setPodcastShows] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { setTrack } = usePlayerStore();

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        // ดึงข้อมูลรายการที่มีลักษณะเป็น Podcast หรือรายการพูดคุย
        // ในที่นี้เราจะดึงจากคำค้นหาที่เกี่ยวข้องกับ Podcast ยอดนิยม
        const searchTerms = ['Podcast', 'The Ghost Radio', 'Talk Show', 'TED Talks'];
        const requests = searchTerms.map(term => searchLibrary(term));
        const results = await Promise.all(requests);
        
        // กรองเอาเฉพาะรายการที่มีคุณภาพและรวมเข้าด้วยกัน
        const allPodcasts = results.flat().filter((item, index, self) => 
          index === self.findIndex((t) => t.id === item.id)
        );
        setPodcastShows(allPodcasts);
      } catch (error) {
        console.error("Failed to fetch podcasts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-white/10">
        <Loader2 className="animate-spin" size={32} />
        <p className="font-black uppercase tracking-[0.3em] text-[10px]">Tuning Stations...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 pb-40 animate-in fade-in duration-1000">
      
      {/* 1. Header Section */}
      <div className="flex items-center justify-between border-b border-white/5 pb-8 px-2">
        <div className="space-y-1">
          <p className="text-[#fa243c] font-black uppercase tracking-[0.2em] text-[10px] opacity-80">
            World Stations
          </p>
          <h1 className="text-5xl font-black tracking-tighter text-white">Radio</h1>
        </div>
        <div className="flex gap-4">
            <div className="p-3 bg-white/5 rounded-full text-white/40"><Mic2 size={24} /></div>
            <div className="p-3 bg-white/5 rounded-full text-[#fa243c] animate-pulse"><RadioIcon size={24} /></div>
        </div>
      </div>

      {/* 2. Featured Stations (รายการแนะนำ) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-white px-2 tracking-tight">Featured Shows</h2>
        <div className="flex gap-8 overflow-x-auto pb-6 no-scrollbar -mx-4 px-6">
          {podcastShows.slice(0, 5).map((show) => (
            <div 
              key={show.id} 
              className="min-w-[280px] md:min-w-[320px] group cursor-pointer"
              onClick={() => setTrack(show, podcastShows)}
            >
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden mb-5 shadow-2xl transition-all duration-700 group-hover:scale-[1.03]">
                <img src={show.cover} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={show.title} />
                
                {/* เอฟเฟกต์ Gradient แบบเข้มขรึมสไตล์ Podcast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
                   <div className="w-16 h-16 bg-[#fa243c] rounded-full flex items-center justify-center shadow-2xl">
                      <Play fill="white" size={28} className="ml-1 text-white" />
                   </div>
                   <p className="mt-4 text-white font-black uppercase tracking-widest text-[10px]">Listen Now</p>
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-[10px] font-black text-[#fa243c] uppercase tracking-[0.2em] mb-2">New Episode</p>
                  <h3 className="text-xl font-black text-white leading-tight line-clamp-2">{show.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Browse by Category (Grid รายการทั้งหมด) */}
      <section className="space-y-6 px-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white tracking-tight">Global Broadcasters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcastShows.slice(5, 14).map((show) => (
            <div 
              key={show.id} 
              className="group flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer"
              onClick={() => setTrack(show, podcastShows)}
            >
              <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
                <img src={show.cover} className="w-full h-full object-cover" alt={show.title} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Play size={20} fill="white" className="text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-[#fa243c] uppercase tracking-widest mb-1">{show.artist}</p>
                <h3 className="text-[16px] font-black text-white truncate mb-1">{show.title}</h3>
                <p className="text-xs text-white/40 font-medium line-clamp-1">Latest episode available now</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};