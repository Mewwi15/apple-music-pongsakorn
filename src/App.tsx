import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { ListenNowView } from './components/views/ListenNowView';
import { SearchView } from './components/views/SearchView';
import { RadioView } from './components/views/RadioView';
// 1. เพิ่มการ Import ไฟล์ใหม่ที่เพิ่งสร้าง
import { RecentlyAddedView } from './components/views/RecentlyAddedView';
import { ArtistsView } from './components/views/ArtistsView';

import { AudioEngine } from './components/player/AudioEngine';
import { FullScreenPlayer } from './components/player/FullScreenPlayer';
import { MiniPlayer } from './components/player/MiniPlayer';

function App() {
  return (
    <Router>
      <div className="flex bg-[#0a0a0a] min-h-screen text-white overflow-hidden">
        {/* Sidebar ที่เราทำเมนู Link ไว้แล้ว */}
        <Sidebar /> 

        <main className="flex-1 h-screen overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto p-8">
            <Routes>
              <Route path="/" element={<ListenNowView />} />
              <Route path="/search" element={<SearchView />} />
              <Route path="/radio" element={<RadioView />} />
              
              {/* 2. เชื่อมต่อ Path ให้ตรงกับที่เขียนไว้ใน Sidebar */}
              <Route path="/recently-added" element={<RecentlyAddedView />} />
              <Route path="/artists" element={<ArtistsView />} />
            </Routes>
          </div>
        </main>

        <AudioEngine />
        <MiniPlayer />
        <FullScreenPlayer />
      </div>
    </Router>
  );
}

export default App;