import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

const MoneyBackGuarantee: React.FC = () => {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-2xl shadow-xl relative">
          {/* Compact badge */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-green-600 px-6 py-2 rounded-full font-bold text-sm shadow-lg">
            14-DAY GUARANTEE
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center">
              <Shield className="w-12 h-12 text-white mr-4" />
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Love It or Get Your Money Back
                </h2>
                <p className="text-green-100 text-lg">
                  If you're not satisfied with the educational content, email us within 14 days for a full refund.
                </p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 text-center">
              <div>
                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm font-medium">Full Refund</div>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm font-medium">No Questions</div>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm font-medium">Keep Materials</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-green-100 text-sm">
              <strong>Note:</strong> Guarantee covers satisfaction with educational content only. Individual results may vary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoneyBackGuarantee;