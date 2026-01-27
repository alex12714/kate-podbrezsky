import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const { t } = useLanguage();

  const testimonials = [
    {
      id: 1,
      nameKey: 'testimonials.reviews.martin.name',
      titleKey: 'testimonials.reviews.martin.title',
      quoteKey: 'testimonials.reviews.martin.quote',
      image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/locatation/0G4MpFhMscifkcXgKcOa/images/1087a762-02b6-4d25-bda0-2dbfa3b369f6.jpeg"
    },
    {
      id: 2,
      nameKey: 'testimonials.reviews.shawn.name',
      titleKey: 'testimonials.reviews.shawn.title',
      quoteKey: 'testimonials.reviews.shawn.quote',
      image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/locatation/0G4MpFhMscifkcXgKcOa/images/75fdbf27-b9be-4702-8948-ea4436a8b2a4.jpeg"
    },
    {
      id: 3,
      nameKey: 'testimonials.reviews.jessica.name',
      titleKey: 'testimonials.reviews.jessica.title',
      quoteKey: 'testimonials.reviews.jessica.quote',
      image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/locatation/0G4MpFhMscifkcXgKcOa/images/1fe23f84-8e9d-48e3-b719-ae4932280ebf.jpeg"
    },
    {
      id: 4,
      nameKey: 'testimonials.reviews.fiona.name',
      titleKey: 'testimonials.reviews.fiona.title',
      quoteKey: 'testimonials.reviews.fiona.quote',
      image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/0G4MpFhMscifkcXgKcOa/media/658b4389d56b0dc6ef278b95.png"
    },
    {
      id: 5,
      nameKey: 'testimonials.reviews.mia.name',
      titleKey: 'testimonials.reviews.mia.title',
      quoteKey: 'testimonials.reviews.mia.quote',
      image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/0G4MpFhMscifkcXgKcOa/media/658b43c3e00b8749f31d5aab.png"
    },
    {
      id: 6,
      nameKey: 'testimonials.reviews.sharon.name',
      titleKey: 'testimonials.reviews.sharon.title',
      quoteKey: 'testimonials.reviews.sharon.quote',
      image: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/0G4MpFhMscifkcXgKcOa/media/658b45e8096557cb19b0f0ff.png"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="bg-gray-50 py-20 px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
            {t('testimonials.title')}
          </h2>
          <h3 className="text-xl md:text-2xl text-gray-700 font-bold">
            {t('testimonials.subtitle')}
          </h3>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            {t('testimonials.description')}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={t(testimonial.nameKey)}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {t(testimonial.nameKey)}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {t(testimonial.titleKey)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Quote */}
                    <p className="text-gray-600 text-sm leading-relaxed italic">
                      &quot;{t(testimonial.quoteKey)}&quot;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label={t('common.previous')}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label={t('common.next')}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-[#E8833A]' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
