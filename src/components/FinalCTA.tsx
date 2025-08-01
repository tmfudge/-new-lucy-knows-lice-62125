import React from 'react';
import { Lock, Smartphone, CheckCircle, Star } from 'lucide-react';

interface FinalCTAProps {
  onPurchase: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onPurchase }) => {
  const trustSignals = [
    { icon: <Lock className="w-4 h-4 md:w-5 md:h-5" />, text: "Secure Checkout" },
    { icon: <Smartphone className="w-4 h-4 md:w-5 md:h-5" />, text: "Instant Access" },
    { icon: <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />, text: "14-Day Guarantee" },
    { icon: <Star className="w-4 h-4 md:w-5 md:h-5" />, text: "Highly Rated" }
  ];

  const stats = [
    { icon: "📊", text: "High Success Rate" },
    { icon: "⚡", text: "Fast Results Reported" },
    { icon: "💬", text: "1,500+ Happy Parents" },
    { icon: "🏆", text: "Educational Resource" }
  ];

  return (
    <section id="order" className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 px-2">Ready to End This Nightmare?</h2>
        <p className="text-xl md:text-2xl mb-8 md:mb-10 opacity-90 px-2">
          Join 1,000+ parents who chose the smart way to handle lice
        </p>

        <button 
          onClick={onPurchase}
          className="bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-4 md:py-6 px-8 md:px-12 rounded-full text-xl md:text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 mb-6 md:mb-8 w-full max-w-md md:max-w-none md:w-auto"
        >
          Get Lucy's Survival Kit - $27
        </button>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6 md:mb-8 text-sm md:text-base">
          {trustSignals.map((signal, index) => (
            <div key={index} className="flex items-center text-white opacity-90">
              {signal.icon}
              <span className="ml-2">{signal.text}</span>
            </div>
          ))}
        </div>

        <p className="text-lg md:text-xl mb-6 md:mb-8 italic opacity-90 px-2">
          Join 1,500+ parents who chose the smart way. Your child is counting on you to be their hero. This is your moment.
        </p>

        <div className="bg-white bg-opacity-10 p-4 md:p-6 rounded-2xl">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center text-white text-sm md:text-base">
                <span className="text-xl md:text-2xl mr-2">{stat.icon}</span>
                <span>{stat.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;