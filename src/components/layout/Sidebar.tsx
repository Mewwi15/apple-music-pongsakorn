import { Search, Home, Radio, Library, PlayCircle, Music as MusicIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Mewwi from '../img/mewwi.jpeg'; // การ Import ที่ถูกต้อง

export const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: <Home size={22} />, label: 'Listen Now', path: '/' },
    { icon: <Search size={22} />, label: 'Search', path: '/search' },
    { icon: <Radio size={22} />, label: 'Radio', path: '/radio' },
  ];

  const libraryItems = [
    { icon: <PlayCircle size={22} />, label: 'Recently Added', path: '/recently-added' },
    { icon: <Library size={22} />, label: 'Artists', path: '/artists' },
  ];

  return (
    <aside className="hidden md:flex w-64 h-screen bg-[#121212] border-r border-white/5 flex-col p-6 sticky top-0">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-8 h-8 bg-[#fa243c] rounded-lg flex items-center justify-center shadow-lg shadow-[#fa243c]/20">
          <MusicIcon size={18} className="text-white" fill="white" />
        </div>
        <span className="text-2xl font-black tracking-tighter text-white">Music</span>
      </div>

      <nav className="flex-1 space-y-8">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${location.pathname === item.path ? 'bg-[#fa243c] text-white' : 'text-white/40 hover:text-white'}`}>
              {item.icon} <span className="tracking-tight">{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="space-y-4">
          <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Library</h3>
          <div className="space-y-1">
            {libraryItems.map((item) => (
              <Link key={item.path} to={item.path} className={`flex items-center gap-4 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${location.pathname === item.path ? 'text-white bg-white/5' : 'text-white/40 hover:text-white'}`}>
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="pt-6 border-t border-white/5 flex items-center gap-3 px-2">
        <img src={Mewwi} className="w-9 h-9 rounded-full object-cover border border-white/10" alt="Profile" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white truncate">Mewwi</p>
          <p className="text-[10px] text-[#fa243c] font-black uppercase tracking-widest">Premium</p>
        </div>
      </div>
    </aside>
  );
};