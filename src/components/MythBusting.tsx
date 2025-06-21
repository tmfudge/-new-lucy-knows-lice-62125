import React from 'react';

const MythBusting: React.FC = () => {
  const myths = [
    {
      title: '"Lice Repellent" Shampoos',
      myth: 'Tea tree oil, rosemary, lavender prevent lice',
      reality: 'Zero scientific evidence. Lice don\'t care about aromatherapy. If this worked, why do schools still have outbreaks?'
    },
    {
      title: 'Home "Suffocation" Methods',
      myth: 'Mayonnaise, olive oil, Vaseline kill lice',
      reality: 'Research shows little to no scientific support. Lice can hold their breath for HOURS. You just waste time while they multiply.'
    },
    {
      title: 'Drugstore "Super Strength" Treatments',
      myth: 'Stronger chemicals = better results',
      reality: 'Up to 65% failure rate due to resistance. You\'re using harsh chemicals on your child\'s scalp for nothing.'
    },
    {
      title: 'Plastic "Lice Combs"',
      myth: 'Any fine-tooth comb works the same',
      reality: 'Plastic combs miss 80% of eggs. They\'re too flexible to grip nits properly. You need metal teeth for proper removal.'
    },
    {
      title: '"Natural" Heat Treatments',
      myth: 'Hair dryers and flat irons kill lice',
      reality: 'You\'ll burn your child\'s scalp before reaching temperatures that kill lice eggs. Dangerous and ineffective.'
    },
    {
      title: 'Vinegar "Egg Dissolving" Treatment',
      myth: 'Acid dissolves the glue holding nits to hair',
      reality: 'Old wives\' tale with zero scientific backing. Nits are designed to survive everything - including your kitchen pantry.'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          STOP Falling for These Expensive Lies
        </h2>
        <p className="text-xl text-orange-500 text-center mb-12 font-semibold">
          The $50 million "lice prevention" industry is built on myths that keep you buying products that DON'T WORK
        </p>

        {/* Research Alert */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="text-3xl mr-4">🚨</div>
            <h3 className="text-xl font-bold text-red-800">Research Alert: Why Most Treatments Fail</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-red-300">
              <h4 className="font-bold text-red-700 mb-2">The Resistance Problem:</h4>
              <p className="text-red-600 text-sm">
                <strong>Up to 65% of head lice</strong> have developed resistance to common over-the-counter 
                pyrethroid treatments, leading to treatment failures and persistent infestations.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-red-300">
              <h4 className="font-bold text-red-700 mb-2">The Identification Problem:</h4>
              <p className="text-red-600 text-sm">
                <strong>Only about 57.5%</strong> of suspected lice cases are correctly identified, 
                causing confusion and ineffective treatments for nearly half of all cases.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {myths.map((myth, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-red-500 hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-red-500 font-bold text-xl mb-4">❌ {myth.title}</h3>
              <p className="text-gray-600 mb-4">
                <strong>The Myth:</strong> {myth.myth}
              </p>
              <p className="text-gray-800 font-semibold">
                <strong>The Reality:</strong> {myth.reality}
              </p>
            </div>
          ))}
        </div>

        {/* What Actually Works */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-10 rounded-3xl shadow-2xl text-center">
          <h3 className="text-3xl font-bold mb-6">Here's What Research Shows Actually Works:</h3>
          <p className="text-2xl mb-6">Proper identification + systematic wet combing + quality tools + follow-up protocols</p>
          <p className="text-xl mb-6 opacity-90">
            <strong>The same evidence-based methods $200+ lice clinics use</strong> - but you can learn them for $27 and do it at home tonight.
          </p>
          
          <div className="bg-white bg-opacity-20 p-6 rounded-2xl">
            <div className="text-orange-100 text-lg mb-2">★★★★★</div>
            <p className="text-lg italic mb-3">
              "My pediatrician said this is exactly what they recommend now. Why didn't anyone tell me this before I spent $400 at the lice clinic?"
            </p>
            <div className="text-orange-100 opacity-80">- Dr. Sarah K. & Tom K., Dallas, TX</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MythBusting;