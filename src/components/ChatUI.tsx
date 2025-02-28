import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, MinusSquare, Loader, Upload } from 'lucide-react';

const ChatUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm HumbleHands support assistant. How can I help you today? You can ask me about donations, NGOs, our platform, or how to get involved.", 
      sender: 'bot' 
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessageId = Date.now();
    setMessages(prevMessages => [
      ...prevMessages,
      { id: userMessageId, text: newMessage, sender: 'user' }
    ]);
    setNewMessage('');
    setIsLoading(true);

    try {
      // Call API to get bot response with session info
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: newMessage,
          sessionId: sessionId,
          currentStep: currentStep
        })
      });

      const data = await response.json();
      
      // Save session information
      if (data.sessionId) {
        setSessionId(data.sessionId);
      }
      
      if (data.currentStep) {
        setCurrentStep(data.currentStep);
      }
      
      // Add bot response
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          id: userMessageId + 1, 
          text: data.response || "I'm sorry, I couldn't process your request. Please try again.", 
          sender: 'bot' 
        }
      ]);
      
      // Check if donation request is complete
      if (data.complete) {
        // Reset the session after completion
        setSessionId(null);
        setCurrentStep(null);
      }
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { 
          id: userMessageId + 1, 
          text: "Sorry, there was an error processing your message. Please try again later.", 
          sender: 'bot' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      <button 
        onClick={toggleChat}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-all duration-300"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className={`absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${isMinimized ? 'h-14' : 'h-96'}`}>
          {/* Chat header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-semibold">HumbleHands Support</h3>
            <div className="flex space-x-2">
              <button onClick={minimizeChat} className="hover:text-blue-200">
                <MinusSquare size={18} />
              </button>
              <button onClick={toggleChat} className="hover:text-blue-200">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat messages */}
          {!isMinimized && (
            <>
              <div className="h-72 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`mb-3 max-w-3/4 ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
                  >
                    <div 
                      className={`p-3 rounded-lg inline-block ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-gray-200 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center text-gray-500 ml-2">
                    <Loader size={16} className="animate-spin mr-2" />
                    <span>Typing...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t">
                <div className="flex">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow px-3 py-2 rounded-l-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
                    disabled={isLoading}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatUI;