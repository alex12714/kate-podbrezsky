import React from 'react';
import { Heart, Brain, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const NeurocoachingTools = () => {
  const { t } = useLanguage();

  const getIcon = (index) => {
    const icons = [
      <Heart key="heart" className="w-8 h-8" />,
      <Brain key="brain" className="w-8 h-8" />,
      <TrendingUp key="trending" className="w-8 h-8" />
    ];
    return icons[index];
  };

  const tools = [
    {
      id: 1,
      titleKey: 'neurocoaching.tools.emotional.title',
      highlightKey: 'neurocoaching.tools.emotional.highlight',
      descriptionKey: 'neurocoaching.tools.emotional.description',
      detailKey: 'neurocoaching.tools.emotional.detail'
    },
    {
      id: 2,
      titleKey: 'neurocoaching.tools.active.title',
      highlightKey: 'neurocoaching.tools.active.highlight',
      descriptionKey: 'neurocoaching.tools.active.description',
      detailKey: 'neurocoaching.tools.active.detail'
    },
    {
      id: 3,
      titleKey: 'neurocoaching.tools.growth.title',
      highlightKey: 'neurocoaching.tools.growth.highlight',
      descriptionKey: 'neurocoaching.tools.growth.description',
      detailKey: 'neurocoaching.tools.growth.detail'
    }
  ];

  return (
    <section className="bg-gray-50 py-20 px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
            <span className="font-bold">{t('neurocoaching.title')}</span>
          </h2>
          <h3 className="text-xl md:text-2xl text-gray-700">
            {t('neurocoaching.subtitle')}
          </h3>
          <p className="text-gray-500 mt-4">
            {t('neurocoaching.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Icon */}
              <div className="w-16 h-16 mb-6 bg-[#E8833A]/10 rounded-full flex items-center justify-center text-[#E8833A]">
                {getIcon(index)}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t(tool.titleKey)}{' '}
                <span className="text-[#E8833A] font-bold">{t(tool.highlightKey)}</span>
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {t(tool.descriptionKey)}
              </p>
              
              <p className="text-gray-500 text-sm leading-relaxed italic">
                {t(tool.detailKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeurocoachingTools;
