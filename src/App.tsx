import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav'; // เมนูสำหรับมือถือ

// นำเข้า Views ทั้งหมดรวมถึงหน้า 404 และหน้า Library ใหม่
import { ListenNowView } from './components/views/ListenNowView';
import { SearchView } from './components/views/SearchView';
import { RadioView } from './components/views/RadioView';
import { RecentlyAddedView } from './components/views/RecentlyAddedView';
import { ArtistsView } from './components/views/ArtistsView';
import { NotFoundView } from './components/views/NotFoundView'; // หน้า 404

// ส่วนประกอบของระบบเครื่องเล่นเพลง
import { AudioEngine } from './components/player/AudioEngine';
import { FullScreenPlayer } from './components/player/FullScreenPlayer';
import { MiniPlayer } from './components/player/MiniPlayer';

function App() {
  return (
    /* ใช้ HashRouter เพื่อให้ Deploy บน GitHub Pages/Vercel แล้ว Refresh ไม่หลุด */
    <Router>
      <div className="flex flex-col md:flex-row bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">
        
        {/* Sidebar จะถูกซ่อนอัตโนมัติบนมือถือด้วยคลาส hidden md:flex */}
        <Sidebar /> 

        {/* ส่วนเนื้อหาหลักที่ปรับ Padding ให้ยืดหยุ่น (Responsive Padding) */}
        <main className="flex-1 pb-40 md:pb-8 p-4 md:p-12 h-screen overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Routes>
              {/* หน้าหลัก */}
              <Route path="/" element={<ListenNowView />} />
              <Route path="/search" element={<SearchView />} />
              <Route path="/radio" element={<RadioView />} />
              
              {/* หน้าในส่วน Library ที่เชื่อมต่อกับ Sidebar */}
              <Route path="/recently-added" element={<RecentlyAddedView />} />
              <Route path="/artists" element={<ArtistsView />} />
              
              {/* หน้า 404 สำหรับจัดการกรณีหา URL ไม่พบ (ต้องอยู่ล่างสุด) */}
              <Route path="*" element={<NotFoundView />} />
            </Routes>
          </div>
        </main>

        {/* แสดงผล MobileNav เฉพาะบนหน้าจอขนาดเล็ก */}
        <MobileNav />

        {/* ระบบจัดการเสียงและเครื่องเล่นเพลง */}
        <AudioEngine />
        <MiniPlayer />
        <FullScreenPlayer />
      </div>
    </Router>
  );
}

export default App;