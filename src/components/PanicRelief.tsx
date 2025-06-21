import React from 'react';
import { Heart, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const PanicRelief: React.FC = () => {
  const panicScenarios = [
    {
      time: "10:47 PM",
      situation: "Just found lice on my kid",
      feeling: "Full panic mode",
      solution: "Emergency First Steps Guide calms you down in 5 minutes"
    },
    {
      time: "Sunday Night",
      situation: "School starts Monday",
      feeling: "Desperate for quick fix",
      solution: "24-hour protocol gets them school-ready"
    },
    {
      time: "After $200 Clinic",
      situation: "Lice came back",
      feeling: "Frustrated and broke",
      solution: "Learn why clinics fail + the method that doesn't"
    },
    {
      time: "3rd Failed Treatment",
      situation: "Nothing is working",
      feeling: "Ready to give up",
      solution: "Discover why 95% of treatments fail + what actually works"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-red-50 to-pink-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-700 mb-6">
            If You're Reading This at 2 AM in Full Panic Mode...
          </h2>
          <p className="text-2xl text-red-600 font-semibold">
            You're exactly where I was. Here's your lifeline. 👇
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {panicScenarios.map((scenario, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-red-500">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-red-500 mr-3" />
                <span className="font-bold text-red-700 text-lg">{scenario.time}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{scenario.situation}</h3>
              <p className="text-red-600 italic mb-4">"{scenario.feeling}"</p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 font-semibold">✓ {scenario.solution}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Immediate Relief Section */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-orange-500">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-orange-700 mb-4">
              Take a Deep Breath - You've Got This
            </h3>
            <p className="text-xl text-gray-700">
              Thousands of parents have been exactly where you are right now. Here's what they wish they knew.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 text-center">
              <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-blue-800 mb-2">You're Not Alone</h4>
              <p className="text-blue-700">
                1 in 4 kids get lice. This happens to the best families, cleanest homes, and most caring parents.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl border border-green-200 text-center">
              <AlertTriangle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-green-800 mb-2">It's Not Dangerous</h4>
              <p className="text-green-700">
                Lice are annoying, not dangerous. Your child is safe. This is a nuisance, not a health crisis.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 text-center">
              <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-purple-800 mb-2">You Can Fix This</h4>
              <p className="text-purple-700">
                With the right method, most families are lice-free within 24-48 hours. You just need the right plan.
              </p>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
            <h4 className="text-xl font-bold text-orange-800 mb-4 text-center">
              Emergency Calm-Down Checklist
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-center text-orange-700">
                  <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                  Take 3 deep breaths
                </li>
                <li className="flex items-center text-orange-700">
                  <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                  Remember: this is temporary
                </li>
                <li className="flex items-center text-orange-700">
                  <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                  Your child is safe and healthy
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center text-orange-700">
                  <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                  You're a good parent
                </li>
                <li className="flex items-center text-orange-700">
                  <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                  This happens to clean families
                </li>
                <li className="flex items-center text-orange-700">
                  <CheckCircle className="w-4 h-4 mr-2 text-orange-600" />
                  You will get through this
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-2xl font-bold text-gray-800 mb-2">
              Now let's get you the solution that actually works.
            </p>
            <p className="text-gray-600">
              No more panic, no more guessing - just a clear path to being lice-free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanicRelief;