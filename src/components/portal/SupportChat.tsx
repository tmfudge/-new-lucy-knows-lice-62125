import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Phone, Mail, Clock, User, Bot, Loader } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SupportChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm Lucy's AI assistant, specially trained to help with lice treatment questions. I can provide guidance on treatment methods, answer questions about the process, and help troubleshoot any issues you're experiencing. How can I help you today?",
      timestamp: new Date(),
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickResponses = [
    "Is the treatment working?",
    "When should I retreat?",
    "How do I know if they're all gone?",
    "My child won't stop scratching",
    "Should I check other family members?",
    "What if I find lice again?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || newMessage.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          threadId: threadId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Update thread ID if this is the first message
      if (data.threadId && !threadId) {
        setThreadId(data.threadId);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Chat error:', error);
      setError(error instanceof Error ? error.message : 'Failed to send message');
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment, or contact our support team directly if the issue persists.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendQuickResponse = (response: string) => {
    sendMessage(response);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="flex items-center mb-4">
          <MessageCircle className="w-8 h-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-green-800">AI Support Chat</h1>
        </div>
        <p className="text-green-700 text-lg">
          Get instant help from Lucy's AI assistant, specially trained on lice treatment methods and protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gray-50 border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Lucy's AI Assistant</h3>
                    <p className="text-sm text-green-600">● Online - Specialized in lice treatment</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {message.type === 'assistant' && (
                      <div className="flex items-center mb-1">
                        <Bot className="w-4 h-4 mr-2" />
                        <span className="text-xs font-medium">Lucy's AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-green-600'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                    <div className="flex items-center">
                      <Bot className="w-4 h-4 mr-2" />
                      <span className="text-xs font-medium">Lucy's AI Assistant</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Error Display */}
            {error && (
              <div className="border-t border-gray-200 p-4 bg-red-50">
                <p className="text-red-600 text-sm">⚠️ {error}</p>
              </div>
            )}

            {/* Quick Responses */}
            <div className="border-t border-gray-200 p-4">
              <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => sendQuickResponse(response)}
                    disabled={isLoading}
                    className="text-xs bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 px-3 py-1 rounded-full transition-colors"
                  >
                    {response}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Ask me anything about lice treatment..."
                  disabled={isLoading}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={isLoading || !newMessage.trim()}
                  className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                >
                  {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* AI Assistant Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">About Lucy's AI Assistant</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-2xl mr-3">🤖</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Specialized Knowledge</h4>
                  <p className="text-sm text-gray-600">Trained specifically on lice treatment methods, protocols, and troubleshooting</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-2xl mr-3">⚡</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Instant Responses</h4>
                  <p className="text-sm text-gray-600">Get immediate answers to your lice treatment questions</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-2xl mr-3">🎯</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Personalized Help</h4>
                  <p className="text-sm text-gray-600">Tailored advice based on your specific situation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Need Human Support?</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-5 h-5 text-green-500 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Email Support</div>
                  <div className="text-sm text-gray-600">hello@lucyknowslice.com</div>
                </div>
              </button>
              
              <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Clock className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <div className="font-medium text-blue-800">AI Available 24/7</div>
                  <div className="text-sm text-blue-600">Human support: 8AM-8PM EST</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-800 mb-4">💡 Chat Tips</h3>
            <ul className="text-green-700 space-y-2 text-sm">
              <li>• Be specific about your situation</li>
              <li>• Mention what day of treatment you're on</li>
              <li>• Describe what you're seeing</li>
              <li>• Ask about next steps if unsure</li>
              <li>• Use the quick questions for common issues</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;