
import React from 'react';
import { Project } from '../types';

const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'THE VOID HOUSE',
    location: 'Kyoto, Japan',
    description: '여백과 빛의 조작에 중점을 둔 미니멀 콘크리트 레지던스입니다. 명상과 침묵을 위한 공간으로 설계되었습니다.',
    image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0dccab47-16b0-4716-9e1a-b97f124e3031_1600w.webp'
  },
  {
    id: '02',
    title: 'MOSS BUNKER',
    location: 'Seoul, Korea',
    description: '낡은 지하 벙커를 지속 가능한 수직 농장과 주거 공간으로 재탄생시킨 도시 재생 프로젝트입니다.',
    image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/952269bf-60f5-48dc-afce-13953bead1eb_1600w.webp'
  },
  {
    id: '03',
    title: 'SKY CLIFF',
    location: 'Jeju, Korea',
    description: '화산 지형 위로 돌출된 캔틸레버 구조의 유리와 강철 건축물로, 위험과 럭셔리의 경계를 허뭅니다.',
    image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/aa5ed4de-1a7e-4bb7-b0ea-1a4c511663df_1600w.webp'
  }
];

const ProjectStack: React.FC = () => {
  return (
    <section id="projects" className="bg-dark py-20 px-6 font-sans">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-24">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-4 font-bold">Selected Works</p>
          <h2 className="text-4xl md:text-6xl font-black text-white">최근 프로젝트</h2>
        </div>

        <div className="space-y-[10vh] pb-[10vh]">
          {PROJECTS.map((project) => (
            <div key={project.id} className="card-stack-item h-[80vh] flex items-center justify-center">
              <div className="w-full h-full bg-[#1a1a1a] border border-white/10 grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-700">
                <div className="p-8 md:p-16 flex flex-col justify-between order-2 md:order-1">
                  <div>
                    <span className="text-5xl font-sans font-light text-white/10 block mb-4 tracking-tighter">{project.id}</span>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight uppercase">{project.title}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{project.location}</p>
                  </div>
                  <p className="text-gray-400 font-light leading-relaxed max-w-md">
                    {project.description}
                  </p>
                  <button className="flex items-center gap-4 text-white text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white/20 pb-2 w-fit hover:border-white transition-all group">
                    View Project
                    <iconify-icon icon="solar:arrow-right-linear" className="group-hover:translate-x-2 transition-transform"></iconify-icon>
                  </button>
                </div>
                <div className="relative overflow-hidden order-1 md:order-2">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-110" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectStack;
