import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play } from 'lucide-react';
import { getAlbumTracks, type MusicItem } from '../api/musicService';
import { StationRow } from '../radio/StationRow';
import { usePlayerStore } from '../store/usePlayerStore';

export const AlbumDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tracks, setTracks] = useState<MusicItem[]>([]);
  const { setTrack } = usePlayerStore();

  useEffect(() => {
    if (id) getAlbumTracks(id).then(setTracks);
  }, [id]);

  if (tracks.length === 0) return <div className="p-20 text-center text-gray-500">Loading Tracks...</div>;

  return (
    <div className="flex flex-col gap-8 pb-40 animate-in fade-in duration-500">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#fa243c] font-medium">
        <ChevronLeft size={20} /> Back
      </button>

      <div className="flex flex-col md:flex-row gap-10 items-center md:items-end">
        <img src={tracks[0].cover} alt="" className="w-72 h-72 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
        <div className="flex-1 text-center md:text-left">
          <p className="text-[#fa243c] font-bold uppercase tracking-widest text-sm mb-2">Album</p>
          <h1 className="text-5xl font-black mb-4 line-clamp-2">{tracks[0].album}</h1>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <span className="text-2xl text-white/60">{tracks[0].artist}</span>
            <button 
              onClick={() => setTrack(tracks[0])}
              className="bg-[#fa243c] p-3 rounded-full hover:scale-105 transition-transform"
            >
              <Play fill="white" size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-white/5 pt-4">
        {tracks.map((track, index) => (
          <div key={track.id} className="flex items-center gap-4 group">
            <span className="text-white/20 w-4 text-right font-medium">{index + 1}</span>
            <div className="flex-1">
              <StationRow {...track} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};