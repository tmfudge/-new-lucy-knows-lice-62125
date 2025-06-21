import React from 'react';
import { Heart, Clock, Phone, MessageCircle } from 'lucide-react';

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

        {/* Immediate Help Section */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-orange-500">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-orange-700 mb-4">
              Need Help RIGHT NOW?
            </h3>
            <p className="text-xl text-gray-700">
              Don't suffer alone. Get immediate support while you're going through this.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 text-center">
              <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-blue-800 mb-2">24/7 Chat Support</h4>
              <p className="text-blue-700 mb-4">
                Real humans who understand the panic. Get answers in minutes, not hours.
              </p>
              <div className="bg-blue-100 p-3 rounded-lg">
                <p className="text-blue-800 font-semibold">
                  "Sarah helped me at 11 PM on a Sunday. Saved my sanity!" - Jennifer M.
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl border border-green-200 text-center">
              <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-green-800 mb-2">Emergency Hotline</h4>
              <p className="text-green-700 mb-4">
                For crisis situations. Speak to a lice specialist who's been there.
              </p>
              <div className="bg-green-100 p-3 rounded-lg">
                <p className="text-green-800 font-semibold">
                  "Called crying at midnight. They walked me through everything." - Maria T.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-2xl font-bold text-gray-800 mb-2">
              You don't have to figure this out alone.
            </p>
            <p className="text-gray-600">
              Included FREE with your Survival Kit - because no parent should panic alone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanicRelief;