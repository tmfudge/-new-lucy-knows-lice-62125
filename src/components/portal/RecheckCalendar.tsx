import React, { useState } from 'react';
import { Calendar, CheckCircle, AlertTriangle, Clock, Camera } from 'lucide-react';
import { useTreatment } from '../../contexts/TreatmentContext';

const RecheckCalendar: React.FC = () => {
  const { state, dispatch } = useTreatment();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const toggleCheck = (eventId: string, findings?: string) => {
    dispatch({ 
      type: 'TOGGLE_RECHECK_EVENT', 
      payload: { id: eventId, findings } 
    });
  };

  const getPriorityColor = (priority: string, completed: boolean) => {
    if (completed) return 'bg-green-100 border-green-500 text-green-800';
    
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-500 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-500 text-yellow-800';
      default: return 'bg-gray-50 border-gray-300 text-gray-700';
    }
  };

  const selectedDateData = state.recheckEvents.find(d => d.date === selectedDate);
  const completedChecks = state.recheckEvents.filter(e => e.completed).length;
  const criticalChecks = state.recheckEvents.filter(e => e.checkType === 'critical' && e.completed).length;
  const totalCriticalChecks = state.recheckEvents.filter(e => e.checkType === 'critical').length;

  const today = new Date().toISOString().split('T')[0];
  const currentDayEvent = state.recheckEvents.find(e => e.date === today);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
        <div className="flex items-center mb-4">
          <Calendar className="w-8 h-8 text-purple-600 mr-3" />
          <h1 className="text-3xl font-bold text-purple-800">21-Day Recheck Calendar</h1>
        </div>
        <p className="text-purple-700 text-lg">
          The secret to preventing re-infestation. Follow this schedule to catch any missed lice before they mature.
        </p>
        
        {!state.treatmentStartDate && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-purple-300">
            <p className="text-purple-800">
              <strong>Start your treatment first</strong> to generate your personalized 21-day recheck calendar.
            </p>
          </div>
        )}
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed Checks</p>
              <p className="text-2xl font-bold text-gray-900">{completedChecks}/21</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-red-500 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical Checks</p>
              <p className="text-2xl font-bold text-gray-900">{criticalChecks}/{totalCriticalChecks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Days Remaining</p>
              <p className="text-2xl font-bold text-gray-900">
                {state.treatmentStartDate ? Math.max(0, 21 - state.currentDay) : 21}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((completedChecks / 21) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {state.treatmentStartDate ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recheck Schedule</h2>
              
              <div className="grid grid-cols-7 gap-2">
                {state.recheckEvents.map((day) => {
                  const isCompleted = day.completed;
                  const isSelected = selectedDate === day.date;
                  const isToday = day.date === today;
                  const isPast = day.date < today;
                  
                  return (
                    <button
                      key={day.date}
                      onClick={() => setSelectedDate(day.date)}
                      className={`
                        p-3 rounded-lg border-2 text-center transition-all duration-200 relative
                        ${isSelected ? 'ring-2 ring-purple-500' : ''}
                        ${isToday ? 'ring-2 ring-blue-500' : ''}
                        ${getPriorityColor(day.priority, isCompleted)}
                        hover:shadow-md
                      `}
                    >
                      <div className="text-xs font-medium">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-lg font-bold">
                        {new Date(day.date).getDate()}
                      </div>
                      <div className="text-xs">
                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      
                      {/* Priority indicator */}
                      {day.checkType === 'critical' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                      )}
                      {day.checkType === 'important' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full" />
                      )}
                      
                      {/* Completion indicator */}
                      {isCompleted && (
                        <div className="absolute -bottom-1 -right-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      )}
                      
                      {/* Today indicator */}
                      {isToday && (
                        <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Day Details */}
          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
              {selectedDateData ? (
                <>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Day {selectedDateData.day} Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Date:</span>
                      <p className="text-gray-900">
                        {new Date(selectedDateData.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-600">Check Type:</span>
                      <p className={`inline-block px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                        selectedDateData.checkType === 'critical' ? 'bg-red-100 text-red-800' :
                        selectedDateData.checkType === 'important' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedDateData.checkType || 'Optional'}
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-600">Description:</span>
                      <p className="text-gray-900">{selectedDateData.description}</p>
                    </div>
                    
                    {selectedDateData.completed && selectedDateData.findings && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">Findings:</span>
                        <p className="text-gray-900">{selectedDateData.findings}</p>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={() => toggleCheck(selectedDateData.id, 'Check completed - no live lice found')}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                          selectedDateData.completed
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      >
                        {selectedDateData.completed 
                          ? 'Check Completed ✓' 
                          : 'Mark as Complete'
                        }
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a date to view details</p>
                </div>
              )}
            </div>

            {/* Today's Check */}
            {currentDayEvent && !currentDayEvent.completed && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-bold text-blue-800">Today's Check</h3>
                </div>
                <p className="text-blue-700 mb-4">
                  Day {currentDayEvent.day}: {currentDayEvent.description}
                </p>
                <button
                  onClick={() => toggleCheck(currentDayEvent.id, 'Today\'s check completed')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Complete Today's Check
                </button>
              </div>
            )}

            {/* Quick Tips */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Camera className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-bold text-blue-800">Recheck Tips</h3>
              </div>
              <ul className="text-blue-700 space-y-2 text-sm">
                <li>• Use bright lighting for all checks</li>
                <li>• Focus on behind ears and nape of neck</li>
                <li>• Take photos to track progress</li>
                <li>• Don't skip critical check days</li>
                <li>• If you find live lice, restart treatment</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calendar Not Available</h2>
          <p className="text-gray-600 mb-6">
            Start your treatment to generate your personalized 21-day recheck calendar with critical dates and reminders.
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Calendar Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-3" />
            <span className="text-sm text-gray-700">Critical Check Days - Must not skip</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3" />
            <span className="text-sm text-gray-700">Important Check Days - Recommended</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded-full mr-3" />
            <span className="text-sm text-gray-700">Optional Check Days - If time permits</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecheckCalendar;