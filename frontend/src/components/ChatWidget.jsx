import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    // Show the widget after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Bubble */}
      {showBubble && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64 animate-fade-in">
          <button
            onClick={() => setShowBubble(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <img
              src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/0G4MpFhMscifkcXgKcOa/media/6748ef4d48436375b44b0f4e.png"
              alt="Kate"
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="text-gray-700 text-sm">
              Hi there, have a question? Let's connect.
            </p>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <a
        href="https://wa.link/nisn2y"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#2980b9] hover:bg-[#3498db] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
};

export default ChatWidget;
