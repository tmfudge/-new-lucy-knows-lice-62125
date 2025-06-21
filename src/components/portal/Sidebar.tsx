import React from 'react';
import { 
  Home, 
  AlertTriangle, 
  Target, 
  Calendar, 
  Users, 
  CheckSquare, 
  Heart, 
  TrendingUp, 
  BookOpen, 
  MessageCircle, 
  Settings as SettingsIcon,
  X
} from 'lucide-react';
import { PortalSection } from '../../pages/Portal';

interface SidebarProps {
  activeSection: PortalSection;
  setActiveSection: (section: PortalSection) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard' as PortalSection, label: 'Dashboard', icon: Home, color: 'text-blue-600' },
    { id: 'emergency' as PortalSection, label: 'Emergency Guide', icon: AlertTriangle, color: 'text-red-600' },
    { id: 'treatment' as PortalSection, label: 'Treatment Protocol', icon: Target, color: 'text-green-600' },
    { id: 'calendar' as PortalSection, label: 'Recheck Calendar', icon: Calendar, color: 'text-purple-600' },
    { id: 'screening' as PortalSection, label: 'Family Screening', icon: Users, color: 'text-indigo-600' },
    { id: 'cleaning' as PortalSection, label: 'Cleaning Checklist', icon: CheckSquare, color: 'text-teal-600' },
    { id: 'worry' as PortalSection, label: 'Worry vs Chill', icon: Heart, color: 'text-pink-600' },
    { id: 'progress' as PortalSection, label: 'Progress Tracker', icon: TrendingUp, color: 'text-orange-600' },
    { id: 'resources' as PortalSection, label: 'Resource Library', icon: BookOpen, color: 'text-yellow-600' },
    { id: 'support' as PortalSection, label: 'Support Chat', icon: MessageCircle, color: 'text-green-500' },
    { id: 'settings' as PortalSection, label: 'Settings', icon: SettingsIcon, color: 'text-gray-600' },
  ];

  const handleItemClick = (section: PortalSection) => {
    setActiveSection(section);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/lucy-bug.png" 
                alt="Lucy" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Lucy's Portal</h1>
              <p className="text-xs text-gray-500">Lice Survival Kit</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-orange-50 text-orange-700 border-r-2 border-orange-500' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-orange-600' : item.color}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Emergency contact */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
              <span className="text-sm font-medium text-red-800">Emergency Help</span>
            </div>
            <p className="text-xs text-red-600 mt-1">
              Need immediate assistance? Click Support Chat above.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;