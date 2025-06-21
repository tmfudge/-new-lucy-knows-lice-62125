import React, { useState } from 'react';
import { Heart, AlertTriangle, CheckCircle, Brain, Smile, Phone } from 'lucide-react';

const WorryGuide: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const worryScenarios = [
    {
      id: 'found-lice',
      title: "I found lice on my child",
      worry: "I'm a terrible parent. How did this happen?",
      reality: "Lice prefer CLEAN hair and affect 1 in 4 kids. This has nothing to do with your parenting.",
      action: "Take a deep breath. Follow the emergency guide. You've got this.",
      chillLevel: "high"
    },
    {
      id: 'school-notification',
      title: "The school sent a lice notification",
      worry: "Everyone will think we're dirty. My child will be embarrassed.",
      reality: "Schools send these because lice are common, not shameful. Other parents understand.",
      action: "Check your child tonight. If clear, just monitor. If found, treat immediately.",
      chillLevel: "medium"
    },
    {
      id: 'treatment-not-working',
      title: "I tried treatment but still see lice",
      worry: "Nothing works! We'll never get rid of them!",
      reality: "Most drugstore treatments fail due to resistance. You need the right method.",
      action: "Switch to enzyme-based treatment. Follow the 3-day protocol exactly.",
      chillLevel: "medium"
    },
    {
      id: 'keep-coming-back',
      title: "Lice keep coming back",
      worry: "We're doing something wrong. This will never end.",
      reality: "Reinfestations happen when the 21-day cycle isn't followed completely.",
      action: "Restart the full protocol and stick to the recheck calendar religiously.",
      chillLevel: "medium"
    },
    {
      id: 'whole-family',
      title: "The whole family might have lice",
      worry: "This is going to cost hundreds and take forever to fix.",
      reality: "Family screening takes 2 hours max. Treatment is the same regardless of numbers.",
      action: "Check everyone systematically. Treat only those who actually have lice.",
      chillLevel: "low"
    },
    {
      id: 'child-scratching',
      title: "My child won't stop scratching",
      worry: "They're going to hurt themselves or spread it more.",
      reality: "Scratching is normal but can be managed. It doesn't make lice spread faster.",
      action: "Trim nails, use cool compress, start treatment to address the root cause.",
      chillLevel: "low"
    },
    {
      id: 'missed-school',
      title: "My child has missed too much school",
      worry: "They're falling behind. Teachers will judge us.",
      reality: "Schools deal with lice regularly. Teachers understand it's a health issue, not neglect.",
      action: "Communicate with teachers. Most schools allow return after treatment starts.",
      chillLevel: "low"
    },
    {
      id: 'expensive-treatments',
      title: "I've spent so much money on treatments",
      worry: "We can't afford professional removal services.",
      reality: "Professional services use the same methods you can learn. You don't need them.",
      action: "Stop buying random products. Invest in the right tools and follow the proven method.",
      chillLevel: "high"
    }
  ];

  const anxietyStoppers = [
    {
      trigger: "Seeing lice move",
      response: "They're just bugs. Annoying, but not dangerous. You're bigger than they are."
    },
    {
      trigger: "Other parents' reactions",
      response: "1 in 4 kids get lice. Half of them have dealt with this too."
    },
    {
      trigger: "Feeling overwhelmed",
      response: "Break it into steps. You only need to focus on today's tasks."
    },
    {
      trigger: "Worrying about judgment",
      response: "Anyone who judges you for lice doesn't understand basic biology."
    },
    {
      trigger: "Fear of failure",
      response: "Following the protocol correctly has a 98% success rate. Trust the process."
    }
  ];

  const confidenceBuilders = [
    "You caught this early - that's good parenting",
    "You're taking action instead of ignoring it",
    "Thousands of parents have succeeded with this method",
    "Your child will be fine and won't remember this drama",
    "You're learning a valuable life skill",
    "This experience makes you a more prepared parent"
  ];

  const selectedScenarioData = worryScenarios.find(s => s.id === selectedScenario);

  const getChillColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-pink-50 border border-pink-200 rounded-xl p-6 mb-8">
        <div className="flex items-center mb-4">
          <Heart className="w-8 h-8 text-pink-600 mr-3" />
          <h1 className="text-3xl font-bold text-pink-800">Worry vs. Chill Guide</h1>
        </div>
        <p className="text-pink-700 text-lg">
          When to worry, when to relax. Anxiety stoppers and confidence builders for stressed parents.
        </p>
      </div>

      {/* Quick Mood Check */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How are you feeling right now?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
            <div className="text-3xl mb-2">😰</div>
            <div className="font-medium text-red-800">Panicked</div>
            <div className="text-sm text-red-600">Need immediate calm</div>
          </button>
          <button className="p-4 border border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors">
            <div className="text-3xl mb-2">😟</div>
            <div className="font-medium text-yellow-800">Worried</div>
            <div className="text-sm text-yellow-600">Anxious but managing</div>
          </button>
          <button className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="text-3xl mb-2">😐</div>
            <div className="font-medium text-blue-800">Neutral</div>
            <div className="text-sm text-blue-600">Handling it okay</div>
          </button>
          <button className="p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
            <div className="text-3xl mb-2">😌</div>
            <div className="font-medium text-green-800">Confident</div>
            <div className="text-sm text-green-600">Got this under control</div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Worry Scenarios */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Common Worry Scenarios</h2>
            
            <div className="space-y-4">
              {worryScenarios.map((scenario) => (
                <div key={scenario.id} className="border border-gray-200 rounded-lg p-4">
                  <button
                    onClick={() => setSelectedScenario(selectedScenario === scenario.id ? null : scenario.id)}
                    className="w-full text-left flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-3" />
                      <span className="font-medium text-gray-900">{scenario.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChillColor(scenario.chillLevel)}`}>
                        {scenario.chillLevel === 'high' ? 'High Worry' : 
                         scenario.chillLevel === 'medium' ? 'Medium Worry' : 'Low Worry'}
                      </span>
                      <span className="text-gray-400">
                        {selectedScenario === scenario.id ? '−' : '+'}
                      </span>
                    </div>
                  </button>
                  
                  {selectedScenario === scenario.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                            <span className="font-medium text-red-800">The Worry:</span>
                          </div>
                          <p className="text-red-700 italic">"{scenario.worry}"</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-2">
                            <Brain className="w-4 h-4 text-blue-500 mr-2" />
                            <span className="font-medium text-blue-800">The Reality:</span>
                          </div>
                          <p className="text-blue-700">{scenario.reality}</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span className="font-medium text-green-800">What to Do:</span>
                          </div>
                          <p className="text-green-700 font-medium">{scenario.action}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Tools */}
        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Emergency Calm Tools</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">4-7-8 Breathing</h4>
                <p className="text-blue-700 text-sm">Inhale for 4, hold for 7, exhale for 8. Repeat 3 times.</p>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">Reality Check</h4>
                <p className="text-green-700 text-sm">Lice are annoying, not dangerous. Your child is safe.</p>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-bold text-purple-800 mb-2">Focus Redirect</h4>
                <p className="text-purple-700 text-sm">What's the next single step you need to take?</p>
              </div>
            </div>
          </div>

          {/* Confidence Builders */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Smile className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-bold text-green-800">Confidence Builders</h3>
            </div>
            <ul className="text-green-700 space-y-2">
              {confidenceBuilders.map((builder, index) => (
                <li key={index} className="flex items-start text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {builder}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Anxiety Stoppers */}
      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Anxiety Stoppers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {anxietyStoppers.map((stopper, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="mb-3">
                <span className="font-bold text-orange-600">When you feel: </span>
                <span className="text-gray-800">{stopper.trigger}</span>
              </div>
              <div>
                <span className="font-bold text-blue-600">Remember: </span>
                <span className="text-gray-800">{stopper.response}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* When to Actually Worry */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-bold text-red-800">When to Actually Worry</h3>
          </div>
          <ul className="text-red-700 space-y-2 text-sm">
            <li>• Signs of secondary bacterial infection (pus, fever)</li>
            <li>• Severe allergic reaction to treatments</li>
            <li>• Child is losing sleep or becoming depressed</li>
            <li>• Lice persist after 3 complete treatment cycles</li>
          </ul>
          <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            Contact Healthcare Provider
          </button>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Smile className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-bold text-green-800">When to Chill</h3>
          </div>
          <ul className="text-green-700 space-y-2 text-sm">
            <li>• You found lice (normal, treatable)</li>
            <li>• School sent a notification (just be prepared)</li>
            <li>• Child is scratching (expected during treatment)</li>
            <li>• You see dead lice after treatment (good sign!)</li>
            <li>• Other parents are talking (not about you)</li>
          </ul>
          <div className="mt-4 p-3 bg-green-100 rounded-lg">
            <p className="text-green-800 text-sm font-medium">
              Remember: You're handling this like a pro! 🌟
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorryGuide;