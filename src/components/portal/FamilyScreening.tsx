import React, { useState } from 'react';
import { Users, Plus, CheckCircle, AlertTriangle, Eye, Camera } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  lastChecked: string;
  status: 'clear' | 'infected' | 'pending' | 'needs-check';
  notes: string;
}

const FamilyScreening: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Emma',
      relationship: 'Child',
      lastChecked: '2024-01-15',
      status: 'infected',
      notes: 'Initial case - treatment started'
    },
    {
      id: '2',
      name: 'Mom',
      relationship: 'Parent',
      lastChecked: '2024-01-15',
      status: 'clear',
      notes: 'No signs of lice found'
    },
    {
      id: '3',
      name: 'Dad',
      relationship: 'Parent',
      lastChecked: '2024-01-14',
      status: 'needs-check',
      notes: 'Due for recheck'
    },
    {
      id: '4',
      name: 'Jake',
      relationship: 'Sibling',
      lastChecked: '',
      status: 'pending',
      notes: 'Not yet checked'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'clear': return 'bg-green-100 text-green-800 border-green-200';
      case 'infected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'needs-check': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clear': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'infected': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'pending': return <Eye className="w-5 h-5 text-yellow-600" />;
      case 'needs-check': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default: return <Eye className="w-5 h-5 text-gray-600" />;
    }
  };

  const updateMemberStatus = (memberId: string, newStatus: FamilyMember['status'], notes?: string) => {
    setFamilyMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { 
            ...member, 
            status: newStatus, 
            lastChecked: new Date().toISOString().split('T')[0],
            notes: notes || member.notes
          }
        : member
    ));
  };

  const screeningSteps = [
    {
      step: 1,
      title: "Prepare the Environment",
      description: "Good lighting, comfortable seating, have supplies ready",
      time: "2 minutes"
    },
    {
      step: 2,
      title: "Visual Inspection",
      description: "Look for live lice moving on the scalp and hair",
      time: "5 minutes"
    },
    {
      step: 3,
      title: "Check for Nits",
      description: "Look for eggs attached to hair shafts, especially behind ears",
      time: "10 minutes"
    },
    {
      step: 4,
      title: "Comb Check",
      description: "Use fine-tooth comb to catch anything missed visually",
      time: "10 minutes"
    },
    {
      step: 5,
      title: "Document Results",
      description: "Record findings and take photos if needed",
      time: "2 minutes"
    }
  ];

  const preventionTips = [
    "Avoid head-to-head contact during play and activities",
    "Don't share hats, helmets, hair accessories, or brushes",
    "Store personal items separately at school/daycare",
    "Check heads weekly during lice season (back-to-school time)",
    "Teach children about lice prevention without creating fear",
    "Notify close contacts if lice are found"
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
        <div className="flex items-center mb-4">
          <Users className="w-8 h-8 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-indigo-800">Family Screening & Prevention</h1>
        </div>
        <p className="text-indigo-700 text-lg">
          Check everyone in your household and learn how to prevent future infestations.
        </p>
      </div>

      {/* Family Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{familyMembers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Clear</p>
              <p className="text-2xl font-bold text-gray-900">
                {familyMembers.filter(m => m.status === 'clear').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-red-500 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Infected</p>
              <p className="text-2xl font-bold text-gray-900">
                {familyMembers.filter(m => m.status === 'infected').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-3 rounded-lg">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Need Check</p>
              <p className="text-2xl font-bold text-gray-900">
                {familyMembers.filter(m => m.status === 'pending' || m.status === 'needs-check').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Family Members List */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Family Members</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </button>
            </div>

            <div className="space-y-4">
              {familyMembers.map((member) => (
                <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-lg font-bold text-gray-600">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.relationship}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(member.status)}`}>
                        <div className="flex items-center">
                          {getStatusIcon(member.status)}
                          <span className="ml-2 capitalize">{member.status.replace('-', ' ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Last Checked:</span>
                      <p className="text-gray-900">
                        {member.lastChecked 
                          ? new Date(member.lastChecked).toLocaleDateString()
                          : 'Never'
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Notes:</span>
                      <p className="text-gray-900">{member.notes || 'No notes'}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateMemberStatus(member.id, 'clear', 'Checked - no lice found')}
                      className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
                    >
                      Mark Clear
                    </button>
                    <button
                      onClick={() => updateMemberStatus(member.id, 'infected', 'Lice found - needs treatment')}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
                    >
                      Mark Infected
                    </button>
                    <button
                      onClick={() => updateMemberStatus(member.id, 'needs-check', 'Scheduled for recheck')}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
                    >
                      Needs Recheck
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Screening Guide */}
        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Screening Steps</h3>
            <div className="space-y-4">
              {screeningSteps.map((step) => (
                <div key={step.step} className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">{step.description}</p>
                    <span className="text-xs text-gray-500">~{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prevention Tips */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-bold text-green-800">Prevention Tips</h3>
            </div>
            <ul className="text-green-700 space-y-2">
              {preventionTips.map((tip, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* What to Look For Guide */}
      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">What to Look For During Screening</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Live Lice</h3>
            <p className="text-sm text-gray-600">
              Small, brown insects that move quickly. About the size of a sesame seed. Look for movement on the scalp.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Nits (Eggs)</h3>
            <p className="text-sm text-gray-600">
              Oval-shaped, white/yellow eggs glued to hair shafts. Found close to the scalp, especially behind ears.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Red Bumps</h3>
            <p className="text-sm text-gray-600">
              Small red bumps or scratches on the scalp, neck, or shoulders from scratching lice bites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyScreening;