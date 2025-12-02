import React, { useEffect } from 'react';

const CalendlySection = () => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section className="bg-white py-16 px-8">
      <div className="container mx-auto max-w-4xl">
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/katepodbrezsky/45-minute-call?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=4ade80"
          style={{ minWidth: '320px', height: '700px' }}
        />
      </div>
    </section>
  );
};

export default CalendlySection;
