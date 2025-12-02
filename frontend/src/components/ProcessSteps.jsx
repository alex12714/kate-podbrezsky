import React from 'react';
import { ClipboardList, MessageCircle, CheckCircle } from 'lucide-react';
import { processSteps } from '../data/mock';

const ProcessSteps = () => {
  const icons = [
    <ClipboardList className="w-8 h-8" />,
    <MessageCircle className="w-8 h-8" />,
    <CheckCircle className="w-8 h-8" />
  ];

  return (
    <section className="bg-white py-20 px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div key={step.id} className="text-center">
              {/* Icon Circle */}
              <div className="w-20 h-20 mx-auto mb-6 bg-[#E8833A]/10 rounded-full flex items-center justify-center text-[#E8833A]">
                {icons[index]}
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
