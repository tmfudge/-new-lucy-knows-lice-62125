import React from 'react';

const ScientificBacking: React.FC = () => {
  const studies = [
    {
      journal: 'Journal of Medical Entomology',
      quote: 'Enzymatic treatments that dissolve the cement attaching nits to hair shafts show significantly higher efficacy rates than traditional pesticide treatments.',
      color: 'border-blue-600 text-blue-600'
    },
    {
      journal: 'Pediatric Dermatology Research',
      quote: 'Systematic mechanical removal using fine-toothed metal combs remains the most reliable method for eliminating both live lice and viable nits.',
      color: 'border-green-600 text-green-600'
    },
    {
      journal: 'American Journal of Public Health',
      quote: 'Resistance to pyrethrin and permethrin-based treatments now exceeds 95% in most US populations, necessitating alternative treatment approaches.',
      color: 'border-orange-500 text-orange-500'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-blue-800 text-center mb-6">
          The Science Behind What Actually Works
        </h2>
        <p className="text-xl text-blue-700 text-center mb-12">
          Research supports enzyme-based treatments and systematic combing methods
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {studies.map((study, index) => (
            <div key={index} className={`bg-white p-8 rounded-2xl shadow-lg border-l-4 ${study.color.split(' ')[0]} hover:-translate-y-2 transition-transform duration-300`}>
              <div className={`font-bold mb-4 ${study.color.split(' ')[1]}`}>
                {study.journal}
              </div>
              <p className="text-gray-700 italic leading-relaxed">
                "{study.quote}"
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h3 className="text-blue-800 text-2xl font-bold mb-4">The Research is Clear:</h3>
          <p className="text-gray-700 text-xl leading-relaxed">
            Enzyme-based treatments + systematic metal combing + follow-up protocols = the most effective educational approach to modern lice treatment methods
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScientificBacking;