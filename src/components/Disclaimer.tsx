import React from 'react';
import { AlertTriangle, FileText, Shield } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-300">
          <div className="flex items-center mb-6">
            <FileText className="w-6 h-6 text-gray-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-800">Important Disclaimers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700">
            <div>
              <div className="flex items-center mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                <h3 className="font-bold text-gray-800">Educational Content Only</h3>
              </div>
              <p>
                "Lucy" is a fictional character created for educational purposes. This survival kit contains 
                informational content only and is not medical advice. Always consult with healthcare 
                professionals for medical concerns.
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-3">
                <Shield className="w-5 h-5 text-blue-500 mr-2" />
                <h3 className="font-bold text-gray-800">No Medical Claims</h3>
              </div>
              <p>
                This product makes no medical claims and is not intended to diagnose, treat, cure, or 
                prevent any condition. Results may vary. If you suspect lice infestation, consult 
                appropriate healthcare providers.
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-3">
                <FileText className="w-5 h-5 text-green-500 mr-2" />
                <h3 className="font-bold text-gray-800">Information Resource</h3>
              </div>
              <p>
                This survival kit compiles publicly available information and common practices. 
                Individual results may vary. Use your own judgment and seek professional guidance 
                when needed.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              © 2024 Lucy Knows Lice Survival Kit. All rights reserved. This is an educational resource. 
              "Lucy" is a fictional character. Not affiliated with any medical organization. 
              Individual results may vary. Always consult healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Disclaimer;