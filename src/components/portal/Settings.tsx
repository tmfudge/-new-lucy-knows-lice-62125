import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Download, Trash2, Eye, EyeOff } from 'lucide-react';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    recheckReminders: true,
    treatmentAlerts: true,
    progressUpdates: false,
    supportMessages: true,
    emailDigest: true
  });

  const [privacy, setPrivacy] = useState({
    shareProgress: false,
    anonymousData: true,
    marketingEmails: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handlePrivacyChange = (key: string) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex items-center mb-4">
          <SettingsIcon className="w-8 h-8 text-gray-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        </div>
        <p className="text-gray-700 text-lg">
          Customize your portal experience and manage your account preferences.
        </p>
      </div>

      <div className="space-y-8">
        {/* Profile Settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center mb-6">
            <User className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                defaultValue="Sarah"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                defaultValue="Johnson"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                defaultValue="sarah.johnson@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                defaultValue="currentpassword"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Save Changes
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
              Cancel
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center mb-6">
            <Bell className="w-6 h-6 text-yellow-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {key === 'recheckReminders' && 'Recheck Reminders'}
                    {key === 'treatmentAlerts' && 'Treatment Alerts'}
                    {key === 'progressUpdates' && 'Progress Updates'}
                    {key === 'supportMessages' && 'Support Messages'}
                    {key === 'emailDigest' && 'Weekly Email Digest'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {key === 'recheckReminders' && 'Get notified when it\'s time for your next lice check'}
                    {key === 'treatmentAlerts' && 'Important alerts about treatment steps and timing'}
                    {key === 'progressUpdates' && 'Updates on your treatment progress and milestones'}
                    {key === 'supportMessages' && 'Notifications for new support messages and responses'}
                    {key === 'emailDigest' && 'Weekly summary of your progress and upcoming tasks'}
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange(key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center mb-6">
            <Shield className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">Privacy & Data</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {key === 'shareProgress' && 'Share Progress Data'}
                    {key === 'anonymousData' && 'Anonymous Usage Data'}
                    {key === 'marketingEmails' && 'Marketing Communications'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {key === 'shareProgress' && 'Allow your progress to be shared anonymously to help other families'}
                    {key === 'anonymousData' && 'Help improve the portal by sharing anonymous usage statistics'}
                    {key === 'marketingEmails' && 'Receive emails about new features and lice prevention tips'}
                  </p>
                </div>
                <button
                  onClick={() => handlePrivacyChange(key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center mb-6">
            <Download className="w-6 h-6 text-purple-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">Data Management</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Export Your Data</h3>
              <p className="text-sm text-blue-700 mb-3">
                Download a copy of all your treatment data, progress photos, and notes.
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-medium text-red-800 mb-2">Delete Account</h3>
              <p className="text-sm text-red-700 mb-3">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Family Settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Family Members</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  E
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Emma (Age 8)</h3>
                  <p className="text-sm text-gray-600">Primary case - currently in treatment</p>
                </div>
              </div>
              <button className="text-blue-500 hover:text-blue-600 font-medium">Edit</button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  J
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Jake (Age 12)</h3>
                  <p className="text-sm text-gray-600">Sibling - monitoring</p>
                </div>
              </div>
              <button className="text-blue-500 hover:text-blue-600 font-medium">Edit</button>
            </div>
          </div>

          <button className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
            Add Family Member
          </button>
        </div>

        {/* Support */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-green-800 mb-4">Need Help?</h2>
          <p className="text-green-700 mb-4">
            If you have questions about your account or need assistance with any settings, our support team is here to help.
          </p>
          <div className="flex space-x-4">
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Contact Support
            </button>
            <button className="bg-white hover:bg-gray-50 text-green-700 border border-green-300 font-medium py-2 px-4 rounded-lg transition-colors">
              View Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;