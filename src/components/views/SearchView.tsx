import { useState, useEffect } from 'react';
import { Search as SearchIcon, Music, Video as VideoIcon, Flame, Mic2, Disc, Radio } from 'lucide-react'; 
import { searchLibrary, searchMusicVideos, type MusicItem } from '../api/musicService';
import { StationRow } from '../radio/StationRow';
import { usePlayerStore } from '../store/usePlayerStore';

export const SearchView = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MusicItem[]>([]);
  const [searchMode, setSearchMode] = useState<'audio' | 'video'>('audio');
  const [loading, setLoading] = useState(false);
  const { setTrack } = usePlayerStore();

  // หมวดหมู่พร้อมรูปภาพและไอคอน
  const categories = [
    { name: 'Pop', color: 'bg-[#ff2d55]', image: 'https://images.unsplash.com/photo-1514525253344-f814d074e015?q=80&w=400', icon: <Flame size={20} /> },
    { name: 'Hip-Hop', color: 'bg-[#ff9500]', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400', icon: <Mic2 size={20} /> },
    { name: 'Rock', color: 'bg-[#5856d6]', image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=400', icon: <Disc size={20} /> },
    { name: 'Jazz', color: 'bg-[#ffcc00]', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=400', icon: <Radio size={20} /> },
  ];

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const data = searchMode === 'audio' ? await searchLibrary(query) : await searchMusicVideos(query);
          setResults(data);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, searchMode]);

  return (
    <div className="flex flex-col gap-8 pb-40 animate-in fade-in duration-700">
      <div className="flex items-center justify-between px-2">
        <h1 className="text-5xl font-black tracking-tighter text-white">Search</h1>
        {loading && <div className="w-5 h-5 border-2 border-[#fa243c] border-t-transparent rounded-full animate-spin" />}
      </div>

      <div className="sticky top-0 z-30 bg-[#161616]/95 backdrop-blur-xl -mx-4 px-4 py-4 border-b border-white/5">
        <div className="relative group max-w-5xl mx-auto px-2">
          <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#fa243c] transition-colors" size={20} />
          <input 
            className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 rounded-2xl py-4 pl-14 pr-4 outline-none border border-white/5 focus:border-[#fa243c]/40 transition-all text-xl font-medium text-white placeholder:text-white/20"
            placeholder={searchMode === 'audio' ? "Artists, Songs, Lyrics" : "Music Videos"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* เรียกใช้ Music และ VideoIcon เพื่อเคลียร์ Error */}
        <div className="flex justify-center gap-3 mt-6">
          <button onClick={() => setSearchMode('audio')}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-full text-sm font-black transition-all ${searchMode === 'audio' ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
            <Music size={16} /> Songs
          </button>
          <button onClick={() => setSearchMode('video')}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-full text-sm font-black transition-all ${searchMode === 'video' ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
            <VideoIcon size={16} /> Videos
          </button>
        </div>
      </div>

      {!query ? (
        <section className="px-2 space-y-6">
          <h2 className="text-2xl font-black text-white px-1">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div key={cat.name} onClick={() => setQuery(cat.name)}
                className={`${cat.color} group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer active:scale-95 transition-all shadow-lg`}>
                <img src={cat.image} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 transition-transform duration-700 group-hover:scale-110" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="text-2xl font-black text-white uppercase italic tracking-tighter">{cat.name}</span>
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">{cat.icon}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2">
          {results.map((item) => (
            <div key={item.id} onClick={() => setTrack(item, results)} className="hover:bg-white/5 p-2 rounded-xl transition-colors cursor-pointer group active:scale-[0.98]">
              <StationRow {...item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};