
import React from 'react';
import '../types';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative h-[60vh] flex flex-col items-center justify-center bg-dark text-white overflow-hidden">
      <div className="relative z-10 text-center px-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6 font-bold">Ready to shine?</p>
        <div className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-12">PEARLZ</div>
        
        <div className="flex flex-wrap justify-center gap-12 mt-4 text-[10px] uppercase tracking-[0.2em] font-bold">
          <a href="#" className="flex items-center gap-2 hover:text-nude transition-colors">
            <iconify-icon icon="solar:camera-linear" width="18"></iconify-icon> Instagram
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-nude transition-colors">
            <iconify-icon icon="solar:chat-round-line-linear" width="18"></iconify-icon> KakaoTalk
          </a>
        </div>

        <div className="mt-20 text-[8px] tracking-[0.5em] text-white/10 uppercase font-bold">
          © 2025 PEARLZ DE BEAUTY. ALL RIGHTS RESERVED.
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
