import { Search, Home, Radio, Library } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const MobileNav = () => {
  const location = useLocation();
  const navItems = [
    { icon: <Home size={22} />, label: 'Listen', path: '/' },
    { icon: <Search size={22} />, label: 'Search', path: '/search' },
    { icon: <Radio size={22} />, label: 'Radio', path: '/radio' },
    { icon: <Library size={22} />, label: 'Library', path: '/recently-added' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#161616]/90 backdrop-blur-2xl border-t border-white/5 z-[150] px-4 pb-8 pt-3 shadow-2xl">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1.5 transition-colors ${isActive ? 'text-[#fa243c]' : 'text-white/30'}`}>
              {item.icon}
              <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};