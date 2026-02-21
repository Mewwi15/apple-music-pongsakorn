import { Link } from 'react-router-dom';
import { Music2, Home } from 'lucide-react';

export const NotFoundView = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 animate-in fade-in zoom-in duration-700">
      {/* Icon Section */}
      <div className="relative mb-8">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-tr from-[#fa243c] to-[#ff5e62] rounded-[2rem] flex items-center justify-center shadow-2xl shadow-[#fa243c]/20 rotate-12">
          <Music2 size={48} className="text-white -rotate-12 md:w-16 md:h-16" />
        </div>
        <div className="absolute -top-4 -right-4 bg-[#121212] border border-white/10 px-4 py-2 rounded-full shadow-xl">
          <span className="text-[#fa243c] font-black tracking-tighter text-xl">404</span>
        </div>
      </div>

      {/* Text Content */}
      <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
        Looks like you're <br className="md:hidden" /> lost in the mix.
      </h1>
      <p className="text-white/40 text-lg md:text-xl font-medium max-w-md mx-auto mb-10 leading-relaxed">
        The page you're looking for doesn't exist or has been moved to another playlist.
      </p>

      {/* Action Button */}
      <Link 
        to="/" 
        className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl"
      >
        <Home size={20} />
        Go to Home
      </Link>
      
      {/* Decorative Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#fa243c]/10 blur-[120px] -z-10 rounded-full" />
    </div>
  );
};