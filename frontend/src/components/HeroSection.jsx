import React from 'react';
import { Phone } from 'lucide-react';
import { heroContent, coachData } from '../data/mock';

const HeroSection = () => {
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
    <section className="relative min-h-screen bg-gradient-to-br from-[#1a2b3c] via-[#1f3345] to-[#2a3f4f] overflow-hidden">
      {/* Student Login Button */}
      <div className="absolute top-6 right-8 z-20">
        <a
          href="https://study-english.softr.app/sign-in"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2980b9] hover:bg-[#3498db] text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300"
        >
          Student Login
        </a>
      </div>

      {/* Red decorative glow on left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-96 bg-red-900/30 blur-3xl rounded-full" />

      <div className="container mx-auto px-8 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
          {/* Left Content */}
          <div className="lg:w-1/2 text-left pt-16 lg:pt-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
              {renderHighlightedText(heroContent.headline)}
            </h1>
            
            <p className="text-gray-400 text-lg mb-12">
              {heroContent.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <a
                href={heroContent.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4ADE80] hover:bg-[#22c55e] text-gray-900 font-semibold px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30"
              >
                {heroContent.ctaButton}
                <span className="bg-white/20 rounded-full p-1">
                  <Phone className="w-5 h-5" />
                </span>
              </a>
              
              <span className="text-white font-medium">OR</span>
              
              <a
                href={heroContent.registerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4ADE80] hover:text-[#22c55e] font-semibold flex items-center gap-2 transition-colors duration-300"
              >
                <span className="text-yellow-400">👉</span>
                Register for Class Now
              </a>
            </div>
          </div>

          {/* Right Content - Coach Image */}
          <div className="lg:w-1/2 relative mt-12 lg:mt-0 flex justify-end">
            {/* Decorative bracket shape */}
            <div className="absolute right-0 top-0 w-64 h-80 border-r-4 border-t-4 border-gray-600/50 rounded-tr-3xl" />
            
            <div className="relative z-10">
              <img
                src={coachData.image}
                alt={coachData.name}
                className="w-80 h-auto object-cover object-top rounded-bl-[100px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal White Section Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L1440 0V120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
