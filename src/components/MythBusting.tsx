import React from 'react';

const MythBusting: React.FC = () => {
  const myths = [
    {
      title: 'Lice Only Infest Dirty Hair',
      myth: 'Poor hygiene causes lice infestations',
      reality: 'FACT: Lice can infest any hair regardless of cleanliness. They are equally comfortable on clean or dirty hair. Anyone can get lice - it has nothing to do with hygiene or parenting.',
      icon: '🧼'
    },
    {
      title: 'Mayonnaise and Home Remedies Work',
      myth: 'Kitchen ingredients can suffocate lice',
      reality: 'FACT: Mayonnaise is porous and takes up to 8 hours to suffocate lice, making it ineffective and messy. Research shows little to no scientific support for most home remedies.',
      icon: '🥄'
    },
    {
      title: 'Over-the-Counter Treatments Always Work',
      myth: 'Drugstore treatments are reliable solutions',
      reality: 'FACT: Up to 65% of head lice have developed resistance to common OTC pyrethroid treatments, leading to treatment failures and persistent infestations.',
      icon: '💊'
    },
    {
      title: 'Cutting Hair Short Eliminates Lice',
      myth: 'Short hair prevents or cures lice',
      reality: 'FACT: Hair length does not prevent lice; eggs are glued close to the scalp regardless of length. Proper combing and treatment are essential.',
      icon: '✂️'
    },
    {
      title: 'Special Products Can Prevent Lice',
      myth: 'Preventative shampoos and sprays work',
      reality: 'FACT: No scientifically proven preventative treatments exist. Prevention relies on early detection and proper treatment protocols.',
      icon: '🛡️'
    },
    {
      title: 'All Suspected Cases Are Actually Lice',
      myth: 'If you think it\'s lice, it probably is',
      reality: 'FACT: Only about 57.5% of suspected lice cases are correctly identified, causing confusion and ineffective treatments for nearly half of all cases.',
      icon: '🔍'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          STOP Falling for These Expensive Lies
        </h2>
        <p className="text-xl text-orange-500 text-center mb-12 font-semibold">
          The $500 million "lice treatment" industry is built on myths that keep you buying products that DON'T WORK
        </p>

        {/* Research Alert */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="text-3xl mr-4">🚨</div>
            <h3 className="text-xl font-bold text-red-800">What Research Actually Shows</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-red-300">
              <h4 className="font-bold text-red-700 mb-2">The Treatment Failure Problem:</h4>
              <p className="text-red-600 text-sm">
                <strong>Up to 65% of head lice</strong> have developed resistance to common over-the-counter 
                pyrethroid treatments, leading to treatment failures and persistent infestations.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-red-300">
              <h4 className="font-bold text-red-700 mb-2">The Misidentification Problem:</h4>
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
              <div className="text-4xl mb-4 text-center">{myth.icon}</div>
              <h3 className="text-red-500 font-bold text-xl mb-4">❌ MYTH: {myth.title}</h3>
              <p className="text-gray-600 mb-4">
                <strong>People Think:</strong> {myth.myth}
              </p>
              <p className="text-gray-800 font-semibold">
                <strong>{myth.reality}</strong>
              </p>
            </div>
          ))}
        </div>

        {/* Research-Based Reality Check */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
            What Parents Need to Know (Based on Research)
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-blue-700 mb-3">❌ DON'T Do This (Research Shows These Fail):</h4>
              <ul className="text-blue-600 space-y-2 text-sm">
                <li>• Don't panic or overreact - stress makes everything harder</li>
                <li>• Don't rely on home remedies like mayonnaise or oils - they're ineffective</li>
                <li>• Don't hide infestations due to stigma - open communication helps prevent spread</li>
                <li>• Don't assume drugstore treatments will work - 65% resistance rate</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-blue-700 mb-3">✅ DO This Instead (Evidence-Based Approach):</h4>
              <ul className="text-blue-600 space-y-2 text-sm">
                <li>• Remember: lice don't spread disease - they're a nuisance, not a health hazard</li>
                <li>• Get proper identification first - avoid the 42.5% misdiagnosis rate</li>
                <li>• Use systematic wet combing with quality tools</li>
                <li>• Follow proven protocols that address the complete lifecycle</li>
              </ul>
            </div>
          </div>
        </div>

        {/* What Actually Works */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-10 rounded-3xl shadow-2xl text-center">
          <h3 className="text-3xl font-bold mb-6">Here's What Research Shows Actually Works:</h3>
          <p className="text-2xl mb-6">Proper identification + systematic wet combing + quality tools + follow-up protocols</p>
          <p className="text-xl mb-6 opacity-90">
            <strong>The same evidence-based methods $350+ lice clinics use</strong> - but you can learn them for $27 and do it at home tonight.
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