import React, { useState } from 'react';
import { CheckSquare, Home, Clock, AlertTriangle, Trash2 } from 'lucide-react';

interface CleaningTask {
  id: string;
  category: string;
  task: string;
  priority: 'high' | 'medium' | 'low';
  timeEstimate: string;
  description: string;
  completed: boolean;
}

const CleaningChecklist: React.FC = () => {
  const [tasks, setTasks] = useState<CleaningTask[]>([
    // High Priority - Day 1
    { id: '1', category: 'Bedding', task: 'Wash all bedding in hot water (130°F+)', priority: 'high', timeEstimate: '15 min', description: 'Sheets, pillowcases, blankets from infected person\'s bed', completed: false },
    { id: '2', category: 'Clothing', task: 'Wash clothes worn in last 2 days', priority: 'high', timeEstimate: '20 min', description: 'Hot water wash and high heat dry for 40+ minutes', completed: false },
    { id: '3', category: 'Personal Items', task: 'Bag personal items for 2 weeks', priority: 'high', timeEstimate: '10 min', description: 'Stuffed animals, pillows, hats that can\'t be washed', completed: false },
    { id: '4', category: 'Hair Tools', task: 'Soak brushes and combs in hot water', priority: 'high', timeEstimate: '5 min', description: '130°F water for 10 minutes, then clean thoroughly', completed: false },
    
    // Medium Priority - Day 2-3
    { id: '5', category: 'Furniture', task: 'Vacuum upholstered furniture', priority: 'medium', timeEstimate: '20 min', description: 'Focus on areas where head contact occurs', completed: false },
    { id: '6', category: 'Car', task: 'Vacuum car seats and headrests', priority: 'medium', timeEstimate: '15 min', description: 'Pay attention to fabric seats and headrests', completed: false },
    { id: '7', category: 'Bedding', task: 'Wash other family bedding', priority: 'medium', timeEstimate: '30 min', description: 'Preventive washing of all household bedding', completed: false },
    { id: '8', category: 'Floors', task: 'Vacuum carpets and rugs', priority: 'medium', timeEstimate: '25 min', description: 'Focus on bedrooms and common areas', completed: false },
    
    // Low Priority - Week 1
    { id: '9', category: 'Deep Clean', task: 'Wipe down hard surfaces', priority: 'low', timeEstimate: '15 min', description: 'Nightstands, dressers, light switches', completed: false },
    { id: '10', category: 'Laundry', task: 'Wash towels and washcloths', priority: 'low', timeEstimate: '20 min', description: 'All towels used by infected person', completed: false },
    { id: '11', category: 'Organization', task: 'Clean and organize closets', priority: 'low', timeEstimate: '30 min', description: 'Remove clutter, vacuum closet floors', completed: false },
    { id: '12', category: 'Deep Clean', task: 'Steam clean carpets (optional)', priority: 'low', timeEstimate: '60 min', description: 'Professional or rental steam cleaning', completed: false },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Bedding', 'Clothing', 'Personal Items', 'Hair Tools', 'Furniture', 'Car', 'Floors', 'Deep Clean', 'Laundry', 'Organization'];

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const mythBusters = [
    {
      myth: "You need to clean everything in your house",
      reality: "Lice can only survive 24-48 hours off the human head. Focus on items with recent head contact."
    },
    {
      myth: "Lice live in carpets and furniture",
      reality: "Lice rarely fall off heads and can't survive long without blood meals. Quick vacuuming is sufficient."
    },
    {
      myth: "You need special lice sprays for furniture",
      reality: "Regular vacuuming is more effective and safer than chemical sprays."
    },
    {
      myth: "Everything needs to be washed in hot water",
      reality: "Only items with direct head contact in the last 48 hours need hot water washing."
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8">
        <div className="flex items-center mb-4">
          <CheckSquare className="w-8 h-8 text-teal-600 mr-3" />
          <h1 className="text-3xl font-bold text-teal-800">Smart Cleaning Checklist</h1>
        </div>
        <p className="text-teal-700 text-lg">
          Focus your energy on what actually matters. Don't waste time over-cleaning!
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-teal-500 p-3 rounded-lg">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tasks Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedTasks}/{totalTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-red-500 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks.filter(t => t.priority === 'high' && t.completed).length}/
                {tasks.filter(t => t.priority === 'high').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Est. Time Left</p>
              <p className="text-2xl font-bold text-gray-900">
                {tasks.filter(t => !t.completed).reduce((acc, task) => {
                  const time = parseInt(task.timeEstimate);
                  return acc + (isNaN(time) ? 0 : time);
                }, 0)} min
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(progressPercentage)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Overall Progress</h2>
          <span className="text-sm text-gray-600">{completedTasks} of {totalTasks} completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-teal-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Category Filter */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    w-full text-left p-3 rounded-lg transition-colors capitalize
                    ${selectedCategory === category 
                      ? 'bg-teal-50 text-teal-800 border border-teal-200' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {category}
                  {category !== 'all' && (
                    <span className="ml-2 text-sm text-gray-500">
                      ({tasks.filter(t => t.category === category).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {selectedCategory === 'all' ? 'All Tasks' : `${selectedCategory} Tasks`}
            </h2>
            
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div key={task.id} className={`
                  border rounded-lg p-4 transition-all duration-200
                  ${task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}
                `}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start flex-1">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`
                          w-6 h-6 rounded border-2 flex items-center justify-center mr-4 mt-1 transition-colors
                          ${task.completed 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-300 hover:border-gray-400'
                          }
                        `}
                      >
                        {task.completed && <CheckSquare className="w-4 h-4" />}
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-bold ${task.completed ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                            {task.task}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {task.timeEstimate}
                            </div>
                          </div>
                        </div>
                        
                        <p className={`text-sm ${task.completed ? 'text-green-700' : 'text-gray-600'}`}>
                          {task.description}
                        </p>
                        
                        <div className="mt-2">
                          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {task.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Myth Busters */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center mb-6">
          <Trash2 className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-xl font-bold text-blue-800">Cleaning Myth Busters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mythBusters.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
              <div className="mb-3">
                <span className="text-red-600 font-bold text-sm">MYTH: </span>
                <span className="text-gray-800">{item.myth}</span>
              </div>
              <div>
                <span className="text-green-600 font-bold text-sm">REALITY: </span>
                <span className="text-gray-800">{item.reality}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-red-800 mb-4">🔥 Do First (Day 1)</h3>
          <ul className="text-red-700 space-y-2 text-sm">
            <li>• Wash infected person's bedding</li>
            <li>• Bag items that can't be washed</li>
            <li>• Clean hair tools thoroughly</li>
            <li>• Wash recently worn clothes</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-yellow-800 mb-4">⚡ Do Soon (Day 2-3)</h3>
          <ul className="text-yellow-700 space-y-2 text-sm">
            <li>• Vacuum furniture and car</li>
            <li>• Wash other family bedding</li>
            <li>• Quick vacuum of carpets</li>
            <li>• Wipe down surfaces</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-green-800 mb-4">✨ Optional (Week 1)</h3>
          <ul className="text-green-700 space-y-2 text-sm">
            <li>• Deep clean carpets</li>
            <li>• Organize closets</li>
            <li>• Wash all towels</li>
            <li>• Extra surface cleaning</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CleaningChecklist;