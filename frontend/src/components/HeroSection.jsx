import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  const coachImage = "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/0G4MpFhMscifkcXgKcOa/media/6748ef4d48436375b44b0f4e.png";

  const renderHighlightedText = (text) => {
    const parts = text.split(/\[(.*?)\]/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span key={index} className="text-[#E8833A] font-bold">
            [{part}]
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section className="relative bg-gradient-to-br from-[#1a2b3c] via-[#1f3345] to-[#2a3f4f] overflow-hidden">
      {/* Red decorative glow on left */}
      <div className="absolute left-0 top-1/3 w-40 h-[400px] bg-gradient-to-r from-red-900/40 to-transparent blur-3xl" />

      <div className="container mx-auto px-8 lg:px-16 relative z-10 pt-16 pb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Content */}
          <div className="lg:w-[55%] text-left">
            <p className="text-gray-400 text-lg mb-3 uppercase tracking-wider">
              {t('hero.tagline')}
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-serif text-white leading-tight">
              {renderHighlightedText(t('hero.headline'))}
            </h1>
          </div>

          {/* Right Content - Coach Image */}
          <div className="lg:w-[45%] relative mt-8 lg:mt-0 flex justify-center lg:justify-end">
            {/* Decorative bracket shape */}
            <div className="absolute right-4 top-0 w-56 h-72 border-r-[6px] border-t-[6px] border-[#3d5a73]/60 rounded-tr-[40px]" />
            
            <div className="relative z-10">
              <img
                src={coachImage}
                alt="Kate Podbrezsky"
                className="w-72 lg:w-80 xl:w-96 h-auto object-cover object-top"
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
