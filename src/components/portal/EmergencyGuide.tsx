import React, { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, Phone, MessageCircle } from 'lucide-react';

const EmergencyGuide: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const emergencySteps = [
    {
      id: 1,
      title: "STOP and Breathe",
      description: "Take 3 deep breaths. This is manageable. You've got this.",
      timeframe: "30 seconds",
      details: "Panic makes everything harder. Lice are annoying, not dangerous. Your child is safe."
    },
    {
      id: 2,
      title: "Isolate the Affected Person",
      description: "Keep them away from siblings/family until you can check everyone.",
      timeframe: "Immediate",
      details: "This prevents spread while you assess the situation. No sharing pillows, hats, or brushes."
    },
    {
      id: 3,
      title: "Gather Your Supplies",
      description: "Get a bright light, magnifying glass if available, and fine-tooth comb.",
      timeframe: "2 minutes",
      details: "Good lighting is crucial for proper identification. Natural daylight works best."
    },
    {
      id: 4,
      title: "Confirm It's Actually Lice",
      description: "Look for moving bugs or eggs (nits) glued to hair shafts near the scalp.",
      timeframe: "5 minutes",
      details: "Dandruff flakes off easily. Nits are stuck tight and oval-shaped. Live lice move quickly."
    },
    {
      id: 5,
      title: "Document What You Find",
      description: "Take photos if possible. Note locations and quantity.",
      timeframe: "2 minutes",
      details: "This helps track progress and communicate with healthcare providers if needed."
    },
    {
      id: 6,
      title: "Start the Treatment Protocol",
      description: "Don't delay - begin the enzyme treatment process immediately.",
      timeframe: "Now",
      details: "Every hour you wait, lice can lay more eggs. Quick action prevents worse infestation."
    }
  ];

  const toggleStep = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const panicStoppers = [
    "Lice prefer CLEAN hair - this isn't about hygiene",
    "1 in 4 kids get lice - your child isn't alone",
    "Lice don't carry diseases - they're just annoying",
    "This will be over in 24-48 hours with the right approach",
    "You're a good parent dealing with a common problem"
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Emergency Header */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
          <h1 className="text-3xl font-bold text-red-800">Emergency First Steps</h1>
        </div>
        <p className="text-red-700 text-lg">
          Found lice? Don't panic. Follow these steps in order to take control of the situation immediately.
        </p>
      </div>

      {/* Panic Stoppers */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4">🧘‍♀️ Panic Stoppers - Read These First</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {panicStoppers.map((stopper, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-blue-700">{stopper}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Action Steps</h2>
        
        {emergencySteps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          
          return (
            <div key={step.id} className={`
              border rounded-xl p-6 transition-all duration-200
              ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}
            `}>
              <div className="flex items-start justify-between">
                <div className="flex items-start flex-1">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 mt-1 transition-colors
                      ${isCompleted 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                  >
                    {isCompleted && <CheckCircle className="w-5 h-5" />}
                    {!isCompleted && <span className="text-sm font-bold">{step.id}</span>}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-bold ${isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                        {step.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {step.timeframe}
                      </div>
                    </div>
                    
                    <p className={`text-lg mb-3 ${isCompleted ? 'text-green-700' : 'text-gray-700'}`}>
                      {step.description}
                    </p>
                    
                    <div className={`text-sm p-3 rounded-lg ${isCompleted ? 'bg-green-100' : 'bg-gray-50'}`}>
                      <strong>Details:</strong> {step.details}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Emergency Steps Progress</h3>
          <span className="text-sm text-gray-600">
            {completedSteps.length} of {emergencySteps.length} completed
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps.length / emergencySteps.length) * 100}%` }}
          />
        </div>
        
        {completedSteps.length === emergencySteps.length && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <h4 className="font-bold text-green-800">Great job! Emergency steps complete.</h4>
                <p className="text-green-700">Now proceed to the Treatment Protocol to eliminate the lice.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <MessageCircle className="w-6 h-6 text-orange-600 mr-3" />
            <h3 className="text-lg font-bold text-orange-800">Need Help?</h3>
          </div>
          <p className="text-orange-700 mb-4">
            Feeling overwhelmed? Our support team is here to help guide you through this.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Chat with Support
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Phone className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-bold text-blue-800">Medical Questions?</h3>
          </div>
          <p className="text-blue-700 mb-4">
            If you have concerns about allergic reactions or medical issues, contact your healthcare provider.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Find Healthcare Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyGuide;