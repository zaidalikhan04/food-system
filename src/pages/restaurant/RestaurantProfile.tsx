import React, { useState } from 'react';
import { Camera, Clock, MapPin, Phone, Mail, Globe, Star, Edit2, Save, X } from 'lucide-react';

interface RestaurantInfo {
  name: string;
  description: string;
  cuisine: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  image: string;
  openingHours: {
    [key: string]: { open: string; close: string; isOpen: boolean };
  };
  deliveryRadius: number;
  minimumOrder: number;
  deliveryFee: number;
  estimatedDeliveryTime: string;
}

const RestaurantProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>({
    name: 'Pizza Palace',
    description: 'Authentic Italian pizzas made with fresh ingredients and traditional recipes. Family-owned restaurant serving the community for over 20 years.',
    cuisine: 'Italian',
    phone: '+1 (555) 123-4567',
    email: 'info@pizzapalace.com',
    address: '123 Main Street, Downtown, City 12345',
    website: 'www.pizzapalace.com',
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=800',
    openingHours: {
      monday: { open: '11:00', close: '22:00', isOpen: true },
      tuesday: { open: '11:00', close: '22:00', isOpen: true },
      wednesday: { open: '11:00', close: '22:00', isOpen: true },
      thursday: { open: '11:00', close: '22:00', isOpen: true },
      friday: { open: '11:00', close: '23:00', isOpen: true },
      saturday: { open: '11:00', close: '23:00', isOpen: true },
      sunday: { open: '12:00', close: '21:00', isOpen: true }
    },
    deliveryRadius: 5,
    minimumOrder: 15,
    deliveryFee: 3.99,
    estimatedDeliveryTime: '25-35 min'
  });

  const [editForm, setEditForm] = useState<RestaurantInfo>(restaurantInfo);

  const handleSave = () => {
    setRestaurantInfo(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(restaurantInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof RestaurantInfo, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleHoursChange = (day: string, field: 'open' | 'close' | 'isOpen', value: string | boolean) => {
    setEditForm(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value
        }
      }
    }));
  };

  const stats = [
    { label: 'Total Orders', value: '1,248', icon: Star },
    { label: 'Average Rating', value: '4.8', icon: Star },
    { label: 'Active Menu Items', value: '24', icon: Star },
    { label: 'Monthly Revenue', value: '$12,450', icon: Star }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Restaurant Profile</h1>
          <p className="text-gray-600">Manage your restaurant information and settings</p>
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
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <Star className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Restaurant Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Image</label>
              <div className="relative">
                <img
                  src={isEditing ? editForm.image : restaurantInfo.image}
                  alt="Restaurant"
                  className="w-full h-48 object-cover rounded-lg"
                />
                {isEditing && (
                  <button className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg hover:bg-opacity-60 transition-colors">
                    <Camera className="h-8 w-8 text-white" />
                  </button>
                )}
              </div>
              {isEditing && (
                <input
                  type="url"
                  value={editForm.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Image URL"
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <p className="text-gray-900">{restaurantInfo.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
                {isEditing ? (
                  <select
                    value={editForm.cuisine}
                    onChange={(e) => handleInputChange('cuisine', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="Italian">Italian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                    <option value="American">American</option>
                    <option value="Japanese">Japanese</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{restaurantInfo.cuisine}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              {isEditing ? (
                <textarea
                  value={editForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              ) : (
                <p className="text-gray-900">{restaurantInfo.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <div className="flex items-center text-gray-900">
                    <Phone className="h-4 w-4 mr-2" />
                    {restaurantInfo.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <div className="flex items-center text-gray-900">
                    <Mail className="h-4 w-4 mr-2" />
                    {restaurantInfo.email}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              ) : (
                <div className="flex items-start text-gray-900">
                  <MapPin className="h-4 w-4 mr-2 mt-1" />
                  {restaurantInfo.address}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
              {isEditing ? (
                <input
                  type="url"
                  value={editForm.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              ) : (
                <div className="flex items-center text-gray-900">
                  <Globe className="h-4 w-4 mr-2" />
                  {restaurantInfo.website}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Operating Hours & Delivery Settings */}
        <div className="space-y-6">
          {/* Operating Hours */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Operating Hours</h3>
            </div>
            <div className="p-6 space-y-4">
              {Object.entries(restaurantInfo.openingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isEditing && (
                      <input
                        type="checkbox"
                        checked={editForm.openingHours[day].isOpen}
                        onChange={(e) => handleHoursChange(day, 'isOpen', e.target.checked)}
                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                    )}
                    <span className="capitalize font-medium text-gray-900 w-20">{day}</span>
                  </div>
                  {hours.isOpen ? (
                    <div className="flex items-center space-x-2">
                      {isEditing ? (
                        <>
                          <input
                            type="time"
                            value={editForm.openingHours[day].open}
                            onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <span>-</span>
                          <input
                            type="time"
                            value={editForm.openingHours[day].close}
                            onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </>
                      ) : (
                        <span className="text-sm text-gray-600">
                          {hours.open} - {hours.close}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm text-red-600">Closed</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Delivery Settings</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Radius (km)</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editForm.deliveryRadius}
                    onChange={(e) => handleInputChange('deliveryRadius', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <p className="text-gray-900">{restaurantInfo.deliveryRadius} km</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order ($)</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editForm.minimumOrder}
                    onChange={(e) => handleInputChange('minimumOrder', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <p className="text-gray-900">${restaurantInfo.minimumOrder}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Fee ($)</label>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.deliveryFee}
                    onChange={(e) => handleInputChange('deliveryFee', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                ) : (
                  <p className="text-gray-900">${restaurantInfo.deliveryFee}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Delivery Time</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.estimatedDeliveryTime}
                    onChange={(e) => handleInputChange('estimatedDeliveryTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., 25-35 min"
                  />
                ) : (
                  <div className="flex items-center text-gray-900">
                    <Clock className="h-4 w-4 mr-2" />
                    {restaurantInfo.estimatedDeliveryTime}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;