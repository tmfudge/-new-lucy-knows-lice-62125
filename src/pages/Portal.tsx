import React, { useState } from 'react';
import { TreatmentProvider } from '../contexts/TreatmentContext';
import Sidebar from '../components/portal/Sidebar';
import Dashboard from '../components/portal/Dashboard';
import EmergencyGuide from '../components/portal/EmergencyGuide';
import TreatmentProtocol from '../components/portal/TreatmentProtocol';
import RecheckCalendar from '../components/portal/RecheckCalendar';
import FamilyScreening from '../components/portal/FamilyScreening';
import CleaningChecklist from '../components/portal/CleaningChecklist';
import WorryGuide from '../components/portal/WorryGuide';
import ProgressTracker from '../components/portal/ProgressTracker';
import ResourceLibrary from '../components/portal/ResourceLibrary';
import SupportChat from '../components/portal/SupportChat';
import Settings from '../components/portal/Settings';

export type PortalSection = 
  | 'dashboard'
  | 'emergency'
  | 'treatment'
  | 'calendar'
  | 'screening'
  | 'cleaning'
  | 'worry'
  | 'progress'
  | 'resources'
  | 'support'
  | 'settings';

function PortalContent() {
  const [activeSection, setActiveSection] = useState<PortalSection>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'emergency':
        return <EmergencyGuide />;
      case 'treatment':
        return <TreatmentProtocol />;
      case 'calendar':
        return <RecheckCalendar />;
      case 'screening':
        return <FamilyScreening />;
      case 'cleaning':
        return <CleaningChecklist />;
      case 'worry':
        return <WorryGuide />;
      case 'progress':
        return <ProgressTracker />;
      case 'resources':
        return <ResourceLibrary />;
      case 'support':
        return <SupportChat />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              L
            </div>
            <span className="font-semibold text-gray-800">Lucy's Portal</span>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

const Portal: React.FC = () => {
  return (
    <TreatmentProvider>
      <PortalContent />
    </TreatmentProvider>
  );
};

export default Portal;