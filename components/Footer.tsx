
import React from 'react';
import '../types';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative h-[60vh] flex flex-col items-center justify-center bg-dark text-white overflow-hidden">
      <div className="relative z-10 text-center px-4 w-full flex flex-col items-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-10 font-bold font-display">Ready to shine?</p>
        
        {/* Brand Logo Image - Corrected path based on file explorer */}
        <div className="mb-12">
          <img 
            src="public/images/logo-white.png" 
            alt="Pearlz De Beauty Logo" 
            className="h-10 md:h-14 w-auto object-contain"
            onError={(e) => {
              // 이미지 로드 실패 시 콘솔에 에러 표시 (디버깅용)
              console.error("Logo failed to load at path: public/images/logo-white.png");
            }}
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-12 mt-4 text-[10px] uppercase tracking-[0.2em] font-bold font-display">
          <a href="https://www.instagram.com/pearlz_de_beauty/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-nude transition-colors">
            <iconify-icon icon="solar:camera-linear" width="18"></iconify-icon> Instagram
          </a>
          <a href="https://pf.kakao.com/_xlxmJJG" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-nude transition-colors">
            <iconify-icon icon="solar:chat-round-line-linear" width="18"></iconify-icon> KakaoTalk
          </a>
        </div>

        <div className="mt-20 text-[8px] tracking-[0.5em] text-white/10 uppercase font-bold font-display">
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
