import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 p-1">
        <button
          onClick={() => setLanguage('en')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            language === 'en'
              ? 'bg-[#E8833A] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-base">🇬🇧</span>
          <span className="hidden sm:inline">{t('languageSwitcher.en')}</span>
        </button>
        <button
          onClick={() => setLanguage('zh')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            language === 'zh'
              ? 'bg-[#E8833A] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-base">🇨🇳</span>
          <span className="hidden sm:inline">{t('languageSwitcher.zh')}</span>
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
