import React from 'react';
import { Shield, DollarSign, Clock, CheckCircle } from 'lucide-react';

const MoneyBackGuarantee: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-green-500 text-center relative">
          {/* Badge */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg">
            RISK-FREE GUARANTEE
          </div>
          
          <Shield className="w-20 h-20 text-green-600 mx-auto mb-6 mt-4" />
          
          <h2 className="text-4xl font-bold text-green-700 mb-6">
            60-Day "It Works or It's FREE" Promise
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Full Refund</h3>
              <p className="text-gray-600">Every penny back if you're not satisfied</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">60 Full Days</h3>
              <p className="text-gray-600">Plenty of time to see results</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">No Questions</h3>
              <p className="text-gray-600">Simple email, instant refund</p>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-2xl border border-green-200 mb-6">
            <p className="text-xl text-green-800 font-semibold mb-4">
              "If Lucy's Survival Kit doesn't give you the confidence and results you need to handle lice like a pro, just email me within 60 days."
            </p>
            <p className="text-green-700">
              I'll refund every penny immediately. No forms, no hassles, no questions asked. 
              You keep everything - the guides, videos, checklists - as my gift for trying.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800 mb-2">
              That's how confident I am this will work for you.
            </p>
            <p className="text-gray-600">
              Over 1,500 families have used this guarantee. Less than 2% have asked for refunds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoneyBackGuarantee;