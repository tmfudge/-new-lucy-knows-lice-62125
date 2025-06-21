import React from 'react';
import { ArrowLeft, FileText, Shield, AlertTriangle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
          <p className="text-gray-600 mt-2">Last updated: January 2024</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
              <h2 className="text-xl font-bold text-yellow-800">Important Notice</h2>
            </div>
            <p className="text-yellow-700">
              <strong>"Lucy"</strong> is a fictional character created for educational purposes. 
              This survival kit contains informational content only and is not medical advice. 
              Always consult healthcare professionals for medical concerns.
            </p>
          </div>

          {/* Educational Content */}
          <section>
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Educational Content Only</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                The Lucy Knows Lice Survival Kit is an educational resource that compiles publicly 
                available information about lice treatment methods. This product:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provides educational information only</li>
                <li>Does not constitute medical advice</li>
                <li>Should not replace professional medical consultation</li>
                <li>Is not intended to diagnose, treat, cure, or prevent any condition</li>
                <li>Teaches methods and approaches for informational purposes</li>
              </ul>
            </div>
          </section>

          {/* Results and Satisfaction */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Results and Individual Variation</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                The educational process of learning effective lice removal methods can provide immediate satisfaction through:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Clear, step-by-step instructions that eliminate confusion</li>
                <li>Immediate access to comprehensive educational materials</li>
                <li>Systematic approach that reduces stress and uncertainty</li>
                <li>Evidence-based methods compiled from research and professional practices</li>
              </ul>
              <p className="font-medium text-gray-800">
                <strong>Important:</strong> While the educational content provides immediate value, 
                individual results when applying the information may vary based on factors including 
                severity of infestation, hair type, adherence to protocols, and individual circumstances.
              </p>
            </div>
          </section>

          {/* Guarantee Terms */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">14-Day Satisfaction Guarantee</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                We offer a 14-day satisfaction guarantee on the educational content provided:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Guarantee applies to satisfaction with educational materials and content quality</li>
                <li>Refund requests must be made within 14 days of purchase</li>
                <li>No questions asked policy for educational content satisfaction</li>
                <li>Guarantee covers the comprehensiveness and clarity of the educational resource</li>
                <li>Individual results when applying the information may vary</li>
                <li>Guarantee does not cover treatment outcomes or specific results</li>
              </ul>
            </div>
          </section>

          {/* Use of Information */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Use of Information</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                By purchasing and using this educational resource, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You will use your own judgment when applying any information</li>
                <li>You will consult healthcare professionals for medical concerns</li>
                <li>Individual results may vary significantly</li>
                <li>You assume responsibility for your own health decisions</li>
                <li>The educational content is for informational purposes only</li>
                <li>Success depends on proper application of the methods taught</li>
              </ul>
            </div>
          </section>

          {/* Testimonials and Reviews */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">User Feedback and Testimonials</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                User testimonials and feedback represent individual experiences with the educational content:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Testimonials reflect individual experiences and may not be typical</li>
                <li>Results may vary based on individual circumstances and application</li>
                <li>User feedback is based on their satisfaction with the educational materials</li>
                <li>Individual success depends on following the educational protocols correctly</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                To the fullest extent permitted by law, Lucy Knows Lice Survival Kit and its creators 
                shall not be liable for any direct, indirect, incidental, special, or consequential 
                damages resulting from the use or inability to use this educational resource.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                For questions about these terms, refund requests, or technical support with accessing your educational materials:
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-medium text-blue-800">Email Support:</p>
                <p className="text-blue-700">hello@lucyknowslice.com</p>
                <p className="text-sm text-blue-600 mt-2">
                  Response time: 24-48 hours for all inquiries
                </p>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> This email is for administrative purposes only. 
                The educational materials are designed to be comprehensive and self-contained.
              </p>
            </div>
          </section>

          {/* Privacy Notice */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Privacy & Data</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                We respect your privacy and only collect information necessary to deliver your educational materials:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email address for product delivery and support</li>
                <li>Payment information (processed securely by our payment processor)</li>
                <li>We do not sell or share your personal information</li>
                <li>You may request data deletion at any time</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;