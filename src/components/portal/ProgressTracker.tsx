import React, { useState } from 'react';
import { TrendingUp, Calendar, CheckCircle, AlertTriangle, Camera, Award } from 'lucide-react';

const ProgressTracker: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const progressData = {
    week1: {
      title: "Week 1: Active Treatment",
      days: [
        { day: 1, status: 'completed', activity: 'Initial treatment', findings: 'Live lice found, treatment applied', photos: 2 },
        { day: 2, status: 'completed', activity: 'Follow-up check', findings: 'Few dead lice, no live ones', photos: 1 },
        { day: 3, status: 'completed', activity: 'Critical recheck', findings: 'All clear, no live lice', photos: 1 },
        { day: 4, status: 'completed', activity: 'Visual inspection', findings: 'Still clear', photos: 0 },
        { day: 5, status: 'current', activity: 'Quick check', findings: 'Pending', photos: 0 },
        { day: 6, status: 'upcoming', activity: 'Scheduled check', findings: 'Not yet done', photos: 0 },
        { day: 7, status: 'upcoming', activity: 'Week 1 assessment', findings: 'Not yet done', photos: 0 },
      ]
    },
    week2: {
      title: "Week 2: Monitoring Phase",
      days: [
        { day: 8, status: 'upcoming', activity: 'Important recheck', findings: 'Not yet done', photos: 0 },
        { day: 9, status: 'upcoming', activity: 'Visual check', findings: 'Not yet done', photos: 0 },
        { day: 10, status: 'upcoming', activity: 'Scheduled check', findings: 'Not yet done', photos: 0 },
        { day: 11, status: 'upcoming', activity: 'Mid-week check', findings: 'Not yet done', photos: 0 },
        { day: 12, status: 'upcoming', activity: 'Visual inspection', findings: 'Not yet done', photos: 0 },
        { day: 13, status: 'upcoming', activity: 'Critical recheck', findings: 'Not yet done', photos: 0 },
        { day: 14, status: 'upcoming', activity: 'Week 2 assessment', findings: 'Not yet done', photos: 0 },
      ]
    },
    week3: {
      title: "Week 3: Final Monitoring",
      days: [
        { day: 15, status: 'upcoming', activity: 'Important check', findings: 'Not yet done', photos: 0 },
        { day: 16, status: 'upcoming', activity: 'Visual inspection', findings: 'Not yet done', photos: 0 },
        { day: 17, status: 'upcoming', activity: 'Scheduled check', findings: 'Not yet done', photos: 0 },
        { day: 18, status: 'upcoming', activity: 'Final week check', findings: 'Not yet done', photos: 0 },
        { day: 19, status: 'upcoming', activity: 'Visual inspection', findings: 'Not yet done', photos: 0 },
        { day: 20, status: 'upcoming', activity: 'Pre-final check', findings: 'Not yet done', photos: 0 },
        { day: 21, status: 'upcoming', activity: 'FINAL CHECK', findings: 'Not yet done', photos: 0 },
      ]
    }
  };

  const milestones = [
    { day: 1, title: "Treatment Started", description: "Initial enzyme treatment completed", achieved: true },
    { day: 3, title: "First Clear Check", description: "No live lice found on critical recheck", achieved: true },
    { day: 7, title: "Week 1 Complete", description: "Successfully completed active treatment phase", achieved: false },
    { day: 14, title: "Week 2 Complete", description: "Monitoring phase completed successfully", achieved: false },
    { day: 21, title: "Treatment Success", description: "Full 21-day cycle completed lice-free", achieved: false },
  ];

  const familyProgress = [
    { name: 'Emma', status: 'treating', progress: 85, lastCheck: '2 days ago' },
    { name: 'Mom', status: 'clear', progress: 100, lastCheck: '3 days ago' },
    { name: 'Dad', status: 'monitoring', progress: 60, lastCheck: '1 day ago' },
    { name: 'Jake', status: 'clear', progress: 100, lastCheck: '3 days ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'current': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'treating': return 'bg-yellow-500';
      case 'clear': return 'bg-green-500';
      case 'monitoring': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const currentWeekData = progressData[`week${selectedWeek}` as keyof typeof progressData];
  const completedDays = currentWeekData.days.filter(d => d.status === 'completed').length;
  const totalDays = currentWeekData.days.length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-8 h-8 text-orange-600 mr-3" />
          <h1 className="text-3xl font-bold text-orange-800">Progress Tracker</h1>
        </div>
        <p className="text-orange-700 text-lg">
          Track your journey to lice-free success. See your progress and stay motivated!
        </p>
      </div>

      {/* Overall Progress */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Days Completed</p>
              <p className="text-2xl font-bold text-gray-900">4/21</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-lg">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Photos Taken</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-orange-500 p-3 rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Milestones</p>
              <p className="text-2xl font-bold text-gray-900">2/5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Progress */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Weekly Progress</h2>
              <div className="flex space-x-2">
                {[1, 2, 3].map((week) => (
                  <button
                    key={week}
                    onClick={() => setSelectedWeek(week)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedWeek === week
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Week {week}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">{currentWeekData.title}</h3>
                <span className="text-sm text-gray-600">{completedDays}/{totalDays} days completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedDays / totalDays) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {currentWeekData.days.map((day) => (
                <div key={day.day} className={`
                  border rounded-lg p-4 transition-all duration-200
                  ${day.status === 'completed' ? 'bg-green-50 border-green-200' : 
                    day.status === 'current' ? 'bg-blue-50 border-blue-200' : 
                    'bg-gray-50 border-gray-200'}
                `}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                        day.status === 'completed' ? 'bg-green-500' :
                        day.status === 'current' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}>
                        {day.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : day.day}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Day {day.day}: {day.activity}</h4>
                        <p className="text-sm text-gray-600">{day.findings}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {day.photos > 0 && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Camera className="w-4 h-4 mr-1" />
                          {day.photos}
                        </div>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(day.status)}`}>
                        {day.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Milestones */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Milestones</h3>
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div key={milestone.day} className="flex items-start">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 ${
                    milestone.achieved ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {milestone.achieved ? <CheckCircle className="w-4 h-4" /> : milestone.day}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${milestone.achieved ? 'text-green-800' : 'text-gray-700'}`}>
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Family Progress */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Family Progress</h3>
            <div className="space-y-4">
              {familyProgress.map((member) => (
                <div key={member.name} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(member.status)}`}
                        style={{ width: `${member.progress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Last checked: {member.lastCheck}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Prediction */}
      <div className="mt-8 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <Award className="w-6 h-6 text-green-600 mr-3" />
          <h2 className="text-xl font-bold text-green-800">Success Prediction</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">85%</div>
            <p className="text-green-600">Current Success Rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">17</div>
            <p className="text-green-600">Days Remaining</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">High</div>
            <p className="text-green-600">Success Probability</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
          <p className="text-green-800 font-medium">
            🎉 You're doing great! Based on your current progress, you have a high probability of success. 
            Keep following the protocol and you'll be lice-free soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;