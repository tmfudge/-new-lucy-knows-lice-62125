import React from 'react';

const SolutionSection: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Meet the Lucy Knows Lice System
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 font-medium">
          The comprehensive educational resource that's helped 1,000+ families navigate lice treatment with confidence
        </p>

        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-10 rounded-3xl border-2 border-green-500 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-8 shadow-lg overflow-hidden">
            <img 
              src="/Lucy Know Lice Bug" 
              alt="Lucy Bug Character" 
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback to emoji if image fails
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '👩‍⚕️';
                }
              }}
            />
          </div>
          
          <div className="text-left max-w-3xl mx-auto space-y-6 text-lg leading-relaxed">
            <p className="text-gray-800">
              <strong className="text-orange-500">"It was 10:47 PM on a Sunday when I found them."</strong>
            </p>
            <p className="text-gray-700">
              This survival kit was created after extensive research into what actually works for lice treatment. 
              We studied the methods used by professional lice clinics, reviewed scientific literature, and 
              compiled the most effective approaches into one comprehensive system.
            </p>
            <p className="text-gray-700">
              After seeing countless families struggle with ineffective drugstore treatments and expensive clinic visits, 
              we realized there was a need for a clear, systematic educational resource that parents could access immediately.
            </p>
            <p className="text-gray-800">
              <strong className="text-orange-500">The result:</strong> A step-by-step educational system that teaches 
              the same proven methods used by $200+ lice clinics, but in an easy-to-follow format you can use at home.
            </p>
            <p className="text-gray-700">
              That's why we created Lucy's Survival Kit - so no parent has to navigate that 10:47 PM panic alone, 
              without clear guidance and a proven plan.
            </p>
          </div>
          
          <div className="mt-8 p-4 bg-white rounded-lg border border-green-300">
            <p className="text-sm text-green-800">
              <strong>Please note:</strong> "Lucy" is a fictional character created for educational purposes. 
              This survival kit contains informational content only and is not medical advice. 
              Always consult healthcare professionals for medical concerns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;