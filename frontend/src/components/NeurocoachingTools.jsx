import React from 'react';
import { Heart, Brain, TrendingUp } from 'lucide-react';
import { neurocoachingTools } from '../data/mock';

const NeurocoachingTools = () => {
  const icons = [
    <Heart className="w-8 h-8" />,
    <Brain className="w-8 h-8" />,
    <TrendingUp className="w-8 h-8" />
  ];

  return (
    <section className="bg-gray-50 py-20 px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
            <span className="font-bold">Essential Neurocoaching Tools</span>
          </h2>
          <h3 className="text-xl md:text-2xl text-gray-700">
            To Enhance Your Language Skill
          </h3>
          <p className="text-gray-500 mt-4">
            I utilize a diverse range of tools to deliver engaging, effective,<br />
            and personalized learning experiences for my students.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {neurocoachingTools.map((tool, index) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Icon */}
              <div className="w-16 h-16 mb-6 bg-[#E8833A]/10 rounded-full flex items-center justify-center text-[#E8833A]">
                {icons[index]}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {tool.title}{' '}
                <span className="text-[#E8833A] font-bold">{tool.highlight}</span>
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {tool.description}
              </p>
              
              <p className="text-gray-500 text-sm leading-relaxed italic">
                {tool.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeurocoachingTools;
