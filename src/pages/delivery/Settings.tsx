import React, { useState } from 'react';
import { Bell, Shield, DollarSign, Navigation, Smartphone, Mail, Lock, Eye, EyeOff, MapPin } from 'lucide-react';

const DeliverySettings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('notifications');
  const [showPassword, setShowPassword] = useState(false);
  
  const [settings, setSettings] = useState({
    notifications: {
      newOrders: true,
      orderUpdates: true,
      earnings: true,
      promotions: false,
      systemUpdates: true,
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true
    },
    privacy: {
      shareLocation: true,
      shareEarnings: false,
      allowRatings: true,
      dataCollection: true
    },
    earnings: {
      autoWithdraw: true,
      withdrawalDay: 'friday',
      minimumBalance: '50',
      taxDocuments: true
    },
    delivery: {
      maxDistance: '10',
      autoAccept: false,
      workingHours: {
        start: '09:00',
        end: '21:00'
      },
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      vehicleType: 'car',
      navigationApp: 'google_maps'
    }
  });

  const handleToggle = (section: string, key: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: !(prev[section as keyof typeof prev] as any)[key]
      }
    }));
  };

  const handleInputChange = (section: string, key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleWorkingDaysChange = (day: string) => {
    setSettings(prev => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        workingDays: prev.delivery.workingDays.includes(day)
          ? prev.delivery.workingDays.filter(d => d !== day)
          : [...prev.delivery.workingDays, day]
      }
    }));
  };

  const sections = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'delivery', label: 'Delivery', icon: Navigation }
  ];

  const days = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Delivery Settings</h1>
        <p className="text-gray-600">Manage your delivery preferences and account settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64">
          <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <ul className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-orange-50 text-orange-700 border-r-2 border-orange-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`mr-3 h-5 w-5 ${activeSection === section.id ? 'text-orange-500' : 'text-gray-400'}`} />
                      {section.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Notifications Settings */}
            {activeSection === 'notifications' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Order Notifications</h4>
                    <div className="space-y-3">
                      {[
                        { key: 'newOrders', label: 'New order alerts', desc: 'Get notified when new orders are available' },
                        { key: 'orderUpdates', label: 'Order status updates', desc: 'Updates about your active deliveries' },
                        { key: 'earnings', label: 'Earnings updates', desc: 'Daily and weekly earnings summaries' },
                        { key: 'promotions', label: 'Promotions & bonuses', desc: 'Special earning opportunities' },
                        { key: 'systemUpdates', label: 'System updates', desc: 'App updates and maintenance notices' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{item.label}</p>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.notifications[item.key as keyof typeof settings.notifications] as boolean}
                              onChange={() => handleToggle('notifications', item.key)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Delivery Methods</h4>
                    <div className="space-y-3">
                      {[
                        { key: 'emailNotifications', label: 'Email notifications', icon: Mail },
                        { key: 'smsNotifications', label: 'SMS notifications', icon: Smartphone },
                        { key: 'pushNotifications', label: 'Push notifications', icon: Bell }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <item.icon className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="font-medium text-gray-900">{item.label}</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.notifications[item.key as keyof typeof settings.notifications] as boolean}
                              onChange={() => handleToggle('notifications', item.key)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeSection === 'privacy' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Data Sharing</h4>
                    <div className="space-y-4">
                      {[
                        { key: 'shareLocation', label: 'Share location data', desc: 'Allow customers to track your location during delivery' },
                        { key: 'shareEarnings', label: 'Share earnings data', desc: 'Include your earnings in platform analytics' },
                        { key: 'allowRatings', label: 'Allow customer ratings', desc: 'Let customers rate your delivery service' },
                        { key: 'dataCollection', label: 'Performance data collection', desc: 'Help improve the platform with usage data' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{item.label}</p>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.privacy[item.key as keyof typeof settings.privacy] as boolean}
                              onChange={() => handleToggle('privacy', item.key)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Account Security</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Change Password</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="New password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                          <input
                            type="password"
                            placeholder="Confirm password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                        <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Earnings Settings */}
            {activeSection === 'earnings' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Earnings Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Withdrawal Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Auto Withdrawal</p>
                          <p className="text-sm text-gray-600">Automatically withdraw earnings weekly</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.earnings.autoWithdraw}
                            onChange={() => handleToggle('earnings', 'autoWithdraw')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Day</label>
                          <select
                            value={settings.earnings.withdrawalDay}
                            onChange={(e) => handleInputChange('earnings', 'withdrawalDay', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Balance ($)</label>
                          <input
                            type="number"
                            value={settings.earnings.minimumBalance}
                            onChange={(e) => handleInputChange('earnings', 'minimumBalance', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Tax Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Automatic tax documents</p>
                          <p className="text-sm text-gray-600">Generate and send tax documents automatically</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.earnings.taxDocuments}
                            onChange={() => handleToggle('earnings', 'taxDocuments')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Settings */}
            {activeSection === 'delivery' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Delivery Preferences</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Order Preferences</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Auto-accept orders</p>
                          <p className="text-sm text-gray-600">Automatically accept orders within your preferences</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.delivery.autoAccept}
                            onChange={() => handleToggle('delivery', 'autoAccept')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Distance (km)</label>
                          <select
                            value={settings.delivery.maxDistance}
                            onChange={(e) => handleInputChange('delivery', 'maxDistance', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="5">5 km</option>
                            <option value="10">10 km</option>
                            <option value="15">15 km</option>
                            <option value="20">20 km</option>
                            <option value="25">25 km</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                          <select
                            value={settings.delivery.vehicleType}
                            onChange={(e) => handleInputChange('delivery', 'vehicleType', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          >
                            <option value="bike">Bicycle</option>
                            <option value="motorcycle">Motorcycle</option>
                            <option value="car">Car</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Navigation App</label>
                        <select
                          value={settings.delivery.navigationApp}
                          onChange={(e) => handleInputChange('delivery', 'navigationApp', e.target.value)}
                          className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="google_maps">Google Maps</option>
                          <option value="apple_maps">Apple Maps</option>
                          <option value="waze">Waze</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Working Schedule</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="time"
                            value={settings.delivery.workingHours.start}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              delivery: {
                                ...prev.delivery,
                                workingHours: {
                                  ...prev.delivery.workingHours,
                                  start: e.target.value
                                }
                              }
                            }))}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={settings.delivery.workingHours.end}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              delivery: {
                                ...prev.delivery,
                                workingHours: {
                                  ...prev.delivery.workingHours,
                                  end: e.target.value
                                }
                              }
                            }))}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {days.map((day) => (
                            <label key={day.id} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={settings.delivery.workingDays.includes(day.id)}
                                onChange={() => handleWorkingDaysChange(day.id)}
                                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                              />
                              <span className="ml-2 text-sm text-gray-700">{day.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Reset to Default
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliverySettings;