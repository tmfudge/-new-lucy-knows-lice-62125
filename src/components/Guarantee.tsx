import React from 'react';
import { Shield } from 'lucide-react';

const Guarantee: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="bg-gradient-to-br from-green-50 to-teal-50 p-10 rounded-3xl text-center border-2 border-green-500 shadow-lg">
        <Shield className="w-16 h-16 text-green-600 mx-auto mb-6" />
        <h3 className="text-3xl font-bold text-green-700 mb-6">
          30-Day "It Works or It's Free" Guarantee
        </h3>
        <p className="text-xl text-gray-700 leading-relaxed">
          If Lucy's Survival Kit doesn't give you the confidence and results you need to handle lice like a pro, just email me within 30 days for a full refund. No questions asked.
        </p>
      </div>
    </div>
  );
};

export default Guarantee;