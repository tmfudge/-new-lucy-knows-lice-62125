import React, { useState } from 'react';
import { Target, Clock, AlertCircle, CheckCircle, Camera, ShoppingCart } from 'lucide-react';
import { useTreatment } from '../../contexts/TreatmentContext';

const TreatmentProtocol: React.FC = () => {
  const { state, dispatch } = useTreatment();
  const [activeDay, setActiveDay] = useState(state.currentDay);

  const treatmentDays = [
    {
      day: 1,
      title: "Initial Treatment Day",
      description: "The most important day - eliminate live lice and loosen nits",
    },
    {
      day: 2,
      title: "Follow-up Check",
      description: "Catch any missed lice before they mature",
    },
    {
      day: 3,
      title: "Critical Recheck",
      description: "Most important follow-up - catch the cycle",
    }
  ];

  const supplies = [
    { item: "Enzyme-based lice treatment", brand: "LiceLogic or similar", price: "$15-20", essential: true },
    { item: "Metal lice comb", brand: "NitFree or LiceMeister", price: "$10-15", essential: true },
    { item: "Bright LED flashlight", brand: "Any brand", price: "$8-12", essential: true },
    { item: "Hair clips/sectioning clips", brand: "Any brand", price: "$3-5", essential: true },
    { item: "White towels", brand: "Any brand", price: "$10-15", essential: false },
    { item: "Magnifying glass", brand: "Any brand", price: "$5-8", essential: false },
  ];

  const toggleTask = (taskId: string) => {
    dispatch({ type: 'TOGGLE_TREATMENT_TASK', payload: taskId });
  };

  const startTreatment = () => {
    if (!state.treatmentStartDate) {
      const today = new Date().toISOString().split('T')[0];
      dispatch({ type: 'SET_TREATMENT_START_DATE', payload: today });
    }
  };

  const currentDayTasks = state.treatmentTasks.filter(task => task.day === activeDay);
  const completedTasksForDay = currentDayTasks.filter(task => task.completed).length;
  const totalTasksForDay = currentDayTasks.length;

  const getDayStatus = (day: number) => {
    if (!state.treatmentStartDate) return 'locked';
    
    const startDate = new Date(state.treatmentStartDate);
    const dayDate = new Date(startDate);
    dayDate.setDate(startDate.getDate() + day - 1);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dayDate.setHours(0, 0, 0, 0);
    
    if (dayDate > today) return 'upcoming';
    if (dayDate.getTime() === today.getTime()) return 'current';
    return 'available';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="flex items-center mb-4">
          <Target className="w-8 h-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-green-800">Treatment Protocol</h1>
        </div>
        <p className="text-green-700 text-lg">
          The proven 3-day system that eliminates lice completely. Follow each step precisely for guaranteed results.
        </p>
        
        {!state.treatmentStartDate && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-green-300">
            <p className="text-green-800 mb-3">
              <strong>Ready to start?</strong> Click below to begin your treatment and activate the full protocol.
            </p>
            <button
              onClick={startTreatment}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Start Treatment Now
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Day Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Treatment Days</h2>
            <div className="space-y-3">
              {treatmentDays.map((day) => {
                const status = getDayStatus(day.day);
                const isActive = activeDay === day.day;
                
                return (
                  <button
                    key={day.day}
                    onClick={() => status !== 'locked' && setActiveDay(day.day)}
                    disabled={status === 'locked'}
                    className={`
                      w-full text-left p-4 rounded-lg border transition-all duration-200
                      ${isActive 
                        ? 'bg-green-50 border-green-500 text-green-800' 
                        : status === 'locked'
                        ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                        : status === 'current'
                        ? 'bg-blue-50 border-blue-500 text-blue-800 hover:bg-blue-100'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold">Day {day.day}</div>
                      {status === 'current' && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      )}
                      {status === 'locked' && (
                        <div className="text-gray-400">🔒</div>
                      )}
                    </div>
                    <div className="text-sm opacity-75">{day.title}</div>
                    {status === 'locked' && (
                      <div className="text-xs mt-1 opacity-60">Start treatment to unlock</div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Supplies List */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Required Supplies</h3>
              <div className="space-y-2">
                {supplies.filter(s => s.essential).map((supply, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-medium text-gray-800">{supply.item}</div>
                    <div className="text-gray-600">{supply.price}</div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Shopping List
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {getDayStatus(activeDay) === 'locked' ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Day {activeDay} Locked</h2>
              <p className="text-gray-600 mb-6">
                Start your treatment to unlock the daily protocols and begin tracking your progress.
              </p>
              <button
                onClick={startTreatment}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Start Treatment Protocol
              </button>
            </div>
          ) : (
            <>
              {/* Day Header */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Day {activeDay}: {treatmentDays.find(d => d.day === activeDay)?.title}
                  </h2>
                  <div className="text-sm text-gray-600">
                    {completedTasksForDay} of {totalTasksForDay} tasks completed
                  </div>
                </div>
                <p className="text-gray-700 text-lg mb-4">
                  {treatmentDays.find(d => d.day === activeDay)?.description}
                </p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${totalTasksForDay > 0 ? (completedTasksForDay / totalTasksForDay) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-6">
                {currentDayTasks.map((task, index) => {
                  const isCompleted = task.completed;
                  
                  return (
                    <div key={task.id} className={`
                      border rounded-xl p-6 transition-all duration-200
                      ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}
                    `}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start flex-1">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className={`
                              w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 mt-1 transition-colors
                              ${isCompleted 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : 'border-gray-300 hover:border-gray-400'
                              }
                            `}
                          >
                            {isCompleted && <CheckCircle className="w-5 h-5" />}
                            {!isCompleted && <span className="text-sm font-bold">{index + 1}</span>}
                          </button>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <h3 className={`text-lg font-bold mr-3 ${isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                                  {task.title}
                                </h3>
                                {task.critical && (
                                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                                    Critical
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="w-4 h-4 mr-1" />
                                {task.timeEstimate}
                              </div>
                            </div>
                            
                            <p className={`text-lg ${isCompleted ? 'text-green-700' : 'text-gray-700'}`}>
                              {task.description}
                            </p>
                            
                            {isCompleted && task.completedDate && (
                              <div className="mt-2 text-sm text-green-600">
                                ✓ Completed {new Date(task.completedDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Day Complete Message */}
              {completedTasksForDay === totalTasksForDay && totalTasksForDay > 0 && (
                <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mr-4" />
                    <div>
                      <h3 className="text-xl font-bold text-green-800">Day {activeDay} Complete!</h3>
                      <p className="text-green-700">
                        {activeDay < 3 
                          ? `Great job! Come back tomorrow for Day ${activeDay + 1} tasks.`
                          : "Congratulations! You've completed the full treatment protocol."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-bold text-blue-800">Pro Tips</h3>
          </div>
          <ul className="text-blue-700 space-y-2">
            <li>• Work in good lighting - natural daylight is best</li>
            <li>• Take breaks if needed - this can be tedious</li>
            <li>• Clean your comb frequently during treatment</li>
            <li>• Don't skip the waiting time - enzymes need time to work</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Camera className="w-6 h-6 text-yellow-600 mr-3" />
            <h3 className="text-lg font-bold text-yellow-800">Document Progress</h3>
          </div>
          <p className="text-yellow-700">
            Take before/after photos each day. This helps track progress and ensures you don't miss any areas. 
            Photos also help if you need to consult with healthcare providers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TreatmentProtocol;