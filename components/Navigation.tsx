import React, { useState } from 'react';
import '../types';
import { ViewState } from '../types';

interface NavigationProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleNav = (view: ViewState) => {
    onNavigate(view);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const navLinks: { name: string; view: ViewState }[] = [
    { name: '시술 항목', view: 'procedures' },
    { name: '수강 문의', view: 'training' },
    { name: '예약 하기', view: 'booking' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full p-6 md:p-8 flex justify-between items-center z-[100] mix-blend-difference text-white">
        <button onClick={() => handleNav('home')} className="font-brand font-bold text-lg md:text-xl tracking-tighter">
          펄즈데뷰티
        </button>
        
        {/* Desktop Links - Using font-sans for clean Inter look */}
        <div className="hidden md:flex gap-12 text-[10px] font-semibold tracking-[0.3em] uppercase font-sans">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNav(link.view)} 
              className={`hover:text-nude transition-colors ${currentView === link.view ? 'text-nude' : ''}`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center p-2 group"
          aria-label="Toggle Menu"
        >
          <iconify-icon 
            icon={isOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} 
            width="28"
            className="transition-transform group-active:scale-90"
          ></iconify-icon>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-dark z-[90] transition-transform duration-700 ease-in-out md:hidden ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="h-full flex flex-col items-center justify-center p-8 space-y-10">
          {navLinks.map((link, idx) => (
            <button 
              key={link.name} 
              onClick={() => handleNav(link.view)}
              className={`text-white text-3xl font-black tracking-tighter transition-all duration-500 ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <span className="text-nude text-[10px] block mb-2 tracking-[0.5em] text-center uppercase font-bold font-sans">0{idx + 1}</span>
              {link.name}
            </button>
          ))}
          
          <div className="pt-12 border-t border-white/10 w-full flex justify-center gap-8">
            <a href="https://www.instagram.com/pearlz_de_beauty/" target="_blank" rel="noopener noreferrer" className="text-white/40 text-[10px] tracking-widest uppercase font-bold font-sans">Instagram</a>
            <a href="https://pf.kakao.com/_xlxmJJG" target="_blank" rel="noopener noreferrer" className="text-white/40 text-[10px] tracking-widest uppercase font-bold font-sans">Kakao</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;