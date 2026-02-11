import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { ViewState } from './types';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    
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
      {/* MAIN HERO SECTION */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-dark">
        <img 
          src="https://scontent-ssn1-1.cdninstagram.com/v/t51.82787-15/546572300_18076272914012670_7642178288577633727_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=MzcyMTQwNDk4NjA3MDA0NjY2MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=LQrOoIEqfi0Q7kNvwFemyyW&_nc_oc=AdkKCE-n3qSuHG0v8L1hcwFi9T6Q7G_8H8AummTfXpevEQ628NF1FAniWrVtKHycRgo&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_gid=rr8M6NYyip0c2ciQn7BiBg&oh=00_AfsDnF_wEtI9YJIp6RyDUZihg0JCHXCJtwB-OR2lk8DooQ&oe=6991C69B" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.45] scale-100" 
          alt="Main Background" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522337360733-412a652854fc?q=80&w=2000&auto=format&fit=crop";
          }}
        />
        <div className="relative z-10 text-center px-4 reveal flex flex-col items-center">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-[11vw] md:text-[6.5vw] font-bold leading-[0.85] font-brand tracking-tighter uppercase text-white mb-1 drop-shadow-lg">
              Pearlz
            </h1>
            <h1 className="text-[11vw] md:text-[6.5vw] font-bold leading-[0.85] font-brand tracking-tighter uppercase text-nude drop-shadow-lg">
              De Beauty
            </h1>
          </div>
          
          <p className="text-[11px] md:text-[10px] uppercase tracking-[0.7em] font-medium mb-16 font-sans text-white/90 whitespace-nowrap pl-[0.9em]">
            당신의 아름다움을 완성하는 곳
          </p>

          <div className="w-[1px] h-20 bg-white/30"></div>
        </div>
      </section>

      {/* 3 Main Menu Cards */}
      <section className="flex flex-col bg-dark overflow-hidden">
        {[
          { title: 'Procedures', label: '시술 항목', view: 'procedures' as ViewState, img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.82787-15/612470975_18088614206012670_7781569586294289730_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzgwODE2NDQ4OTQwMjE0MTQ0OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=GWikn22-_XsQ7kNvwF0pvgN&_nc_oc=Adl9gZxOvZRfv4Z0OGu-vOJnWA5HGGlnWD8VtYcBGsMDVPA1_ZkDS5iTcOyEzkFYljk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_gid=jw6sCwwYJhEqv44wjKAQVg&oh=00_AftoDgMKJ7i4WKYaGCEqZQhydW3pNrFQbpmrR3M0bs7i0A&oe=6991AD61' },
          { title: 'Education', label: '수강 메뉴', view: 'training' as ViewState, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop' },
          { title: 'Booking', label: '예약 문의', view: 'booking' as ViewState, img: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1000&auto=format&fit=crop' }
        ].map((card) => (
          <button 
            key={card.view}
            onClick={() => handleNavigate(card.view)}
            className="relative w-full h-[40vh] md:h-[50vh] group overflow-hidden border-b border-white/5 last:border-0 transition-all duration-700 flex flex-col"
          >
            <img 
              src={card.img} 
              className="absolute inset-0 w-full h-full object-cover brightness-[0.3] group-hover:brightness-[0.45] transition-all duration-1000"
              alt={card.label}
              onError={(e) => {
                if (card.img === '/Images/main_1.jpeg') {
                   (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1583001931046-648c6f194384?q=80&w=1000&auto=format&fit=crop";
                }
              }}
            />
            <div className="relative flex-1 flex flex-col items-center justify-center z-10 text-white p-6 text-center">
              <span className="text-[9px] tracking-[0.4em] opacity-40 mb-3 group-hover:opacity-100 transition-opacity uppercase font-bold font-sans">{card.title}</span>
              <h2 className="text-2xl md:text-4xl font-black group-hover:tracking-[0.05em] transition-all duration-500">{card.label}</h2>
            </div>
          </button>
        ))}
      </section>

      {/* INTRODUCTION */}
      <section className="py-40 px-6 md:px-20 bg-cream text-center border-t border-dark/5">
        <div className="max-w-4xl mx-auto reveal">
          <h3 className="text-[10px] tracking-[0.6em] font-bold text-nude mb-8 uppercase font-sans">Premium Artistry</h3>
          <h2 className="text-3xl md:text-6xl font-black leading-tight mb-12">
            본연의 아름다움을 <br/><span className="italic font-light text-nude">가장 자연스럽게.</span>
          </h2>
          <p className="text-base md:text-xl font-light text-dark/60 leading-relaxed max-w-2xl mx-auto">
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
          <h2 className="text-4xl md:text-7xl font-bold font-sans uppercase tracking-tighter leading-none mb-10">
            시술 <span className="text-white/20">항목</span>
          </h2>
          <div className="h-px w-24 bg-nude opacity-30 mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {[
            { title: 'Natural Brow', sub: '엠보 자연 눈썹', description: '한 올 한 올 결을 살려 본인의 눈썹처럼 자연스러운 디자인', img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.82787-15/557304814_18078846899012670_6880746521328436143_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=MzczMzY1NTg3MjE1ODY5OTY0Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=tl4K2aHwmSYQ7kNvwFr3X2D&_nc_oc=Adm18cz7tIb-Vz8lGJ6RseKB4ShZ7NmD5Lzu8dyYp8Qh2r3SdLwOByhBLfDZRRRTkNU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_gid=rr8M6NYyip0c2ciQn7BiBg&oh=00_AfsvOkIu2CA30CtFXw10xPn9pJ08TVUMjvc5hYKhhk98RQ&oe=6991DAF3' },
            { title: 'Signature Lip', sub: '풀 립 / 틴트 립', description: '생기 없는 입술에 맑은 컬러감을 입혀 화사한 안색을 선사', img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.82787-15/526022374_18072289010012670_3156651996318306017_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzY5MDA4MzgxMjY1NTg1OTM3NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=-iVYDSHsCWcQ7kNvwE5yreI&_nc_oc=AdlfLSEteZFb5CiJaVPugcDV_KunTUqOvs5wses7s2O1nC4HYjUWWYJbVBarUgeE794&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_gid=rfsjo_Ox-TpIhWOdhd17Kw&oh=00_AfuYNEQhsPuN5Dnxiyj_TNobskRVefziuiVdSbhHkFO2RA&oe=6991C159' },
            { title: 'Secret Liner', sub: '점막 아이라인', description: '속눈썹 사이사이를 채워 더욱 또렷하고 깊은 눈매 연출', img: 'https://scontent-ssn1-1.cdninstagram.com/v/t51.82787-15/591151609_18085863068012670_1417484571637072141_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=Mzc4NTcxMDEyODQ5NTUxNzI1OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc3NC5zZHIuQzMifQ%3D%3D&_nc_ohc=BeAqMtTPuMwQ7kNvwF9Q9om&_nc_oc=Adm-y77j2_OBF7hEwDDayfMmiJp0762Nys7y_-rZ6gnENeBZ40RFZEXdW9utbb1gD4M&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_gid=-nqEEoTNrK6c66s8X6VGhg&oh=00_AfuzwYtp14jI319kM06SHHyBo8CjoznTMPwTcJ2wyxQ3bQ&oe=6991B397' },
            { title: 'Hairline Art', sub: '헤어라인 교정', description: '얼굴형을 보완하는 자연스러운 쉐딩 기법으로 동안 효과', img: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1000&auto=format&fit=crop' },
            { title: 'Skin SMP', sub: '두피 문신', description: '비어있는 모발 사이를 미세한 도트로 채워 풍성한 모량 표현', img: 'https://images.unsplash.com/photo-1522337660859-02fbefad15c0?q=80&w=1000&auto=format&fit=crop' },
            { title: 'Combo Brow', sub: '콤보 / 수지 눈썹', description: '결과 면의 조화로 메이크업을 한 듯 선명하고 깔끔한 눈썹', img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop' }
          ].map((item, idx) => (
            <div key={idx} className="reveal group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden mb-8 border border-white/5 relative">
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                  alt={item.title} 
                />
                <div className="absolute top-6 left-6 text-[32px] font-sans font-light opacity-10 group-hover:opacity-30 transition-opacity">0{idx+1}</div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <h4 className="text-xl font-bold tracking-tight font-sans uppercase">{item.title}</h4>
                  <span className="text-nude text-[9px] font-bold tracking-widest uppercase mb-1">{item.sub}</span>
                </div>
                <p className="text-white/40 text-[13px] font-light leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 text-center reveal">
          <button onClick={() => handleNavigate('booking')} className="px-12 py-6 border border-white/20 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-dark transition-all duration-500 font-sans">
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
            <h2 className="text-4xl md:text-7xl font-bold font-sans uppercase tracking-tighter leading-none mb-10">
              수강 <span className="text-dark/10">메뉴</span>
            </h2>
            <p className="text-lg md:text-xl font-light text-dark/60 leading-relaxed max-w-lg">
              기초부터 창업까지, 펄즈만의 차별화된 테크닉과 경영 노하우를 아낌없이 전수합니다.
            </p>
          </div>
          <div className="aspect-[16/9] bg-dark relative overflow-hidden flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-60" 
              alt="Classroom"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
            <div key={idx} className="bg-white p-12 md:p-16 border border-dark/5 reveal hover:border-nude/30 transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-10">
                <h3 className="text-3xl font-bold font-sans uppercase tracking-tighter">{course.title}</h3>
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase bg-dark text-white px-4 py-1 font-sans">{course.period}</span>
              </div>
              <p className="text-nude text-[10px] font-bold tracking-[0.4em] mb-10 uppercase font-sans">{course.target}</p>
              <ul className="space-y-4">
                {course.content.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-dark/60 text-[13px] font-medium">
                    <div className="w-1 h-1 bg-nude rotate-45"></div>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleNavigate('booking')} className="mt-12 w-full py-5 border border-dark/10 text-[9px] font-bold tracking-[0.3em] uppercase hover:bg-dark hover:text-white transition-all font-sans">
                Detail Inquiry
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="noise-overlay"></div>
      
      {!isLoaded && (
        <div className="fixed inset-0 bg-dark z-[10000] flex flex-col items-center justify-center text-white">
          <div className="font-brand text-xl font-bold tracking-[0.5em] mb-4 uppercase">Pearlz De Beauty</div>
          <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden">
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
               <h2 className="text-4xl md:text-7xl font-bold font-sans uppercase tracking-tighter leading-none mb-12">
                 Book <span className="text-dark/10">Now</span>
               </h2>
               <p className="text-lg font-light text-dark/50 mb-16 leading-relaxed">
                 원하시는 시술이나 수강 항목을 말씀해 주시면 <br/>
                 빠른 시간 내에 답변 드리겠습니다.
               </p>
               <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <a href="https://pf.kakao.com/_xlxmJJG" target="_blank" rel="noopener noreferrer" className="flex-1 w-full bg-dark text-white py-6 px-10 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-nude transition-all font-sans">
                    카카오톡 문의
                  </a>
                  <a href="https://www.instagram.com/pearlz_de_beauty/" target="_blank" rel="noopener noreferrer" className="flex-1 w-full border border-dark text-dark py-6 px-10 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-dark hover:text-white transition-all font-sans">
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