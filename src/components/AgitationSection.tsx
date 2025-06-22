import React from 'react';

interface AgitationSectionProps {
  onPurchase: (customClassName?: string) => React.ReactNode;
}

const AgitationSection: React.FC<AgitationSectionProps> = ({ onPurchase }) => {
  const mistakes = [
    {
      icon: '😰',
      title: 'MISTAKE #1: Panic First, Plan Never',
      description: 'You find lice at 10:47 PM (like I did) and immediately go into crisis mode. No strategy, just pure panic buying whatever CVS has on the shelf.'
    },
    {
      icon: '🔍',
      title: 'MISTAKE #2: Trusting Dr. Google',
      description: 'You\'ll find 47 different "solutions" online. Mayo, tea tree oil, suffocating with plastic bags. Most don\'t work. Some are dangerous.'
    },
    {
      icon: '💸',
      title: 'MISTAKE #3: The $350+ Clinic "Solution"',
      description: 'Desperate parents spend hundreds at lice removal services. They work, but your wallet takes a massive hit for something you can handle at home.'
    },
    {
      icon: '🔄',
      title: 'MISTAKE #4: Missing the Re-Infestation Cycle',
      description: 'You think you\'re done, then 2 weeks later... they\'re back. Because you missed the critical 21-day follow-up protocol.'
    },
    {
      icon: '😢',
      title: 'MISTAKE #5: The Shame Spiral',
      description: 'You think you\'re a "bad parent" because your kid got lice. The embarrassment makes you hide instead of getting help quickly.'
    },
    {
      icon: '⏰',
      title: 'MISTAKE #6: Waiting Too Long',
      description: 'Every day you wait, lice multiply. What starts as "a few bugs" becomes a full-blown infestation that\'s 10x harder to treat.'
    }
  ];

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4 md:mb-6 px-2">
          Here's What Most Parents Get Wrong About Head Lice...
        </h2>
        <p className="text-xl md:text-2xl text-orange-500 text-center mb-8 md:mb-12 font-semibold px-2">
          (And Why Google Actually Makes It WORSE)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {mistakes.map((mistake, index) => (
            <div key={index} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg text-center border-t-4 border-orange-500 hover:-translate-y-2 transition-transform duration-300">
              <div className="text-4xl md:text-5xl mb-3 md:mb-4">{mistake.icon}</div>
              <h3 className="text-orange-500 font-bold text-lg md:text-xl mb-3 md:mb-4">{mistake.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{mistake.description}</p>
            </div>
          ))}
        </div>

        {/* Shocking Truth with ALL NEW STATISTICS */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 md:p-10 rounded-2xl md:rounded-3xl border-2 border-orange-500">
          <h3 className="text-2xl md:text-3xl text-orange-500 font-bold text-center mb-6 md:mb-8">
            The Shocking Truth About Lice (Latest Research Data)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {[
              { 
                stat: '1 in 5', 
                text: 'kids may be infested', 
                subtext: 'at any given moment - that\'s 20% of all children!' 
              },
              { 
                stat: 'Up to 65%', 
                text: 'of lice are now resistant', 
                subtext: 'to common drugstore treatments - that\'s why they keep failing!' 
              },
              { 
                stat: 'Only 57.5%', 
                text: 'of suspected cases', 
                subtext: 'are correctly identified - most parents are treating the wrong thing' 
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">{item.stat}</div>
                <div className="text-gray-800 font-semibold mb-2 text-sm md:text-base">{item.text}</div>
                <div className="text-gray-600 text-xs md:text-sm">{item.subtext}</div>
              </div>
            ))}
          </div>

          {/* NEW: Industry Money Stats */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
            <h4 className="text-lg md:text-xl font-bold text-red-800 mb-4 text-center">💰 The $500 Million Lice Industry</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white p-3 md:p-4 rounded-lg border border-red-300 text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600 mb-2">$500+ Million</div>
                <div className="text-red-700 font-semibold text-sm md:text-base">Spent annually in the U.S.</div>
                <div className="text-red-600 text-xs md:text-sm">fighting lice with mostly ineffective methods</div>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-lg border border-red-300 text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600 mb-2">Summer Spike</div>
                <div className="text-red-700 font-semibold text-sm md:text-base">Camp outbreaks surge</div>
                <div className="text-red-600 text-xs md:text-sm">due to close contact and shared spaces</div>
              </div>
            </div>
            <p className="text-red-700 text-center mt-4 font-medium text-sm md:text-base">
              This massive industry profits from keeping you confused and buying products that don't work!
            </p>
          </div>

          <p className="text-lg md:text-xl text-gray-800 font-semibold text-center mb-6 md:mb-8 px-2">
            You're not a bad parent. You're dealing with a $500+ million myth industry that profits from your panic.
          </p>

          {/* Research-Based Reality Check */}
          <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg border-l-4 border-red-500 mb-6 md:mb-8">
            <h4 className="text-lg md:text-xl font-bold text-red-800 mb-4">What Research Actually Shows:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h5 className="font-bold text-gray-800 mb-2 text-sm md:text-base">❌ What DOESN'T Work (Science-Backed):</h5>
                <ul className="text-gray-700 space-y-1 text-xs md:text-sm">
                  <li>• Mayonnaise and oils (no scientific support)</li>
                  <li>• Most drugstore treatments (up to 65% resistance rate)</li>
                  <li>• Heat treatments (dangerous and ineffective)</li>
                  <li>• Hiding the problem (makes spread worse)</li>
                  <li>• Cutting hair short (eggs stay close to scalp)</li>
                  <li>• Prevention products (no proven preventatives exist)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-gray-800 mb-2 text-sm md:text-base">✅ What DOES Work (Evidence-Based):</h5>
                <ul className="text-gray-700 space-y-1 text-xs md:text-sm">
                  <li>• Proper identification (avoid the 42.5% error rate)</li>
                  <li>• Quality metal combs (systematic removal)</li>
                  <li>• Open communication (prevents spread)</li>
                  <li>• Staying calm (reduces family stress)</li>
                  <li>• Systematic wet combing protocols</li>
                  <li>• Early detection and proper treatment</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Summer Camp Alert */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
            <h4 className="text-lg md:text-xl font-bold text-yellow-800 mb-4 text-center">🏕️ Summer Camp Parents: Be Prepared!</h4>
            <p className="text-yellow-700 text-center text-sm md:text-base">
              <strong>Lice outbreaks spike during summer camps</strong> due to close contact and shared spaces. 
              Don't wait until you get "the call" from camp - be prepared with the knowledge you need!
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            {[
              {
                stars: '★★★★★',
                quote: 'I wish I found this FIRST instead of wasting $350 on treatments that didn\'t work. This method cleared my twin boys in 24 hours!',
                author: 'Andrea M., Phoenix, AZ'
              },
              {
                stars: '★★★★★',
                quote: 'Three kids all got lice from summer camp. Every drugstore treatment failed. This enzyme method worked on all three in 48 hours. AMAZING.',
                author: 'Kevin & Sarah L., Denver, CO'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg border-t-4 border-green-500">
                <div className="text-yellow-400 text-lg md:text-xl mb-3">{testimonial.stars}</div>
                <p className="text-gray-700 italic mb-4 text-sm md:text-base">{testimonial.quote}</p>
                <div className="text-gray-600 font-semibold text-xs md:text-sm">{testimonial.author}</div>
              </div>
            ))}
          </div>

          {/* Strategic CTA After Agitation */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-3xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to STOP Making These Expensive Mistakes?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Don't waste another day (or dollar) on methods that don't work. Get the proven system now.
            </p>
            <div className="mb-4">
              {onPurchase('inline-block')}
            </div>
            <div className="text-red-100 text-sm">
              ✓ Instant Access ✓ 14-Day Guarantee ✓ Stop the Confusion Tonight
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgitationSection;