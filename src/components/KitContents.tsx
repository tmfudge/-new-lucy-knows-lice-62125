import React from 'react';
import { AlertTriangle, Target, Calendar, Users, CheckSquare, Heart } from 'lucide-react';

interface KitContentsProps {
  onPurchase: () => void;
}

const KitContents: React.FC<KitContentsProps> = ({ onPurchase }) => {
  const contents = [
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: 'Emergency First Steps Guide',
      description: 'Exactly what to do in the first 5 minutes when you find lice. Stop the panic, start the solution. Includes the "calm checklist" that saves your sanity.',
      value: '$39'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'The REAL Treatment Protocol',
      description: 'The method that actually works (no harsh chemicals required). Step-by-step photos, exact products to buy, timing that matters. This is the system lice clinics don\'t want you to know.',
      value: '$59'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: '21-Day Recheck Calendar',
      description: 'The secret to making sure they NEVER come back. Most parents miss this crucial follow-up period. Includes exact dates and what to look for.',
      value: '$27'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Family Screening & Prevention Plan',
      description: 'How to check everyone else (without the drama). Plus the prevention strategies that actually work to keep lice away for good.',
      value: '$33'
    },
    {
      icon: <CheckSquare className="w-8 h-8" />,
      title: 'Smart Cleaning Checklist',
      description: 'What actually needs cleaning (hint: not everything you think). Save hours with the room-by-room guide that focuses on what matters.',
      value: '$35'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Worry vs. Chill Guide',
      description: 'When to worry, when to relax. Anxiety stoppers and confidence builders so you can handle this like the capable parent you are.',
      value: '$27'
    }
  ];

  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Here's What You Get With Lucy's Survival Kit
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 font-medium">
          Everything you need to handle lice like a pro. No guesswork. No panic. Just results.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {contents.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-green-500 hover:-translate-y-2 transition-transform duration-300 relative">
              <div className="absolute top-4 right-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold line-through">
                {item.value}
              </div>
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-green-600 border-2 border-green-500">
                {item.icon}
              </div>
              <h3 className="text-gray-800 font-bold text-xl mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Box */}
        <div className="bg-white p-12 rounded-3xl shadow-2xl text-center border-4 border-green-500 max-w-2xl mx-auto relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-400 text-white px-8 py-3 rounded-full font-bold uppercase text-lg shadow-lg">
            87% OFF TODAY
          </div>
          
          <div className="text-2xl text-gray-400 line-through mb-4">Total Value: $220</div>
          <div className="text-6xl text-green-600 font-extrabold mb-4">$27</div>
          <div className="text-2xl text-orange-500 font-bold mb-8">That's 87% Off - Just $27!</div>
          
          <button 
            onClick={onPurchase}
            className="bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-4 px-8 rounded-full text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 mb-6"
          >
            Get My Survival Kit Now
          </button>
          
          <p className="text-gray-600 font-medium">
            ✓ Instant Download ✓ Works on Any Device ✓ 14-Day Guarantee
          </p>
        </div>
      </div>
    </section>
  );
};

export default KitContents;