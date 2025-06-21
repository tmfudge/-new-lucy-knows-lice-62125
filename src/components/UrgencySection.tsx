import React from 'react';
import { AlertTriangle } from 'lucide-react';

const UrgencySection: React.FC = () => {
  const urgencyPoints = [
    "Every day you wait, lice multiply exponentially - What's 10 bugs today becomes 100+ bugs next week",
    "School notification deadlines - Most schools require 24-48 hour clearance before return",
    "Family spread prevention - The longer you wait, the more family members get infected",
    "Your sanity and sleep - End the 3AM Google searches and constant worry TODAY",
    "Financial protection - Avoid the $200-400 professional treatment costs"
  ];

  return (
    <section className="bg-gradient-to-br from-orange-50 to-yellow-50 py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-orange-700 mb-8">
          Why You Need to Act TODAY
        </h2>

        <ul className="text-left max-w-3xl mx-auto mb-10 space-y-6">
          {urgencyPoints.map((point, index) => (
            <li key={index} className="flex items-start text-lg">
              <AlertTriangle className="w-6 h-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
              <span className="text-gray-700 leading-relaxed">
                <strong className="text-gray-800">{point.split(' - ')[0]}</strong>
                {point.includes(' - ') && ` - ${point.split(' - ')[1]}`}
              </span>
            </li>
          ))}
        </ul>

        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-orange-300">
          <p className="text-2xl text-orange-700 font-bold">
            The truth is: Lice gets HARDER to treat the longer you wait. Start the solution NOW.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;