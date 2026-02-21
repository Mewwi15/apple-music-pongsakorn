import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav'; // ไฟล์ใหม่
import { ListenNowView } from './components/views/ListenNowView';
import { SearchView } from './components/views/SearchView';
import { RadioView } from './components/views/RadioView';
import { RecentlyAddedView } from './components/views/RecentlyAddedView';
import { ArtistsView } from './components/views/ArtistsView';
import { AudioEngine } from './components/player/AudioEngine';
import { FullScreenPlayer } from './components/player/FullScreenPlayer';
import { MiniPlayer } from './components/player/MiniPlayer';

function App() {
  return (
    <Router>
      {/* ปรับเป็น flex-col บนมือถือ และ flex-row บนจอใหญ่ */}
      <div className="flex flex-col md:flex-row bg-[#0a0a0a] min-h-screen text-white overflow-x-hidden">
        <Sidebar /> 

        {/* ปรับ Padding ให้เล็กลงบนมือถือ เพื่อไม่ให้เสียพื้นที่ */}
        <main className="flex-1 pb-40 md:pb-8 p-4 md:p-12 h-screen overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<ListenNowView />} />
              <Route path="/search" element={<SearchView />} />
              <Route path="/radio" element={<RadioView />} />
              <Route path="/recently-added" element={<RecentlyAddedView />} />
              <Route path="/artists" element={<ArtistsView />} />
            </Routes>
          </div>
        </main>

        <MobileNav /> {/* แสดงผลเฉพาะบนมือถือ */}
        <AudioEngine />
        <MiniPlayer />
        <FullScreenPlayer />
      </div>
    </Router>
  );
}

export default App;