import React from 'react';
import { ClipboardList, MessageCircle, CheckCircle } from 'lucide-react';

const ProcessSteps = () => {
  const steps = [
    {
      id: 1,
      icon: <ClipboardList className="w-8 h-8" />,
      title: "What You'll Do",
      highlight: "Before the Call",
      description: "To make the most of our time together, consider jotting down a few points about your language goals and any specific areas you'd like to focus on.",
      secondaryText: "Prepare quiet room where you can concentrate, have a good internet connection and prepare to turn on your camera during the Zoom session."
    },
    {
      id: 2,
      icon: <MessageCircle className="w-8 h-8" />,
      title: "What Happens",
      highlight: "During the Call",
      description: "We'll discuss your language background, goals, and any challenges you might be facing. This is a fantastic opportunity for us to get to know each other better.",
      secondaryText: "I will ask you to share your current comfort level, challenges, and desired outcomes, so we can tailor the coaching to your unique journey."
    },
    {
      id: 3,
      icon: <CheckCircle className="w-8 h-8" />,
      title: "What to Expect",
      highlight: "After the Call",
      description: "Upon deciding to proceed, we'll smoothly transition into the onboarding process, where we'll set the foundation for our collaboration.",
      secondaryText: "This includes signing the contract, tailoring a bespoke coaching plan to your goals, and crafting a convenient schedule that ensures consistent progress toward mastering your desired language skills."
    }
  ];

  return (
    <section className="bg-white py-20 px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
              {/* Icon Circle */}
              <div className="w-20 h-20 mx-auto mb-6 bg-[#E8833A]/10 rounded-full flex items-center justify-center text-[#E8833A]">
                {step.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                <span className="font-bold">{step.title}</span>{' '}
                <span className="text-[#E8833A]">{step.highlight}</span>
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm mt-4 mb-4 leading-relaxed">
                {step.description}
              </p>
              
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.secondaryText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
