
import React from 'react';
import '../types';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative h-[60vh] flex flex-col items-center justify-center bg-dark text-white overflow-hidden">
      <div className="relative z-10 text-center px-4 w-full flex flex-col items-center">
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-10 font-bold font-sans">Ready to shine?</p>
        
        {/* Logo Image */}
        <div className="mb-12 flex justify-center items-center">
          <img 
            src="/images/logo-white.png" 
            alt="Pearlz De Beauty Logo" 
            className="h-10 md:h-12 w-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-12 mt-4 text-[9px] uppercase tracking-[0.2em] font-bold font-sans">
          <a href="https://www.instagram.com/pearlz_de_beauty/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-nude transition-colors">
            <iconify-icon icon="solar:camera-linear" width="16"></iconify-icon> Instagram
          </a>
          <a href="https://pf.kakao.com/_xlxmJJG" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-nude transition-colors">
            <iconify-icon icon="solar:chat-round-line-linear" width="16"></iconify-icon> KakaoTalk
          </a>
        </div>

        <div className="mt-20 text-[8px] tracking-[0.5em] text-white/10 uppercase font-bold font-sans">
          © 2025 Pearlz De Beauty. ALL RIGHTS RESERVED.
        </div>
      </div>
      
      {/* Background Graphic */}
      <img 
        src="https://images.unsplash.com/photo-1522337360733-412a652854fc?q=80&w=2000&auto=format&fit=crop" 
        className="absolute inset-0 w-full h-full object-cover opacity-5 grayscale" 
        alt="Footer BG"
      />
    </footer>
  );
};

export default Footer;
