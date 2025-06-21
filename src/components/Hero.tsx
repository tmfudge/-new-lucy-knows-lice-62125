import React from 'react';
import { Star, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface HeroProps {
  onPurchase: () => void;
}

const Hero: React.FC<HeroProps> = ({ onPurchase }) => {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Compact Logo */}
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-blue-500 overflow-hidden">
          <img 
            src="/Lucy Know Lice Logo 500x500.png" 
            alt="Lucy Knows Head Lice Logo" 
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="text-center font-bold">
                    <div class="text-orange-500 text-sm md:text-base mb-1">LUCY</div>
                    <div class="text-gray-700 text-xs md:text-sm">KNOWS</div>
                    <div class="text-green-600 text-sm md:text-base mt-1">LICE</div>
                  </div>
                `;
              }
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Main Headline Section */}
          <div className="lg:col-span-2">
            {/* Head Lice Specific Alert */}
            <div className="bg-blue-500 text-white px-4 py-2 rounded-full inline-block mb-4 font-bold text-sm md:text-base">
              🎯 HEAD LICE SPECIALIST - Not Body or Pubic Lice
            </div>

            {/* Main Headline with Strong Visual Hierarchy */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              <span className="text-red-600">STOP!</span>{' '}
              <span className="text-gray-800">Before You Google</span>{' '}
              <span className="text-orange-500 underline decoration-4 decoration-orange-300">"Head Lice Treatment"</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-bold mb-6 leading-tight">
              You're About to Waste <span className="text-red-600">Hours</span>, 
              Stress Yourself Out, and Probably <span className="text-red-600">Make It Worse</span>
            </p>

            {/* Value Proposition */}
            <div className="bg-white p-6 rounded-2xl shadow-xl mb-6 border-l-4 border-green-500">
              <h3 className="text-orange-500 text-xl md:text-2xl font-bold mb-4">
                What if there's a FASTER way to eliminate HEAD lice that actually works?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Skip the $350+ head lice clinic visits',
                  'No more failed drugstore treatments',
                  'Get your child back to school FAST',
                  'Learn head lice methods that work in 24-48 hours'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-gray-700 font-semibold">1,000+ Parents Helped</span>
              </div>
              <div className="flex items-center text-green-600 font-bold">
                <Clock className="w-5 h-5 mr-1" />
                24-48 Hour Results
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-2xl border-4 border-orange-500 relative">
              {/* Urgency Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                LIMITED TIME: 87% OFF
              </div>
              
              <div className="text-center pt-4">
                <div className="text-gray-400 line-through text-xl mb-2">$220</div>
                <div className="text-5xl font-extrabold text-green-600 mb-2">$27</div>
                <div className="text-orange-500 font-bold text-lg mb-6">Just $27 Today!</div>
                
                <button 
                  onClick={onPurchase}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-4 px-6 rounded-full text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 mb-4"
                >
                  Get Head Lice Solution Now
                </button>
                
                <div className="text-green-600 font-semibold text-sm mb-4">
                  ✓ Instant Access ✓ 14-Day Guarantee ✓ Works on Any Device
                </div>

                {/* Urgency Elements */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center justify-center text-yellow-800 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Every hour you wait, head lice multiply!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Head Lice Clarification Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-center text-blue-800 text-xl font-bold mb-4">
            🎯 Important: This is About HEAD LICE Only
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-4 rounded-xl border-2 border-green-500">
              <div className="text-3xl mb-2">✅</div>
              <h4 className="font-bold text-green-800 mb-2">HEAD LICE</h4>
              <p className="text-green-700 text-sm">
                Found on scalp and hair. What this survival kit treats. 
                Common in school-age children.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border-2 border-red-300">
              <div className="text-3xl mb-2">❌</div>
              <h4 className="font-bold text-red-800 mb-2">BODY LICE</h4>
              <p className="text-red-700 text-sm">
                Live in clothing/bedding. Different treatment needed. 
                See healthcare provider.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border-2 border-red-300">
              <div className="text-3xl mb-2">❌</div>
              <h4 className="font-bold text-red-800 mb-2">PUBIC LICE</h4>
              <p className="text-red-700 text-sm">
                Found in pubic area. Different species entirely. 
                Requires medical treatment.
              </p>
            </div>
          </div>
          <p className="text-center text-blue-700 font-medium mt-4">
            <strong>This educational resource is specifically designed for HEAD LICE elimination only.</strong>
          </p>
        </div>

        {/* Quick Success Stories - Compact */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
          <h3 className="text-center text-green-700 text-lg font-bold mb-4">
            Real Head Lice Success Stories from Parents (Just Like You)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: '⏰',
                title: '"24 Hours - Head Lice Gone!"',
                quote: 'Head lice eliminated by next morning. Back at school Thursday.',
                author: 'Karen M.'
              },
              {
                icon: '💰',
                title: '"Saved $400+"',
                quote: 'Was about to book $450 head lice clinic. This worked for $62 total!',
                author: 'James T.'
              },
              {
                icon: '👨‍👩‍👧‍👦',
                title: '"All 3 Kids Clear"',
                quote: 'Triplets all had head lice. Cleared all three in 48 hours.',
                author: 'Monica R.'
              }
            ].map((story, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-md text-center">
                <div className="text-2xl mb-2">{story.icon}</div>
                <div className="font-bold text-green-700 text-sm mb-1">{story.title}</div>
                <div className="text-gray-600 text-xs mb-2">"{story.quote}"</div>
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