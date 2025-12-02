import React from 'react';
import { coachData } from '../data/mock';

const CoachIntro = () => {
  return (
    <section className="bg-white py-16 px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-8 max-w-5xl mx-auto">
          {/* Coach Name */}
          <div className="md:w-1/3">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wide">
              {coachData.name}
            </h2>
            <p className="text-gray-500 mt-2">{coachData.title}</p>
          </div>

          {/* Coach Description */}
          <div className="md:w-2/3 flex items-stretch">
            <div className="w-1 bg-[#E8833A] mr-6 flex-shrink-0" />
            <p className="text-gray-600 leading-relaxed text-lg">
              {coachData.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachIntro;
