import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutKate = () => {
  const { t } = useLanguage();
  const kateImage = "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/0G4MpFhMscifkcXgKcOa/media/6748eba7c4e51d926672cc95.png";

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
    <section className="bg-white py-20 px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              <img
                src={kateImage}
                alt="Kate Podbrezsky"
                className="w-full max-w-md mx-auto rounded-lg shadow-xl object-cover"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8">
              {renderHighlightedText(t('about.title'))}
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{t('about.paragraph1')}</p>
              <p>{t('about.paragraph2')}</p>
              <p>{t('about.paragraph3')}</p>
              <p>{t('about.paragraph4')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutKate;
