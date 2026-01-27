import React from 'react';
import { ClipboardList, MessageCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ProcessSteps = () => {
  const { t } = useLanguage();

  const steps = [
    {
      id: 1,
      icon: <ClipboardList className="w-8 h-8" />,
      title: t('processSteps.step1.title'),
      highlight: t('processSteps.step1.highlight'),
      description: t('processSteps.step1.description'),
      secondaryText: t('processSteps.step1.secondaryText')
    },
    {
      id: 2,
      icon: <MessageCircle className="w-8 h-8" />,
      title: t('processSteps.step2.title'),
      highlight: t('processSteps.step2.highlight'),
      description: t('processSteps.step2.description'),
      secondaryText: t('processSteps.step2.secondaryText')
    },
    {
      id: 3,
      icon: <CheckCircle className="w-8 h-8" />,
      title: t('processSteps.step3.title'),
      highlight: t('processSteps.step3.highlight'),
      description: t('processSteps.step3.description'),
      secondaryText: t('processSteps.step3.secondaryText')
    }
  ];

  return (
    <section className="bg-white py-20 px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
              {/* Icon Circle */}
              <div className="w-20 h-20 mx-auto mb-6 bg-[#E8833A]/10 rounded-full flex items-center justify-center text-[#E8833A]">
                {step.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                <span className="font-bold">{step.title}</span>{' '}
                <span className="text-[#E8833A]">{step.highlight}</span>
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm mt-4 mb-4 leading-relaxed">
                {step.description}
              </p>
              
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.secondaryText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
