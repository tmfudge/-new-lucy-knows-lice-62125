import React from 'react';
import { DollarSign, X, CheckCircle, AlertTriangle } from 'lucide-react';

const CostComparison: React.FC = () => {
  const alternatives = [
    {
      option: "Professional Lice Clinic",
      cost: "$350-$600",
      timeframe: "2-3 hours",
      pros: ["Professional service", "Usually effective"],
      cons: ["Extremely expensive", "Appointment required", "Same method you can learn", "No follow-up support"],
      verdict: "Works but costs 20x more"
    },
    {
      option: "Drugstore Treatments",
      cost: "$15-$30 each",
      timeframe: "Multiple attempts",
      pros: ["Cheap upfront", "Easy to find"],
      cons: ["High failure rate", "Harsh chemicals", "Multiple purchases needed", "No guidance"],
      verdict: "Cheap but often doesn't work"
    },
    {
      option: "DIY Home Remedies",
      cost: "$0-$20",
      timeframe: "Hours of research",
      pros: ["Natural ingredients", "Low cost"],
      cons: ["Mostly ineffective", "Waste precious time", "No systematic approach", "Can be dangerous"],
      verdict: "Free but frustrating"
    },
    {
      option: "Lucy's Survival Kit",
      cost: "$27",
      timeframe: "24-48 hours",
      pros: ["Proven method", "Complete system", "Educational support", "14-day guarantee"],
      cons: ["Requires following instructions"],
      verdict: "Best value for comprehensive education"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 mb-6">
            What Parents Actually Spend on Lice Treatment
          </h2>
          <p className="text-xl text-blue-700 mb-4">
            The hidden costs of "cheap" solutions vs. the smart investment
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
            <p className="text-red-700 font-semibold">
              💰 Americans spend over $500 million annually fighting lice - mostly on methods that don't work!
            </p>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white p-8 rounded-3xl shadow-lg mb-12 border-2 border-red-200">
          <h3 className="text-2xl font-bold text-red-700 mb-6 text-center">
            💸 What Most Parents End Up Spending (The Hard Way)
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-4">The "Cheap" Route:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex justify-between">
                  <span>First drugstore treatment</span>
                  <span className="font-semibold">$25</span>
                </li>
                <li className="flex justify-between">
                  <span>Second treatment (first failed)</span>
                  <span className="font-semibold">$30</span>
                </li>
                <li className="flex justify-between">
                  <span>Special shampoo & spray</span>
                  <span className="font-semibold">$45</span>
                </li>
                <li className="flex justify-between">
                  <span>Metal comb (finally!)</span>
                  <span className="font-semibold">$15</span>
                </li>
                <li className="flex justify-between">
                  <span>Professional clinic (desperation)</span>
                  <span className="font-semibold">$450</span>
                </li>
                <li className="flex justify-between border-t pt-2 font-bold text-red-600">
                  <span>Total Spent:</span>
                  <span>$565</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-4">Hidden Costs:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• 3+ days off work (lost wages)</li>
                <li>• Multiple store trips (gas, time)</li>
                <li>• Stress and family arguments</li>
                <li>• Child missing school</li>
                <li>• Repeated laundry/cleaning</li>
                <li>• Potential re-infestation</li>
              </ul>
              
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-800 font-semibold text-center">
                  Average total cost: $600-$900
                </p>
                <p className="text-red-600 text-center text-sm">
                  Plus weeks of stress and frustration
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Problem Alert */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-yellow-800 text-center mb-4">
            🚨 The $500+ Million Industry Problem
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-700">$500+ Million</div>
              <div className="text-yellow-600 text-sm">Spent annually in U.S.</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-700">Up to 65%</div>
              <div className="text-yellow-600 text-sm">Treatment failure rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-700">Summer Spike</div>
              <div className="text-yellow-600 text-sm">Camp outbreaks surge</div>
            </div>
          </div>
          <p className="text-yellow-700 text-center mt-4">
            This massive industry profits from keeping you confused and buying products that don't work!
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full bg-white rounded-3xl shadow-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-800">Option</th>
                <th className="px-6 py-4 text-center font-bold text-gray-800">Cost</th>
                <th className="px-6 py-4 text-center font-bold text-gray-800">User Reports</th>
                <th className="px-6 py-4 text-center font-bold text-gray-800">Time to Results</th>
                <th className="px-6 py-4 text-center font-bold text-gray-800">Support</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-6 py-4 font-semibold">Professional Clinic</td>
                <td className="px-6 py-4 text-center text-red-600 font-bold">$350-$600</td>
                <td className="px-6 py-4 text-center text-green-600">Generally Good</td>
                <td className="px-6 py-4 text-center">Same day</td>
                <td className="px-6 py-4 text-center text-red-600">None after visit</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="px-6 py-4 font-semibold">Drugstore Treatments</td>
                <td className="px-6 py-4 text-center text-yellow-600 font-bold">$15-$30 each</td>
                <td className="px-6 py-4 text-center text-red-600">Often Poor</td>
                <td className="px-6 py-4 text-center">Rarely works</td>
                <td className="px-6 py-4 text-center text-red-600">None</td>
              </tr>
              <tr className="border-t">
                <td className="px-6 py-4 font-semibold">DIY/Home Remedies</td>
                <td className="px-6 py-4 text-center text-green-600 font-bold">$0-$20</td>
                <td className="px-6 py-4 text-center text-red-600">Mixed</td>
                <td className="px-6 py-4 text-center">Hit or miss</td>
                <td className="px-6 py-4 text-center text-red-600">Google only</td>
              </tr>
              <tr className="border-t bg-green-50 border-2 border-green-500">
                <td className="px-6 py-4 font-bold text-green-800">Lucy's Survival Kit</td>
                <td className="px-6 py-4 text-center text-green-600 font-bold text-xl">$27</td>
                <td className="px-6 py-4 text-center text-green-600 font-bold">Highly Positive</td>
                <td className="px-6 py-4 text-center font-bold">24-48 hours</td>
                <td className="px-6 py-4 text-center text-green-600 font-bold">Email support</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-10 rounded-3xl text-center">
          <DollarSign className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-6">
            Save $500+ and Get Better Results
          </h3>
          <p className="text-2xl mb-6 opacity-90">
            For less than the cost of a family dinner out, learn the same methods $450 clinics use
          </p>
          <div className="bg-white bg-opacity-20 p-6 rounded-2xl">
            <p className="text-xl font-semibold mb-4">
              "I spent $550 at a clinic for my first kid. When my second got lice, this educational resource taught me the same method for $27. I felt so stupid for not finding this first!" 
            </p>
            <p className="text-green-100">- Amanda K., Mother of 3</p>
            <div className="mt-4 text-green-100 text-sm">
              <strong>Don't become part of the $500+ million spent annually on ineffective treatments!</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostComparison;