import React from 'react';
import { Phone } from 'lucide-react';
import { coachingContent, heroContent } from '../data/mock';

const CoachingSection = () => {
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
    <section className="bg-gradient-to-br from-[#1a2b3c] via-[#1f3345] to-[#2a3f4f] py-20 px-8 relative overflow-hidden">
      {/* Decorative red glow */}
      <div className="absolute left-0 top-1/4 w-32 h-64 bg-red-900/30 blur-3xl rounded-full" />
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
          {renderHighlightedText(coachingContent.title)}
        </h2>
        
        <h3 className="text-xl md:text-2xl text-white font-bold mb-6">
          {coachingContent.subtitle}
        </h3>
        
        <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
          {coachingContent.description}
        </p>
        
        <p className="text-gray-400 mb-2">{coachingContent.highlight}</p>
        <p className="text-white font-semibold text-lg mb-10">
          {coachingContent.highlightSecondary}
        </p>
        
        <a
          href={heroContent.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#4ADE80] hover:bg-[#22c55e] text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30"
        >
          Book Your First Coaching Call Now
          <span className="bg-white/20 rounded-full p-1">
            <Phone className="w-5 h-5" />
          </span>
        </a>
      </div>
    </section>
  );
};

export default CoachingSection;
