import { useState, useEffect } from 'react';
import { Users, ChevronRight } from 'lucide-react';
import { searchLibrary, type MusicItem } from '../api/musicService';
import { usePlayerStore } from '../store/usePlayerStore';

export const ArtistsView = () => {
  const [artists, setArtists] = useState<MusicItem[]>([]);
  const { setTrack } = usePlayerStore();

  useEffect(() => {
    const fetchArtists = async () => {
      // ดึงรายชื่อศิลปินยอดนิยมมาแสดงผล
      const data = await searchLibrary('Pop Artists');
      setArtists(data);
    };
    fetchArtists();
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-40 animate-in fade-in duration-1000">
      <div className="flex items-center gap-4 border-b border-white/5 pb-6">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
          <Users size={28} />
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white">Artists</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {artists.map((artist) => (
          <div 
            key={artist.id} 
            onClick={() => setTrack(artist, artists)}
            className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group cursor-pointer border border-white/5 hover:border-white/10"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-white/5 group-hover:border-[#fa243c]/50 transition-all">
                <img src={artist.cover} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#fa243c] transition-colors">{artist.artist}</h3>
                <p className="text-xs text-white/30 font-black uppercase tracking-widest">Artist</p>
              </div>
            </div>
            <ChevronRight className="text-white/10 group-hover:text-white transition-all mr-2" size={20} />
          </div>
        ))}
      </div>
    </div>
  );
};