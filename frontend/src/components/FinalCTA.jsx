import React from 'react';
import { Phone } from 'lucide-react';
import { finalCTA, heroContent } from '../data/mock';

const FinalCTA = () => {
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
    <>
      {/* Are You Ready Section */}
      <section className="bg-white py-20 px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image */}
            <div className="lg:w-1/2">
              <img
                src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/0G4MpFhMscifkcXgKcOa/media/6748d7a5ff7f7ebdc28b353b.png"
                alt="Kate Podbrezsky"
                className="w-full max-w-sm mx-auto rounded-lg shadow-xl object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">
                {renderHighlightedText(finalCTA.title)}
              </h2>
              
              <p className="text-gray-500 italic text-lg mb-6">
                {finalCTA.quote}
              </p>
              
              <p className="text-gray-600 mb-4">
                {finalCTA.description}
              </p>
              
              <p className="text-gray-600 mb-8">
                {finalCTA.secondaryText}
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
          </div>
        </div>
      </section>

      {/* Final CTA Section - Dark gradient */}
      <section className="bg-gradient-to-br from-[#1a2b3c] via-[#1f3345] to-[#2a3f4f] py-24 px-8 relative overflow-hidden">
        {/* Decorative red glow */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-80 bg-red-900/30 blur-3xl rounded-full" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <p className="text-gray-300 italic text-xl mb-4">
            {finalCTA.bottomTitle}
          </p>
          
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">
            Get Confident<br />
            in Your <span className="text-[#E8833A] font-bold">[ENGLISH]</span> Now<span className="font-bold">!</span>
          </h2>
          
          <p className="text-4xl mb-8">👇</p>
          
          <a
            href={heroContent.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#4ADE80] hover:bg-[#22c55e] text-gray-900 font-semibold px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30 text-lg"
          >
            Book Your First Coaching Call Now
            <span className="bg-white/20 rounded-full p-2">
              <Phone className="w-6 h-6" />
            </span>
          </a>
        </div>
      </section>
    </>
  );
};

export default FinalCTA;
