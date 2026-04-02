import React from 'react';

interface TemplatePreviewProps {
  header?: string | null;
  body: string;
  buttons?: Array<{ text: string; type: 'URL' | 'PHONE_NUMBER' | 'QUICK_REPLY' }>;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ header, body }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg p-4 flex flex-col items-center justify-start">
      {/* Phone Frame */}
      <div className="w-full max-w-sm bg-gray-900 rounded-3xl border-8 border-black shadow-2xl overflow-hidden">
        {/* Phone Header */}
        <div className="bg-gray-800 px-4 py-2 flex justify-between items-center text-white text-xs">
          <span>12:00</span>
          <div className="flex gap-1">
            <span>📡</span>
            <span>📶</span>
            <span>🔋</span>
          </div>
        </div>

        {/* WhatsApp Chat Area */}
        <div className="bg-gray-100 h-80 flex flex-col">
          {/* Message Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center font-bold">
                HM
              </div>
              <div>
                <p className="font-semibold text-sm">My Business</p>
                <p className="text-xs opacity-90">Business Account</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {/* Encryption Message */}
            <div className="flex justify-center">
              <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-full">
                Messages and calls are end-to-end encrypted.
              </div>
            </div>

            {/* Message Bubble */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 max-w-xs shadow-sm">
                {header && (
                  <p className="font-bold text-gray-900 mb-2 text-sm">{header}</p>
                )}
                <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {body || 'Your template message will appear here...'}
                </p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-gray-200 px-4 py-2 flex gap-2 items-center">
            <button className="text-teal-500 text-xl">😀</button>
            <input
              type="text"
              placeholder="Message"
              className="flex-1 bg-white rounded-full px-4 py-2 text-sm outline-none"
              disabled
            />
            <button className="text-teal-500 text-xl">🎤</button>
          </div>
        </div>

        {/* Phone Bottom */}
        <div className="bg-black h-6 flex items-center justify-center">
          <div className="w-32 h-1 bg-gray-900 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
