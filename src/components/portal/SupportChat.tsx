import React, { useState } from 'react';
import { MessageCircle, Send, Phone, Mail, Clock, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'support' | 'bot';
  content: string;
  timestamp: Date;
  sender?: string;
}

const SupportChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm Lucy's AI assistant. I can help with quick questions about lice treatment. For complex issues, I'll connect you with our human support team. How can I help you today?",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      type: 'user',
      content: "I found lice on my daughter but I'm not sure if the treatment is working. It's been 2 days.",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: '3',
      type: 'support',
      content: "Hi! This is Sarah from Lucy's support team. It's completely normal to feel uncertain after 2 days. Can you tell me what you're seeing? Are there still live lice moving around, or are you seeing dead ones?",
      timestamp: new Date(Date.now() - 180000),
      sender: 'Sarah M.'
    },
    {
      id: '4',
      type: 'user',
      content: "I see some dead ones when I comb, but I'm worried I might have missed some areas. Should I retreat?",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: '5',
      type: 'support',
      content: "Seeing dead lice is actually a great sign! It means the treatment is working. The key question is: do you see any LIVE lice moving around? If not, you're on track. Day 3 is your critical recheck day - that's when you'll know for sure if you need to retreat.",
      timestamp: new Date(Date.now() - 60000),
      sender: 'Sarah M.'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickResponses = [
    "Is the treatment working?",
    "When should I retreat?",
    "How do I know if they're all gone?",
    "My child won't stop scratching",
    "Should I check other family members?",
    "What if I find lice again?"
  ];

  const supportTeam = [
    {
      name: 'Sarah M.',
      role: 'Senior Lice Specialist',
      status: 'online',
      avatar: '👩‍⚕️',
      specialties: ['Treatment protocols', 'Family screening']
    },
    {
      name: 'Mike R.',
      role: 'Parent Support Specialist',
      status: 'online',
      avatar: '👨‍💼',
      specialties: ['Anxiety support', 'School issues']
    },
    {
      name: 'Dr. Lisa K.',
      role: 'Medical Consultant',
      status: 'away',
      avatar: '👩‍⚕️',
      specialties: ['Medical questions', 'Allergic reactions']
    }
  ];

  const faqItems = [
    {
      question: "How long does treatment take?",
      answer: "Most families see complete elimination within 24-48 hours when following our protocol correctly."
    },
    {
      question: "Is it normal to see dead lice after treatment?",
      answer: "Yes! Dead lice are a sign the treatment is working. They'll fall out during combing over the next few days."
    },
    {
      question: "When should I check other family members?",
      answer: "Check everyone within 24 hours of finding the first case. Focus on those who share beds or have close contact."
    },
    {
      question: "Can lice come back after treatment?",
      answer: "Lice can return if you miss the 21-day recheck cycle or if there's reexposure. Following our calendar prevents this."
    }
  ];

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'support',
        content: "Thanks for your message! I can see you're dealing with a common concern. Let me help you with that right away. Based on what you've described, here's what I recommend...",
        timestamp: new Date(),
        sender: 'Sarah M.'
      };
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const sendQuickResponse = (response: string) => {
    setNewMessage(response);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="flex items-center mb-4">
          <MessageCircle className="w-8 h-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-green-800">Support Chat</h1>
        </div>
        <p className="text-green-700 text-lg">
          Get instant help from our lice specialists. We're here to support you through every step.
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
                    L
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Lucy's Support Team</h3>
                    <p className="text-sm text-green-600">● Online - Average response: 2 minutes</p>
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
                      : message.type === 'bot'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {message.type !== 'user' && (
                      <div className="flex items-center mb-1">
                        {message.type === 'bot' ? (
                          <Bot className="w-4 h-4 mr-2" />
                        ) : (
                          <User className="w-4 h-4 mr-2" />
                        )}
                        <span className="text-xs font-medium">
                          {message.type === 'bot' ? 'AI Assistant' : message.sender}
                        </span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span className="text-xs font-medium">Sarah M.</span>
                    </div>
                    <div className="flex space-x-1 mt-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Responses */}
            <div className="border-t border-gray-200 p-4">
              <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => sendQuickResponse(response)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
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
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Support Team */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Support Team</h3>
            <div className="space-y-4">
              {supportTeam.map((member, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-2xl mr-3">{member.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                      <div className={`w-2 h-2 rounded-full ml-2 ${
                        member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      {member.specialties.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Options */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Other Ways to Reach Us</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Phone className="w-5 h-5 text-blue-500 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Phone Support</div>
                  <div className="text-sm text-gray-600">1-800-LUCY-HELP</div>
                </div>
              </button>
              
              <button className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-5 h-5 text-green-500 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Email Support</div>
                  <div className="text-sm text-gray-600">help@lucyknowslice.com</div>
                </div>
              </button>
              
              <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Clock className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <div className="font-medium text-blue-800">Support Hours</div>
                  <div className="text-sm text-blue-600">24/7 Chat • 8AM-8PM Phone</div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Answers</h3>
            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <details key={index} className="group">
                  <summary className="font-medium text-gray-900 cursor-pointer hover:text-green-600 transition-colors">
                    {item.question}
                  </summary>
                  <p className="text-sm text-gray-600 mt-2 pl-4">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;