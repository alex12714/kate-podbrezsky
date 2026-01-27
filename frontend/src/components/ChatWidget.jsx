import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const WeChatIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z"/>
  </svg>
);

const ChatWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);
  const { t, language } = useLanguage();
  const kateImage = "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/0G4MpFhMscifkcXgKcOa/media/6748ef4d48436375b44b0f4e.png";
  const wechatId = "wxid_n04vcuvs9l4h12";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const isChineseMode = language === 'zh';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Bubble */}
      {showBubble && !showQRCode && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64 animate-fade-in">
          <button
            onClick={() => setShowBubble(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <img
              src={kateImage}
              alt="Kate"
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="text-gray-700 text-sm">
              {t('chatWidget.greeting')}
            </p>
          </div>
        </div>
      )}

      {/* WeChat QR Code Modal */}
      {showQRCode && (
        <div className="absolute bottom-16 right-0 bg-white rounded-xl shadow-2xl p-5 w-72 animate-fade-in">
          <button
            onClick={() => setShowQRCode(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <WeChatIcon className="w-6 h-6 text-[#07C160]" />
              <h3 className="font-semibold text-gray-800">微信联系</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-3">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=weixin://contacts/profile/${wechatId}`}
                alt="WeChat QR Code"
                className="w-44 h-44 mx-auto"
              />
            </div>
            <p className="text-sm text-gray-600 mb-2">扫描二维码添加微信</p>
            <div className="bg-gray-100 rounded-lg px-3 py-2">
              <p className="text-xs text-gray-500">微信号</p>
              <p className="text-sm font-mono text-gray-800 select-all">{wechatId}</p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button - WhatsApp or WeChat based on language */}
      {isChineseMode ? (
        <button
          onClick={() => setShowQRCode(!showQRCode)}
          className="w-14 h-14 bg-[#07C160] hover:bg-[#06AD56] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <WeChatIcon className="w-7 h-7 text-white" />
        </button>
      ) : (
        <a
          href="https://wa.link/nisn2y"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20BA5C] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <WhatsAppIcon className="w-7 h-7 text-white" />
        </a>
      )}
    </div>
  );
};

export default ChatWidget;
