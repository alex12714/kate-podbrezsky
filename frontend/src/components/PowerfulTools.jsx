import React from 'react';
import { Check } from 'lucide-react';
import { powerfulTools } from '../data/mock';

const PowerfulTools = () => {
  return (
    <section className="bg-white py-20 px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
            <span className="font-bold">These Powerful Tools Will</span>
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
            Propel Your Learning
          </h3>
          <p className="text-gray-500 mt-4">
            I utilize a diverse range of tools to deliver engaging, effective,<br />
            and personalized learning experiences for my students.
          </p>
        </div>

        <div className="space-y-4">
          {powerfulTools.map((tool, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-[#4ADE80] rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-700 leading-relaxed">
                {tool.split(/\*\*(.*?)\*\*/).map((part, i) => (
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerfulTools;
