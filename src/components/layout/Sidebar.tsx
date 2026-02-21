import { Search, Home, Radio, Library, PlayCircle, MusicIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Mewwi from '../img/mewwi.jpeg';

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
    <aside className="w-64 h-screen bg-[#121212] border-r border-white/5 flex flex-col p-6 sticky top-0">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-8 h-8 bg-gradient-to-tr from-[#fa243c] to-[#ff5e62] rounded-lg flex items-center justify-center shadow-lg shadow-[#fa243c]/20">
          <MusicIcon size={18} className="text-white" fill="white" />
        </div>
        <span className="text-2xl font-black tracking-tighter text-white">Apple Music</span>
      </div>

      <nav className="flex-1 space-y-8">
        {/* Main Menu */}
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all duration-300 group ${
                  isActive 
                  ? 'bg-gradient-to-r from-[#fa243c] to-[#ff5e62] text-white shadow-lg shadow-[#fa243c]/25 scale-[1.02]' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`${isActive ? 'text-white' : 'group-hover:text-[#fa243c]'} transition-colors`}>{item.icon}</span>
                <span className="tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Library Section: เปลี่ยนจาก button เป็น Link เพื่อเชื่อมต่อ Router */}
        <div className="space-y-4">
          <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Library</h3>
          <div className="space-y-1">
            {libraryItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-2.5 rounded-lg text-sm font-bold transition-all group ${
                    isActive ? 'text-white bg-white/5' : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`${isActive ? 'text-[#fa243c]' : 'group-hover:text-[#fa243c]'} transition-colors`}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Profile Footer Area */}
      <div className="pt-6 border-t border-white/5 flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 overflow-hidden shadow-inner">
           <img src={Mewwi} 
           className="w-full h-full object-cover" alt="" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white truncate">Premium User</p>
          <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">Online</p>
        </div>
      </div>
    </aside>
  );
};