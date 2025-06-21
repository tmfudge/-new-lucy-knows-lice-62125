import React from 'react';
import { Star, Clock } from 'lucide-react';

interface HeroProps {
  onPurchase: () => void;
}

const Hero: React.FC<HeroProps> = ({ onPurchase }) => {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Logo */}
        <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 md:mb-8 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-blue-500 overflow-hidden">
          <img 
            src="/Lucy Know Lice Logo 500x500.png" 
            alt="Lucy Knows Lice Logo" 
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback to text-based logo if image fails
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="text-center font-bold">
                    <div class="text-orange-500 text-lg md:text-xl mb-1">LUCY</div>
                    <div class="text-gray-700 text-sm md:text-base">KNOWS</div>
                    <div class="text-green-600 text-lg md:text-xl mt-1">LICE</div>
                    <div class="text-2xl md:text-3xl mt-2">🐛</div>
                  </div>
                `;
              }
            }}
          />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 text-center mb-4 md:mb-6 leading-tight px-2">
          STOP! Before You Google "How to Get Rid of Lice"...
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 text-center mb-6 md:mb-8 font-medium max-w-2xl mx-auto px-2">
          You're About to Waste Hours, Stress Yourself Out, and Probably Make It Worse
        </p>

        {/* Benefits Box */}
        <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl mb-8 md:mb-10 max-w-2xl mx-auto border-t-4 border-green-500">
          <h3 className="text-orange-500 text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">
            What if I told you there's a FASTER way?
          </h3>
          <ul className="space-y-3 md:space-y-4 text-base md:text-lg">
            {[
              'No more 3AM panic Googling sessions',
              'Skip the $350+ lice clinic visits',
              'Stop the failed drugstore treatments',
              'Get your child back to school FAST',
              'Learn the methods that work in 24-48 hours'
            ].map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 text-xl md:text-2xl font-bold mr-3 md:mr-4 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-6 md:mb-8">
          <button 
            onClick={onPurchase}
            className="bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-4 md:py-6 px-6 md:px-10 rounded-full text-lg md:text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-wide w-full max-w-sm md:max-w-none md:w-auto"
          >
            YES! Give Me the REAL Solution
          </button>
          <div className="mt-3 md:mt-4 text-green-600 font-semibold text-base md:text-lg">
            Instant Access • Just $27 • 14-Day Guarantee
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-8 md:mb-12 text-sm md:text-base">
          <div className="text-center">
            <div className="flex items-center justify-center text-green-600 font-bold">
              <Star className="w-4 h-4 md:w-5 md:h-5 mr-1" />
              Highly Rated
            </div>
            <div className="text-gray-600 text-xs md:text-sm">User Reports</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-orange-500 font-bold">
              <Clock className="w-4 h-4 md:w-5 md:h-5 mr-1" />
              Fast Results
            </div>
            <div className="text-gray-600 text-xs md:text-sm">Typical Timeline</div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 md:p-10 rounded-2xl md:rounded-3xl border-2 border-orange-200">
          <h3 className="text-center text-orange-500 text-xl md:text-2xl font-bold mb-6 md:mb-8">
            Real Results from Real Parents
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                icon: '⏰',
                title: '"24 Hours - Done!"',
                quote: 'Followed the plan exactly. Lice gone by the next morning. My kid was back at school Thursday.',
                author: 'Karen M.'
              },
              {
                icon: '💰',
                title: '"Saved $400+"',
                quote: 'Was about to book a $450 clinic visit. This method worked for $62 total. Incredible!',
                author: 'James & Lisa T.'
              },
              {
                icon: '👨‍👩‍👧‍👦',
                title: '"All 3 Kids Clear"',
                quote: 'Triplets all got lice from daycare. This system cleared all three in 48 hours. No re-infection.',
                author: 'Monica R.'
              },
              {
                icon: '📚',
                title: '"Back to School Fast"',
                quote: 'Found lice Sunday night, needed clearance Monday. This emergency guide worked perfectly!',
                author: 'Rachel D.'
              }
            ].map((story, index) => (
              <div key={index} className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg text-center">
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">{story.icon}</div>
                <div className="font-bold text-base md:text-lg mb-2" style={{ color: index % 2 === 0 ? '#ff6b35' : '#38a169' }}>
                  {story.title}
                </div>
                <div className="text-gray-600 text-sm mb-2">{story.quote}</div>
                <div className="text-gray-500 text-xs">- {story.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;