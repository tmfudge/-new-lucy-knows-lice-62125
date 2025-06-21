import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Users, TrendingUp, BookOpen, Calendar, Target } from 'lucide-react';
import { useTreatment } from '../../contexts/TreatmentContext';

const Dashboard: React.FC = () => {
  const { state, dispatch } = useTreatment();

  const startTreatment = () => {
    const today = new Date().toISOString().split('T')[0];
    dispatch({ type: 'SET_TREATMENT_START_DATE', payload: today });
  };

  const getDaysSinceStart = () => {
    if (!state.treatmentStartDate) return 0;
    const start = new Date(state.treatmentStartDate);
    const today = new Date();
    const diffTime = today.getTime() - start.getTime();
    return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  };

  const getCompletedTasks = () => {
    const treatmentCompleted = state.treatmentTasks.filter(t => t.completed).length;
    const cleaningCompleted = state.cleaningTasks.filter(t => t.completed).length;
    const recheckCompleted = state.recheckEvents.filter(r => r.completed).length;
    const emergencyCompleted = state.emergencyStepsCompleted.length;
    
    const totalTasks = state.treatmentTasks.length + state.cleaningTasks.length + state.recheckEvents.length + 6; // 6 emergency steps
    const completedTasks = treatmentCompleted + cleaningCompleted + recheckCompleted + emergencyCompleted;
    
    return { completed: completedTasks, total: totalTasks };
  };

  const getUrgentTasks = () => {
    const tasks = [];
    const today = new Date().toISOString().split('T')[0];
    
    // Check for today's treatment tasks
    const todayTasks = state.treatmentTasks.filter(t => 
      t.day === state.currentDay && !t.completed && t.critical
    );
    
    // Check for overdue recheck events
    const overdueRechecks = state.recheckEvents.filter(r => 
      r.date <= today && !r.completed && r.priority === 'high'
    );
    
    // Check for high priority cleaning tasks
    const urgentCleaning = state.cleaningTasks.filter(t => 
      t.priority === 'high' && !t.completed
    );
    
    todayTasks.forEach(task => tasks.push({
      task: `Day ${task.day}: ${task.title}`,
      priority: 'high',
      dueIn: 'Today',
      type: 'treatment'
    }));
    
    overdueRechecks.forEach(recheck => tasks.push({
      task: `Day ${recheck.day} Recheck`,
      priority: 'high',
      dueIn: recheck.date === today ? 'Today' : 'Overdue',
      type: 'recheck'
    }));
    
    urgentCleaning.slice(0, 3).forEach(clean => tasks.push({
      task: clean.task,
      priority: 'medium',
      dueIn: '1 day',
      type: 'cleaning'
    }));
    
    return tasks.slice(0, 5); // Limit to 5 most urgent
  };

  const getRecentActivity = () => {
    const activities = [];
    
    // Recent completed tasks
    const recentTreatment = state.treatmentTasks
      .filter(t => t.completed && t.completedDate)
      .sort((a, b) => new Date(b.completedDate!).getTime() - new Date(a.completedDate!).getTime())
      .slice(0, 2);
    
    const recentCleaning = state.cleaningTasks
      .filter(t => t.completed && t.completedDate)
      .sort((a, b) => new Date(b.completedDate!).getTime() - new Date(a.completedDate!).getTime())
      .slice(0, 2);
    
    recentTreatment.forEach(task => {
      const date = new Date(task.completedDate!);
      activities.push({
        action: `Completed: ${task.title}`,
        time: formatTimeAgo(date),
        status: 'completed'
      });
    });
    
    recentCleaning.forEach(task => {
      const date = new Date(task.completedDate!);
      activities.push({
        action: `Completed: ${task.task}`,
        time: formatTimeAgo(date),
        status: 'completed'
      });
    });
    
    // Add upcoming tasks
    const upcomingRecheck = state.recheckEvents.find(r => 
      r.date > new Date().toISOString().split('T')[0] && !r.completed
    );
    
    if (upcomingRecheck) {
      activities.push({
        action: `Day ${upcomingRecheck.day} recheck scheduled`,
        time: formatDate(upcomingRecheck.date),
        status: 'upcoming'
      });
    }
    
    return activities.slice(0, 4);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (dateStr === today.toISOString().split('T')[0]) return 'Today';
    if (dateStr === tomorrow.toISOString().split('T')[0]) return 'Tomorrow';
    
    const diffDays = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return `In ${diffDays} days`;
  };

  const daysSinceStart = getDaysSinceStart();
  const { completed: completedTasks, total: totalTasks } = getCompletedTasks();
  const urgentTasks = getUrgentTasks();
  const recentActivity = getRecentActivity();
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const quickStats = [
    { 
      label: 'Days Since Treatment', 
      value: state.treatmentStartDate ? daysSinceStart.toString() : 'Not Started', 
      icon: Clock, 
      color: 'bg-blue-500' 
    },
    { 
      label: 'Family Members Checked', 
      value: `${state.familyMembers.filter(m => m.status !== 'pending').length}/${state.familyMembers.length}`, 
      icon: Users, 
      color: 'bg-green-500' 
    },
    { 
      label: 'Tasks Completed', 
      value: `${completedTasks}/${totalTasks}`, 
      icon: CheckCircle, 
      color: 'bg-purple-500' 
    },
    { 
      label: 'Progress Score', 
      value: `${progressPercentage}%`, 
      icon: TrendingUp, 
      color: 'bg-orange-500' 
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
        <p className="text-gray-600">
          {state.treatmentStartDate 
            ? `Day ${state.currentDay} of your lice treatment journey. Here's your progress and what needs attention today.`
            : "Ready to start your lice treatment? Let's get you set up for success."
          }
        </p>
      </div>

      {/* Treatment Start CTA */}
      {!state.treatmentStartDate && (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to Start Treatment?</h2>
              <p className="text-orange-100 mb-4">
                Click below to begin your 21-day lice elimination protocol. This will set up your calendar, 
                tasks, and tracking system.
              </p>
            </div>
            <button
              onClick={startTreatment}
              className="bg-white text-orange-600 font-bold py-3 px-6 rounded-lg hover:bg-orange-50 transition-colors flex items-center"
            >
              <Target className="w-5 h-5 mr-2" />
              Start Treatment Today
            </button>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Urgent Tasks */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Urgent Tasks</h2>
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            
            {urgentTasks.length > 0 ? (
              <div className="space-y-4">
                {urgentTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <span className="font-medium text-gray-900">{task.task}</span>
                    </div>
                    <span className="text-sm text-gray-500">Due {task.dueIn}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600">No urgent tasks right now. Great job!</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Emergency Guide
              </button>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Start Treatment
              </button>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Check Family
              </button>
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                View Calendar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-4 ${
                      activity.status === 'completed' ? 'bg-green-500' :
                      activity.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <span className="text-gray-900">{activity.action}</span>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No recent activity. Start your treatment to see progress here!</p>
            </div>
          )}
        </div>
      </div>

      {/* Tips of the Day */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 text-orange-600 mr-3" />
            <h3 className="text-lg font-bold text-orange-800">Today's Tip</h3>
          </div>
          <p className="text-orange-700">
            Remember to check behind the ears and at the nape of the neck - these are the most common spots for lice to hide!
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-bold text-green-800">Success Reminder</h3>
          </div>
          <p className="text-green-700">
            You're doing great! Following the protocol step-by-step is the key to success. Stay consistent!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;