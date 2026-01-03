import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
const [messages, setMessages] = useState<{ id: string; text: string; isUser: boolean }[]>([
  { id: '1', text: "Hello! How can I help you today?", isUser: false }
]);


const handleSendMessage = () => {
  if (!message.trim()) return;
  
  const newMessage = { 
    id: Date.now().toString(), // Generate a unique ID based on timestamp
    text: message, 
    isUser: true 
  };
  
  setMessages([...messages, newMessage]);
  setMessage('');
  
  // Simulate AI response
  setTimeout(() => {
    setMessages(prev => [...prev, { 
      id: (Date.now() + 1).toString(), // Generate a unique ID for the AI response
      text: "Thanks for your message! This is a demo response.", 
      isUser: false 
    }]);
  }, 1000);
};


  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-slate-800 rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-sm text-blue-100">Ask me anything about our services</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
{messages.map((msg) => (
  <div
    key={msg.id}
    className={`p-3 rounded-lg max-w-[85%] ${
      msg.isUser
        ? 'bg-blue-600 text-white ml-auto'
        : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
    }`}
  >
    {msg.text}
  </div>
))}

          </div>
          
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
