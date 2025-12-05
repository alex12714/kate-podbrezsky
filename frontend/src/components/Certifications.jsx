import React, { useState } from 'react';
import { Award, X, ZoomIn } from 'lucide-react';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certifications = [
    {
      id: 1,
      title: "Bachelor of Arts (with Merit)",
      organization: "The University of Stirling",
      description: "English as a Foreign Language",
      course: "Degree granted by Royal Charter with authority of Academic Council",
      date: "June 2007",
      accreditation: "UK University",
      image: "https://customer-assets.emergentagent.com/job_d44db25e-7eeb-45e6-94cf-85c99f7ff62d/artifacts/3erwpaf8_stirling-diploma.png",
      imagePosition: "top"
    },
    {
      id: 2,
      title: "Neurolanguage Coach® Certification",
      organization: "ELC Language Coaching Certification",
      description: "Certificate of Language Coaching from Accredited Educational & Language Coaching Academy (AELCA)",
      course: "30 Continuing Coaching Education Hours",
      date: "November 2024",
      accreditation: "ICF CCE Accredited",
      image: "https://customer-assets.emergentagent.com/job_d44db25e-7eeb-45e6-94cf-85c99f7ff62d/artifacts/kaj115lw_coaching-certificat.png",
      imagePosition: "center"
    },
    {
      id: 3,
      title: "TEFL / TESOL Certificate",
      organization: "TEFL Scotland",
      description: "Teaching English as a Foreign Language (TEFL) & Teaching English to Speakers of Other Languages (TESOL)",
      course: "30-hour Grammar and Language Awareness Course",
      date: "May 2010",
      accreditation: "ODLQC Accredited",
      image: "https://customer-assets.emergentagent.com/job_d44db25e-7eeb-45e6-94cf-85c99f7ff62d/artifacts/1f8fig7t_tefl-certificate.jpeg",
      imagePosition: "top"
    }
  ];

  return (
    <section className="bg-gray-50 py-20 px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E8833A]/10 text-[#E8833A] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Professional Credentials
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
            Diplomas & <span className="text-[#E8833A]">Certifications</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Internationally recognized qualifications ensuring the highest standards in language coaching and education.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col"
            >
              {/* Certificate Image */}
              <div 
                className="relative overflow-hidden cursor-pointer"
                style={{ height: '220px' }}
                onClick={() => setSelectedCert(cert)}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                    cert.imagePosition === 'top' ? 'object-top' : 'object-center'
                  }`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                    <ZoomIn className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6 flex flex-col flex-1">
                {/* Title Section - Fixed height for 3 lines */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-3 min-h-[4.5rem]">{cert.title}</h3>
                  <span className="text-xs bg-[#4ADE80]/10 text-[#4ADE80] px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                    {cert.accreditation}
                  </span>
                </div>
                
                {/* Middle content */}
                <p className="text-[#E8833A] font-medium text-sm mb-2">{cert.organization}</p>
                <p className="text-gray-600 text-sm mb-3 flex-1">{cert.description}</p>
                
                {/* Bottom content - stuck to bottom */}
                <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100 mt-auto">
                  <span className="text-gray-500">{cert.course}</span>
                  <span className="text-gray-400">{cert.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-3">Accredited by</p>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <span className="font-bold text-gray-700">University of Stirling</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <span className="font-bold text-gray-700">ODLQC</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <span className="font-bold text-gray-700">ICF</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm">
                <span className="font-bold text-gray-700">AELCA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className="w-full h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-4 text-center">
              <h3 className="text-white text-xl font-bold">{selectedCert.title}</h3>
              <p className="text-gray-300">{selectedCert.organization} • {selectedCert.date}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
