import React from 'react';

const SolutionSection: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Meet Lucy: Your Calm in the Chaos
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 font-medium">
          The mom who turned her worst parenting nightmare into the solution that's helped 1,000+ families
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
              My kid was scratching like crazy. I grabbed a flashlight, parted his hair, and there they were. Lice. Crawling around like they owned the place.
            </p>
            <p className="text-gray-700">
              I went into full panic mode. Googled everything. Tried the drugstore treatments. Called in sick to work. Spent $400 at a lice clinic.
            </p>
            <p className="text-gray-800">
              <strong className="text-orange-500">But here's what I learned:</strong> There's a simple, systematic way to handle lice that most parents never learn. It's not about expensive treatments or harsh chemicals. It's about having the RIGHT plan at the RIGHT time.
            </p>
            <p className="text-gray-700">
              That's why I created Lucy's Survival Kit - so no parent has to go through that 10:47 PM panic alone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;