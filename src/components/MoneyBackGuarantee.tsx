import React from 'react';
import { Shield, DollarSign, Clock, CheckCircle } from 'lucide-react';

const MoneyBackGuarantee: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-green-500 text-center relative">
          {/* Badge */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg">
            SATISFACTION GUARANTEE
          </div>
          
          <Shield className="w-20 h-20 text-green-600 mx-auto mb-6 mt-4" />
          
          <h2 className="text-4xl font-bold text-green-700 mb-6">
            60-Day Satisfaction Promise
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Full Refund</h3>
              <p className="text-gray-600">Every penny back if you're not satisfied with the content</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">60 Full Days</h3>
              <p className="text-gray-600">Plenty of time to review all materials</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">No Questions</h3>
              <p className="text-gray-600">Simple email, instant refund</p>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-2xl border border-green-200 mb-6">
            <p className="text-xl text-green-800 font-semibold mb-4">
              "If you're not completely satisfied with the educational content and resources in this survival kit, just email us within 60 days."
            </p>
            <p className="text-green-700">
              We'll refund every penny immediately. No forms, no hassles, no questions asked. 
              You keep all the materials as our gift for trying.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800 mb-2">
              That's how confident we are in the quality of this educational resource.
            </p>
            <p className="text-gray-600">
              Over 1,500 families have used this guarantee. Less than 2% have asked for refunds.
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> This guarantee covers satisfaction with the educational content only. 
              Individual results may vary. This is not a guarantee of any specific outcome or medical result.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoneyBackGuarantee;