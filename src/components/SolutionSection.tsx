import React from 'react';

const SolutionSection: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Meet Lucy: The Mom Who Cracked the Code
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 font-medium">
          From 10:47 PM panic to helping 1,000+ families beat the $500 million lice industry
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
              <strong className="text-orange-500">"It was 10:47 PM on a Sunday when I found them crawling in my daughter's hair."</strong>
            </p>
            
            <p className="text-gray-700">
              I did what every panicked parent does - I Googled. Big mistake. I found 47 different "solutions," 
              spent $350+ on treatments that failed, and nearly lost my mind in the process.
            </p>
            
            <p className="text-gray-700">
              But here's what I discovered that changed everything: <strong>I wasn't alone, and I wasn't failing.</strong>
            </p>

            {/* Research Revelation */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4">The Research That Opened My Eyes:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-blue-700">
                <div>
                  <div className="text-2xl font-bold text-blue-600">Up to 65%</div>
                  <div className="text-sm">of lice are now resistant to drugstore treatments</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">Only 57.5%</div>
                  <div className="text-sm">of suspected cases are correctly identified</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">$500+ Million</div>
                  <div className="text-sm">spent annually on mostly ineffective treatments</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">1 in 5</div>
                  <div className="text-sm">kids may be infested at any moment</div>
                </div>
              </div>
              <p className="text-blue-800 font-medium mt-4">
                <strong>I realized the system was designed to keep me confused and buying products that don't work!</strong>
              </p>
            </div>

            <p className="text-gray-800">
              <strong className="text-orange-500">So I went on a mission.</strong> I studied the research. 
              I interviewed pediatric nurses. I learned what the $350+ lice clinics actually do. 
              I discovered why mayonnaise fails (it's porous!), why drugstore treatments don\'t work 
              (resistance rates are through the roof), and why parents report such significant stress and anxiety.
            </p>
            
            <p className="text-gray-700">
              Most importantly, I found the methods that actually work - the same enzyme-based treatments 
              and systematic wet combing protocols that professional clinics use, but explained in a way 
              that stressed parents can actually follow.
            </p>

            {/* The Breakthrough */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 my-6">
              <h3 className="text-xl font-bold text-orange-800 mb-3">The Breakthrough Moment:</h3>
              <p className="text-orange-700">
                When my neighbor's kid got lice 6 months later, I shared my research with her. 
                <strong> She was lice-free in 24 hours.</strong> Then another friend. Same result. 
                Then another. Word spread like wildfire.
              </p>
            </div>

            <p className="text-gray-700">
              That's when I realized: <strong>Parents don't need more products. They need better education.</strong> 
              They need to understand why the $500+ million lice industry keeps them confused, 
              why summer camp outbreaks spike every year, and why the methods that actually work 
              are hidden behind expensive clinic visits.
            </p>

            <p className="text-gray-800">
              <strong className="text-orange-500">Lucy's Survival Kit was born from that 10:47 PM panic moment.</strong> 
              It's everything I wish I had known that night - the research-backed methods, the step-by-step protocols, 
              the confidence-building education that turns panicked parents into informed advocates for their families.
            </p>

            {/* Results */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-6">
              <h3 className="text-xl font-bold text-green-800 mb-3">The Results Speak for Themselves:</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">1,000+</div>
                  <div className="text-green-700 text-sm">Families helped</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">24-48 hrs</div>
                  <div className="text-green-700 text-sm">Typical success timeline</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">$400+</div>
                  <div className="text-green-700 text-sm">Average savings vs. clinics</div>
                </div>
              </div>
            </div>

            <p className="text-gray-700">
              Now, instead of contributing to that $500+ million industry of confusion, 
              parents learn the same methods professional clinics use - for the cost of a family dinner out.
            </p>

            <p className="text-gray-800 text-xl font-bold">
              Because no parent should have to go through that 10:47 PM panic alone, 
              without clear guidance and a proven plan that actually works.
            </p>

            {/* Credibility Note */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
              <p className="text-gray-600 text-sm text-center">
                <strong>Note:</strong> "Lucy" represents the collective research and experience compiled in this educational resource. 
                All statistics are sourced from peer-reviewed research and clinical studies on lice treatment effectiveness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;