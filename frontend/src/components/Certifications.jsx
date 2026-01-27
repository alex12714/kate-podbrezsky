import React, { useState } from 'react';
import { Award, X, ZoomIn } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const { t } = useLanguage();

  const certifications = [
    {
      id: 1,
      titleKey: 'certifications.certs.stirling.title',
      organizationKey: 'certifications.certs.stirling.organization',
      descriptionKey: 'certifications.certs.stirling.description',
      courseKey: 'certifications.certs.stirling.course',
      dateKey: 'certifications.certs.stirling.date',
      accreditationKey: 'certifications.certs.stirling.accreditation',
      image: "https://customer-assets.emergentagent.com/job_d44db25e-7eeb-45e6-94cf-85c99f7ff62d/artifacts/3erwpaf8_stirling-diploma.png",
      imagePosition: "top"
    },
    {
      id: 2,
      titleKey: 'certifications.certs.neuro.title',
      organizationKey: 'certifications.certs.neuro.organization',
      descriptionKey: 'certifications.certs.neuro.description',
      courseKey: 'certifications.certs.neuro.course',
      dateKey: 'certifications.certs.neuro.date',
      accreditationKey: 'certifications.certs.neuro.accreditation',
      image: "https://customer-assets.emergentagent.com/job_d44db25e-7eeb-45e6-94cf-85c99f7ff62d/artifacts/kaj115lw_coaching-certificat.png",
      imagePosition: "center"
    },
    {
      id: 3,
      titleKey: 'certifications.certs.tefl.title',
      organizationKey: 'certifications.certs.tefl.organization',
      descriptionKey: 'certifications.certs.tefl.description',
      courseKey: 'certifications.certs.tefl.course',
      dateKey: 'certifications.certs.tefl.date',
      accreditationKey: 'certifications.certs.tefl.accreditation',
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
            {t('certifications.badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
            {t('certifications.title')}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t('certifications.subtitle')}
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
                  alt={t(cert.titleKey)}
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
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-3 min-h-[4.5rem]">{t(cert.titleKey)}</h3>
                  <span className="text-xs bg-[#4ADE80]/10 text-[#4ADE80] px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                    {t(cert.accreditationKey)}
                  </span>
                </div>
                
                {/* Middle content */}
                <p className="text-[#E8833A] font-medium text-sm mb-2">{t(cert.organizationKey)}</p>
                <p className="text-gray-600 text-sm mb-3 flex-1">{t(cert.descriptionKey)}</p>
                
                {/* Bottom content - stuck to bottom */}
                <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100 mt-auto">
                  <span className="text-gray-500">{t(cert.courseKey)}</span>
                  <span className="text-gray-400">{t(cert.dateKey)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-3">{t('certifications.accreditedBy')}</p>
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
              alt={t(selectedCert.titleKey)}
              className="w-full h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-4 text-center">
              <h3 className="text-white text-xl font-bold">{t(selectedCert.titleKey)}</h3>
              <p className="text-gray-300">{t(selectedCert.organizationKey)} • {t(selectedCert.dateKey)}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
