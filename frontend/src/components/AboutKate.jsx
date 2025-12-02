import React from 'react';
import { coachData } from '../data/mock';

const AboutKate = () => {
  return (
    <section className="bg-white py-20 px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              <img
                src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/0G4MpFhMscifkcXgKcOa/media/6748eba7c4e51d926672cc95.png"
                alt={coachData.name}
                className="w-full max-w-md mx-auto rounded-lg shadow-xl object-cover"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8">
              About <span className="text-[#E8833A] font-bold">[Kate]</span>
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                My background encompasses diverse roles, including English coaching, translation, consecutive and simultaneous interpreting.
              </p>
              <p>
                I&apos;ve honed my skills in proofreading and transcription across a spectrum of fields— <strong>education</strong>, local government, <strong>health</strong>, literature, <strong>business</strong>, and the environment.
              </p>
              <p>
                Notably, I&apos;ve lent my voice to professional trilingual voiceovers for telephone systems and videos.
              </p>
              <p>
                With a cross-cultural proficiency gained through experiences spanning Europe, USA, the UK, Middle East, and Asia, I bring a <strong>unique perspective</strong> to every interaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutKate;
