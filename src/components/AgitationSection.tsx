import React from 'react';

const AgitationSection: React.FC = () => {
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
      title: 'MISTAKE #3: The $200+ Clinic "Solution"',
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
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Here's What Most Parents Get Wrong About Head Lice...
        </h2>
        <p className="text-2xl text-orange-500 text-center mb-12 font-semibold">
          (And Why Google Actually Makes It WORSE)
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mistakes.map((mistake, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg text-center border-t-4 border-orange-500 hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl mb-4">{mistake.icon}</div>
              <h3 className="text-orange-500 font-bold text-xl mb-4">{mistake.title}</h3>
              <p className="text-gray-600 leading-relaxed">{mistake.description}</p>
            </div>
          ))}
        </div>

        {/* Shocking Truth with NEW STATISTICS */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-10 rounded-3xl border-2 border-orange-500">
          <h3 className="text-3xl text-orange-500 font-bold text-center mb-8">
            The Shocking Truth About Lice (Based on Recent Research)
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { 
                stat: 'Up to 65%', 
                text: 'of lice are now resistant', 
                subtext: 'to common drugstore treatments - that\'s why they keep failing!' 
              },
              { 
                stat: 'Only 57.5%', 
                text: 'of suspected cases', 
                subtext: 'are correctly identified - most parents are treating the wrong thing' 
              },
              { 
                stat: 'Significant', 
                text: 'stress & anxiety reported', 
                subtext: 'by parents due to misinformation and repeated treatment failures' 
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">{item.stat}</div>
                <div className="text-gray-800 font-semibold mb-2">{item.text}</div>
                <div className="text-gray-600 text-sm">{item.subtext}</div>
              </div>
            ))}
          </div>

          <p className="text-xl text-gray-800 font-semibold text-center mb-8">
            You're not a bad parent. You're dealing with a $50 million myth industry that profits from your panic.
          </p>

          {/* Research-Based Reality Check */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-red-500 mb-8">
            <h4 className="text-xl font-bold text-red-800 mb-4">What Research Actually Shows:</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-bold text-gray-800 mb-2">❌ What DOESN'T Work (Science-Backed):</h5>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Mayonnaise and oils (no scientific support)</li>
                  <li>• Most drugstore treatments (up to 65% resistance rate)</li>
                  <li>• Heat treatments (dangerous and ineffective)</li>
                  <li>• Hiding the problem (makes spread worse)</li>
                  <li>• Cutting hair short (eggs stay close to scalp)</li>
                  <li>• Prevention products (no proven preventatives exist)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-gray-800 mb-2">✅ What DOES Work (Evidence-Based):</h5>
                <ul className="text-gray-700 space-y-1 text-sm">
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

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                stars: '★★★★★',
                quote: 'I wish I found this FIRST instead of wasting $200 on treatments that didn\'t work. This method cleared my twin boys in 24 hours!',
                author: 'Andrea M., Phoenix, AZ'
              },
              {
                stars: '★★★★★',
                quote: 'Three kids all got lice from school. Every drugstore treatment failed. This enzyme method worked on all three in 48 hours. AMAZING.',
                author: 'Kevin & Sarah L., Denver, CO'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-green-500">
                <div className="text-yellow-400 text-xl mb-3">{testimonial.stars}</div>
                <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
                <div className="text-gray-600 font-semibold">{testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgitationSection;