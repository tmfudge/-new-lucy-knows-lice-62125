import React from 'react';
import { AlertTriangle, DollarSign, Users, Clock } from 'lucide-react';

const UrgencySection: React.FC = () => {
  const urgencyPoints = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Every day you wait, lice multiply exponentially",
      description: "What's 10 bugs today becomes 100+ bugs next week"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "School notification deadlines",
      description: "Most schools require 24-48 hour clearance before return"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Family spread prevention", 
      description: "The longer you wait, the more family members get infected"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Financial protection",
      description: "Avoid the $350-$600 professional treatment costs"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-orange-50 to-yellow-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-orange-700 mb-6">
            Why You Need to Act TODAY
          </h2>
          <p className="text-xl text-orange-600 mb-8">
            The hidden costs of waiting vs. taking action now
          </p>
        </div>

        {/* Urgency Points */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {urgencyPoints.map((point, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-orange-500">
              <div className="flex items-start">
                <div className="text-orange-500 mr-4 mt-1">
                  {point.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industry Stats Alert */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-red-800 text-center mb-6">
            🚨 The $500+ Million Problem
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">$500+ Million</div>
              <div className="text-red-700 font-semibold">Spent annually in the U.S.</div>
              <div className="text-red-600 text-sm">on mostly ineffective treatments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">Summer Spike</div>
              <div className="text-red-700 font-semibold">Camp outbreaks surge</div>
              <div className="text-red-600 text-sm">close contact spreads lice fast</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">1 in 5</div>
              <div className="text-red-700 font-semibold">Kids may be infested</div>
              <div className="text-red-600 text-sm">at any given moment</div>
            </div>
          </div>
          <p className="text-red-700 text-center mt-6 text-lg font-medium">
            This massive industry profits from keeping you confused and buying products that don't work!
          </p>
        </div>

        {/* Summer Camp Special Alert */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-yellow-800 text-center mb-4">
            🏕️ Summer Camp Season Alert!
          </h3>
          <p className="text-yellow-700 text-center text-lg">
            <strong>Lice outbreaks spike during summer camps</strong> due to close contact and shared spaces. 
            Don't wait until you get "the call" from camp counselors - be prepared NOW with the knowledge you need!
          </p>
        </div>

        {/* Main CTA */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-300 text-center">
          <h3 className="text-2xl font-bold text-orange-700 mb-4">
            The truth is: Lice gets HARDER to treat the longer you wait.
          </h3>
          <p className="text-xl text-gray-700 mb-6">
            While parents spend $500+ million annually on treatments that fail, you can learn the methods that actually work for just $27.
          </p>
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <p className="text-orange-800 font-semibold text-lg">
              Don't become another statistic in the $500 million lice industry. 
              Get the education that ends this nightmare tonight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;