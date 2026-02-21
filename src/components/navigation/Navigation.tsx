// src/components/navigation/Navigation.tsx
import { NavLink } from 'react-router-dom'; // สำหรับเปลี่ยนหน้า
import { Home, Search, Radio, PlayCircle } from 'lucide-react'; // ลบ Mic2, Library ออก

export const Navigation = () => {
  const menuItems = [
    { icon: <Search size={22} />, label: 'Search', path: '/search' },
    { icon: <Home size={22} />, label: 'Listen Now', path: '/listen-now' },
    { icon: <Radio size={22} />, label: 'Radio', path: '/radio' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#161616] text-white h-screen p-6 flex-col gap-8 border-r border-white/5 fixed left-0 top-0 z-40">
        <div className="text-[#fa243c] flex items-center gap-2 font-bold text-2xl px-2">
          <PlayCircle size={32} fill="#fa243c" className="text-white" /> Music
        </div>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 w-full p-2.5 rounded-lg transition-all duration-200
                ${isActive ? 'bg-[#fa243c] text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
              `}
            >
              {item.icon}
              <span className="text-sm font-semibold">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-3 flex justify-around z-50">
        {menuItems.map((item) => (
          <NavLink 
            key={item.label} 
            to={item.path} 
            className={({ isActive }) => isActive ? 'text-[#fa243c]' : 'text-gray-400'}
          >
            {item.icon}
          </NavLink>
        ))}
      </nav>
    </>
  );
};