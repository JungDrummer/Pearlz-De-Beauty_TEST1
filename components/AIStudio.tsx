
import React, { useState, useRef } from 'react';
import { getGeminiResponse, generateArchitecturalImage } from '../services/geminiService';
import { AIModelType } from '../types';

const AIStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConsult = async () => {
    if (!prompt.trim() && !uploadedImg) return;
    setIsGenerating(true);
    setResponse(null);
    setGeneratedImg(null);
    
    try {
      const res = await getGeminiResponse(
        prompt || "이 이미지를 분석하여 펄즈 스타일의 건축적 조언을 해주세요.",
        AIModelType.FLASH,
        uploadedImg ? { data: uploadedImg, mimeType: 'image/jpeg' } : undefined
      );
      setResponse(res);
    } catch (error) {
      console.error(error);
      setResponse("상담 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDream = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setResponse(null);
    setGeneratedImg(null);

    try {
      const img = await generateArchitecturalImage(prompt, AIModelType.FLASH_IMAGE);
      setGeneratedImg(img);
    } catch (error) {
      console.error(error);
      setResponse("이미지 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="studio" className="bg-stone py-32 px-6">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div className="sticky top-32">
          <p className="text-[10px] uppercase tracking-[0.5em] text-dark/40 mb-4 font-bold">Dream Studio</p>
          <h2 className="text-4xl md:text-5xl font-black text-dark mb-8 leading-tight">
            당신의 건축적 영감을 <br/><span className="text-moss">공간으로 구현하다</span>
          </h2>
          <p className="text-gray-600 font-light mb-12 leading-relaxed">
            펄즈의 AI 아키텍처 스튜디오를 만나보세요. 텍스트나 이미지를 통해 당신의 상상을 구체적인 설계 개념으로 변환해 드립니다.
          </p>
          
          <div className="space-y-4">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="공간에 대한 영감이나 키워드를 입력하세요... (예: 숲 속의 콘크리트 사원)"
              className="w-full h-32 bg-white/50 border border-dark/10 p-4 focus:bg-white focus:outline-none transition-all placeholder:text-dark/30 text-sm"
            />
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleConsult}
                disabled={isGenerating}
                className="bg-dark text-white text-[10px] uppercase tracking-widest px-8 py-4 font-bold hover:bg-moss transition-colors disabled:opacity-50"
              >
                {isGenerating ? 'ANALYZING...' : 'ARCHITECTURAL CONSULT'}
              </button>
              <button 
                onClick={handleDream}
                disabled={isGenerating}
                className="bg-moss text-white text-[10px] uppercase tracking-widest px-8 py-4 font-bold hover:bg-dark transition-colors disabled:opacity-50"
              >
                {isGenerating ? 'DREAMING...' : 'GENERATE CONCEPT'}
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="border border-dark/20 text-dark text-[10px] uppercase tracking-widest px-8 py-4 font-bold hover:bg-white transition-colors"
              >
                UPLOAD REFERENCE
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={onFileChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>
            
            {uploadedImg && (
              <div className="mt-4 relative w-24 h-24 border border-dark/10">
                <img src={uploadedImg} className="w-full h-full object-cover" alt="Upload" />
                <button 
                  onClick={() => setUploadedImg(null)}
                  className="absolute -top-2 -right-2 bg-dark text-white rounded-full w-5 h-5 flex items-center justify-center text-[8px]"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="min-h-[500px] border border-dark/5 bg-white/30 p-8 flex flex-col items-center justify-center relative overflow-hidden">
          {isGenerating && (
            <div className="absolute inset-0 z-20 bg-stone/80 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-dark/10 border-t-moss rounded-full animate-spin mb-4"></div>
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Processing Dream...</p>
            </div>
          )}

          {!response && !generatedImg && !isGenerating && (
            <div className="text-center opacity-30">
              <iconify-icon icon="solar:square-academic-cap-linear" width="64"></iconify-icon>
              <p className="mt-4 text-xs font-bold tracking-widest">AWAITING INSPIRATION</p>
            </div>
          )}

          {generatedImg && (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
              <img src={generatedImg} alt="Generated Concept" className="w-full h-auto shadow-2xl" />
              <div className="mt-8 p-4 bg-white/50 border-l-2 border-moss">
                <p className="text-[10px] uppercase tracking-widest font-bold mb-2">Architectural Logic</p>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  "우리는 당신의 비전을 콘크리트와 빛의 조화로 재해석했습니다. 이 구조물은 중력에 대한 최소한의 저항과 최대한의 침묵을 상징합니다."
                </p>
              </div>
            </div>
          )}

          {response && !generatedImg && (
            <div className="w-full animate-in fade-in duration-700 prose prose-sm text-gray-700 max-w-none font-light leading-loose">
              <p className="text-[10px] uppercase tracking-widest font-bold mb-6 text-dark border-b border-dark/10 pb-2">PEARLZ ARCHITECT ADVICE</p>
              <div className="whitespace-pre-wrap">{response}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIStudio;
