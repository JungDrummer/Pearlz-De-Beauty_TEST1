
import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { ViewState } from './types';
import './types';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 800);
    
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      clearTimeout(timer);
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, [isLoaded, currentView]);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const HomeView = () => (
    <>
      {/* TOP HERO SECTION - Using direct path string for images/main_1.jpg */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-dark">
        {/* Background Local Image */}
        <img 
          src="images/main_1.jpg" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.3] scale-100 pointer-events-none" 
          alt="Main Hero Background" 
          onError={(e) => {
            // Fallback to unsplash if local image fails
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522337360733-412a652854fc?q=80&w=2000&auto=format&fit=crop";
          }}
        />
        
        <div className="relative z-20 text-center text-white px-4 reveal flex flex-col items-center">
          {/* Main Title - Designed to match screenshot */}
          <div className="flex flex-col items-center mb-10">
            <h1 className="text-[14vw] md:text-[10vw] font-bold leading-[0.85] font-brand tracking-tighter uppercase mb-2">
              Pearlz
            </h1>
            <h1 className="text-[14vw] md:text-[10vw] font-bold leading-[0.85] font-brand tracking-tighter uppercase text-white/30">
              De Beauty
            </h1>
          </div>
          
          {/* Slogan with wide tracking */}
          <p className="text-[11px] md:text-sm uppercase tracking-[0.7em] font-medium mb-16 font-sans text-white/80">
            남들이 어디서 했냐고 물어보는 곳
          </p>

          {/* Decorative Vertical Line */}
          <div className="w-[1px] h-32 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
      </section>

      {/* 3 Main Menu Cards */}
      <section className="flex flex-col bg-dark overflow-hidden">
        {[
          { title: 'Procedures', label: '시술 항목', view: 'procedures' as ViewState, img: 'images/main_1.jpg' },
          { title: 'Education', label: '수강 메뉴', view: 'training' as ViewState, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop' },
          { title: 'Booking', label: '예약 문의', view: 'booking' as ViewState, img: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1000&auto=format&fit=crop' }
        ].map((card) => (
          <button 
            key={card.view}
            onClick={() => handleNavigate(card.view)}
            className="relative w-full h-[45vh] md:h-[60vh] group overflow-hidden border-b border-white/5 last:border-0 transition-all duration-700 flex flex-col"
          >
            <img 
              src={card.img} 
              className="absolute inset-0 w-full h-full object-cover brightness-[0.3] group-hover:brightness-[0.5] group-hover:scale-105 transition-all duration-1000"
              alt={card.label}
              onError={(e) => {
                if (card.img === 'images/main_1.jpg') {
                   (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1583001931046-648c6f194384?q=80&w=1000&auto=format&fit=crop";
                }
              }}
            />
            <div className="relative flex-1 flex flex-col items-center justify-center z-10 text-white p-6 text-center">
              <span className="text-[10px] tracking-[0.5em] opacity-30 mb-4 group-hover:opacity-100 transition-opacity uppercase font-bold font-sans">{card.title}</span>
              <h2 className="text-3xl md:text-5xl font-black group-hover:tracking-[0.1em] transition-all duration-700">{card.label}</h2>
              <div className="w-0 group-hover:w-16 h-px bg-nude mt-6 transition-all duration-700"></div>
            </div>
          </button>
        ))}
      </section>

      {/* INTRODUCTION */}
      <section className="py-40 px-6 md:px-20 bg-cream text-center border-t border-dark/5">
        <div className="max-w-4xl mx-auto reveal">
          <h3 className="text-[10px] tracking-[0.6em] font-bold text-nude mb-8 uppercase font-sans">Premium Artistry</h3>
          <h2 className="text-4xl md:text-7xl font-black leading-tight mb-12">
            본연의 아름다움을 <br/><span className="italic font-light text-nude">가장 자연스럽게.</span>
          </h2>
          <p className="text-lg md:text-2xl font-light text-dark/60 leading-relaxed max-w-2xl mx-auto">
            인위적인 아름다움이 아닌, 당신이 가진 본연의 선을 찾아냅니다. <br/>
            시간이 흘러도 변함없는 우아함을 약속합니다.
          </p>
        </div>
      </section>
    </>
  );

  const ProceduresView = () => (
    <section className="bg-dark text-white min-h-screen pt-32 pb-40">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-24 reveal text-center md:text-left">
          <span className="text-nude text-[10px] tracking-[0.6em] font-bold uppercase block mb-4 font-sans">The Collection</span>
          <h2 className="text-5xl md:text-8xl font-bold font-sans uppercase tracking-tighter leading-none mb-10">
            시술 <span className="text-white/20">항목</span>
          </h2>
          <div className="h-px w-32 bg-nude opacity-30 mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {[
            { title: 'Natural Brow', sub: '엠보 자연 눈썹', description: '한 올 한 올 결을 살려 본인의 눈썹처럼 자연스러운 디자인', img: 'https://images.unsplash.com/photo-1583001931046-648c6f194384?q=80&w=1000&auto=format&fit=crop' },
            { title: 'Signature Lip', sub: '풀 립 / 틴트 립', description: '생기 없는 입술에 맑은 컬러감을 입혀 화사한 안색을 선사', img: 'https://images.unsplash.com/photo-1586450393135-260905952f42?q=80&w=1000&auto=format&fit=crop' },
            { title: 'Secret Liner', sub: '점막 아이라인', description: '속눈썹 사이사이를 채워 더욱 또렷하고 깊은 눈매 연출', img: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1000&auto=format&fit=crop' },
            { title: 'Hairline Art', sub: '헤어라인 교정', description: '얼굴형을 보완하는 자연스러운 쉐딩 기법으로 동안 효과', img: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1000&auto=format&fit=crop' },
            { title: 'Skin SMP', sub: '두피 문신', description: '비어있는 모발 사이를 미세한 도트로 채워 풍성한 모량 표현', img: 'https://images.unsplash.com/photo-1522337660859-02fbefad15c0?q=80&w=1000&auto=format&fit=crop' },
            { title: 'Combo Brow', sub: '콤보 / 수지 눈썹', description: '결과 면의 조화로 메이크업을 한 듯 선명하고 깔끔한 눈썹', img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop' }
          ].map((item, idx) => (
            <div key={idx} className="reveal group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden mb-8 border border-white/5 relative">
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                  alt={item.title} 
                />
                <div className="absolute top-6 left-6 text-[40px] font-sans font-light opacity-10 group-hover:opacity-30 transition-opacity">0{idx+1}</div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <h4 className="text-2xl font-bold tracking-tight font-sans uppercase">{item.title}</h4>
                  <span className="text-nude text-[10px] font-bold tracking-widest uppercase mb-1">{item.sub}</span>
                </div>
                <p className="text-white/40 text-sm font-light leading-relaxed">{item.description}</p>
                <div className="w-0 group-hover:w-full h-[1px] bg-nude/40 transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 text-center reveal">
          <button onClick={() => handleNavigate('booking')} className="px-16 py-8 border border-white/20 text-[12px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-dark transition-all duration-500 font-sans">
            Book Appointment
          </button>
        </div>
      </div>
    </section>
  );

  const TrainingView = () => (
    <section className="bg-cream text-dark min-h-screen pt-32 pb-40">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-start mb-32 reveal">
          <div>
            <span className="text-nude text-[10px] tracking-[0.6em] font-bold uppercase block mb-4 font-sans">Elite Education</span>
            <h2 className="text-5xl md:text-8xl font-bold font-sans uppercase tracking-tighter leading-none mb-10">
              수강 <span className="text-dark/10">메뉴</span>
            </h2>
            <p className="text-xl md:text-2xl font-light text-dark/60 leading-relaxed max-w-lg">
              기초부터 창업까지, 펄즈만의 차별화된 테크닉과 경영 노하우를 아낌없이 전수합니다.
            </p>
          </div>
          <div className="aspect-[16/9] bg-dark relative overflow-hidden flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-60" 
              alt="Classroom"
            />
            <iconify-icon icon="solar:play-circle-bold" className="text-white text-7xl relative z-10 cursor-pointer hover:scale-110 transition-transform"></iconify-icon>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {[
            { 
              title: 'Master Class', 
              target: '창업 준비생', 
              period: '12 Weeks',
              content: ['눈썹/입술/아이라인 전 항목', '색소 배합 & 고무판 트레이닝', '실습 데모 다수 포함', '마케팅 & 고객 상담법']
            },
            { 
              title: 'One-Day Class', 
              target: '현직 아티스트', 
              period: '1 Day',
              content: ['취약한 항목 집중 교정', '펄즈 시그니처 결 드로잉', '니들 텐션 & 각도 비밀', '결과물 사진 촬영 노하우']
            }
          ].map((course, idx) => (
            <div key={idx} className="bg-white p-12 md:p-20 border border-dark/5 reveal hover:border-nude/30 transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-12">
                <h3 className="text-4xl font-bold font-sans uppercase tracking-tighter">{course.title}</h3>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase bg-dark text-white px-4 py-1 font-sans">{course.period}</span>
              </div>
              <p className="text-nude text-xs font-bold tracking-[0.4em] mb-12 uppercase font-sans">{course.target}</p>
              <ul className="space-y-6">
                {course.content.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-dark/60 text-sm font-medium">
                    <div className="w-1.5 h-1.5 bg-nude rotate-45"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="mt-16 w-full py-6 border border-dark/10 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-dark hover:text-white transition-all font-sans">
                Detail Inquiry
              </button>
            </div>
          ))}
        </div>

        <div className="reveal">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.5em] font-bold text-nude uppercase font-sans">Environment</span>
            <h3 className="text-3xl font-black mt-4 uppercase">Academy Space</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000',
               'https://images.unsplash.com/photo-1522337660859-02fbefad15c0?q=80&w=1000',
               'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1000',
               'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1000'
             ].map((img, i) => (
               <div key={i} className="aspect-square bg-dark overflow-hidden group">
                 <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="noise-overlay"></div>
      
      {!isLoaded && (
        <div className="fixed inset-0 bg-dark z-[10000] flex flex-col items-center justify-center text-white">
          <div className="font-brand text-2xl font-bold tracking-[0.5em] mb-4 uppercase">Pearlz De Beauty</div>
          <div className="w-32 h-[1px] bg-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-white w-full -translate-x-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      )}

      <Navigation onNavigate={handleNavigate} currentView={currentView} />

      <main>
        {currentView === 'home' && <HomeView />}
        {currentView === 'procedures' && <ProceduresView />}
        {currentView === 'training' && <TrainingView />}
        {currentView === 'booking' && (
          <section className="bg-white min-h-[90vh] flex items-center justify-center pt-32 pb-40 px-6">
            <div className="max-w-3xl mx-auto text-center reveal">
               <span className="text-nude text-[10px] tracking-[0.6em] font-bold uppercase block mb-8 font-sans">Consultation</span>
               <h2 className="text-5xl md:text-8xl font-bold font-sans uppercase tracking-tighter leading-none mb-12">
                 Book <span className="text-dark/10">Now</span>
               </h2>
               <p className="text-xl font-light text-dark/50 mb-16 leading-relaxed">
                 원하시는 시술이나 수강 항목을 말씀해 주시면 <br/>
                 빠른 시간 내에 답변 드리겠습니다.
               </p>
               <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <a href="https://pf.kakao.com/_xlxmJJG" target="_blank" rel="noopener noreferrer" className="flex-1 w-full bg-dark text-white py-8 px-12 text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-nude transition-all font-sans">
                    카카오톡 문의
                  </a>
                  <a href="https://www.instagram.com/pearlz_de_beauty/" target="_blank" rel="noopener noreferrer" className="flex-1 w-full border border-dark text-dark py-8 px-12 text-[12px] font-bold tracking-[0.3em] uppercase hover:bg-dark hover:text-white transition-all font-sans">
                    인스타그램 DM
                  </a>
               </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default App;
