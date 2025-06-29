import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Car, Bike, Recycle as Motorcycle, Star, Shield, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DeliveryProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-01',
    address: '123 Main St, Downtown, City 12345',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+1 (555) 987-6543',
      relationship: 'Spouse'
    },
    vehicle: {
      type: 'car',
      make: 'Toyota',
      model: 'Camry',
      year: '2020',
      licensePlate: 'ABC123',
      color: 'Silver'
    },
    documents: {
      driverLicense: 'DL123456789',
      insurance: 'INS987654321',
      vehicleRegistration: 'VR456789123'
    },
    bankInfo: {
      accountHolder: user?.name || '',
      bankName: 'Chase Bank',
      accountNumber: '****1234',
      routingNumber: '****5678'
    },
    preferences: {
      maxDistance: 10,
      workingHours: {
        start: '09:00',
        end: '21:00'
      },
      workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      notifications: true,
      autoAccept: false
    }
  });

  const stats = [
    { label: 'Total Deliveries', value: '1,248', icon: Star },
    { label: 'Customer Rating', value: '4.8', icon: Star },
    { label: 'Completion Rate', value: '98%', icon: Shield },
    { label: 'Member Since', value: 'Jan 2024', icon: Calendar }
  ];

  const vehicleTypes = [
    { id: 'bike', label: 'Bicycle', icon: Bike },
    { id: 'motorcycle', label: 'Motorcycle', icon: Motorcycle },
    { id: 'car', label: 'Car', icon: Car }
  ];

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setIsEditing(false);
  };

  const handleInputChange = (section: string, key: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleNestedInputChange = (section: string, subsection: string, key: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [subsection]: {
          ...(prev[section as keyof typeof prev] as any)[subsection],
          [key]: value
        }
      }
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delivery Partner Profile</h1>
          <p className="text-gray-600">Manage your delivery partner information and settings</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <Icon className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                {isEditing && (
                  <button className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-60 transition-colors">
                    <Edit2 className="h-5 w-5 text-white" />
                  </button>
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{profileData.name}</h4>
                <p className="text-sm text-gray-600">Delivery Partner since January 2024</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm text-gray-600">4.8 rating • 1,248 deliveries</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <div className="flex items-center text-gray-900">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    {profileData.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <div className="flex items-center text-gray-900">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {profileData.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <div className="flex items-center text-gray-900">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {profileData.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <p className="text-gray-900">{new Date(profileData.dateOfBirth).toLocaleDateString()}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              ) : (
                <div className="flex items-start text-gray-900">
                  <MapPin className="h-4 w-4 mr-2 mt-1 text-gray-400" />
                  {profileData.address}
                </div>
              )}
            </div>

            {/* Emergency Contact */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.emergencyContact.name}
                      onChange={(e) => handleNestedInputChange('emergencyContact', '', 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.emergencyContact.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.emergencyContact.phone}
                      onChange={(e) => handleNestedInputChange('emergencyContact', '', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.emergencyContact.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.emergencyContact.relationship}
                      onChange={(e) => handleNestedInputChange('emergencyContact', '', 'relationship', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.emergencyContact.relationship}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle & Documents */}
        <div className="space-y-6">
          {/* Vehicle Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Vehicle Information</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                {isEditing ? (
                  <div className="space-y-2">
                    {vehicleTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <label key={type.id} className="flex items-center">
                          <input
                            type="radio"
                            name="vehicleType"
                            value={type.id}
                            checked={profileData.vehicle.type === type.id}
                            onChange={(e) => handleNestedInputChange('vehicle', '', 'type', e.target.value)}
                            className="text-orange-500 focus:ring-orange-500"
                          />
                          <Icon className="h-5 w-5 ml-2 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-700">{type.label}</span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center">
                    {vehicleTypes.find(t => t.type === profileData.vehicle.type)?.icon && (
                      React.createElement(vehicleTypes.find(t => t.id === profileData.vehicle.type)!.icon, {
                        className: "h-5 w-5 mr-2 text-gray-400"
                      })
                    )}
                    <span className="text-gray-900">
                      {vehicleTypes.find(t => t.id === profileData.vehicle.type)?.label}
                    </span>
                  </div>
                )}
              </div>

              {profileData.vehicle.type === 'car' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.vehicle.make}
                          onChange={(e) => handleNestedInputChange('vehicle', '', 'make', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.vehicle.make}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.vehicle.model}
                          onChange={(e) => handleNestedInputChange('vehicle', '', 'model', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.vehicle.model}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.vehicle.year}
                          onChange={(e) => handleNestedInputChange('vehicle', '', 'year', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.vehicle.year}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.vehicle.color}
                          onChange={(e) => handleNestedInputChange('vehicle', '', 'color', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.vehicle.color}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">License Plate</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.vehicle.licensePlate}
                        onChange={(e) => handleNestedInputChange('vehicle', '', 'licensePlate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.vehicle.licensePlate}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Driver's License</label>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">{profileData.documents.driverLicense}</span>
                  <span className="text-green-600 text-sm">✓ Verified</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">{profileData.documents.insurance}</span>
                  <span className="text-green-600 text-sm">✓ Verified</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Registration</label>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">{profileData.documents.vehicleRegistration}</span>
                  <span className="text-green-600 text-sm">✓ Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Work Preferences</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Delivery Distance</label>
              {isEditing ? (
                <select
                  value={profileData.preferences.maxDistance}
                  onChange={(e) => handleNestedInputChange('preferences', '', 'maxDistance', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                  <option value={15}>15 km</option>
                  <option value={20}>20 km</option>
                </select>
              ) : (
                <p className="text-gray-900">{profileData.preferences.maxDistance} km</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
              {isEditing ? (
                <div className="flex space-x-2">
                  <input
                    type="time"
                    value={profileData.preferences.workingHours.start}
                    onChange={(e) => handleNestedInputChange('preferences', 'workingHours', 'start', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <span className="self-center">to</span>
                  <input
                    type="time"
                    value={profileData.preferences.workingHours.end}
                    onChange={(e) => handleNestedInputChange('preferences', 'workingHours', 'end', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              ) : (
                <p className="text-gray-900">
                  {profileData.preferences.workingHours.start} - {profileData.preferences.workingHours.end}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Auto-Accept Orders</label>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.preferences.autoAccept}
                    onChange={(e) => handleNestedInputChange('preferences', '', 'autoAccept', e.target.checked)}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
                <span className="ml-3 text-sm text-gray-700">
                  {profileData.preferences.autoAccept ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryProfile;