import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, MessageCircle, CheckCircle, Package, User, Camera } from 'lucide-react';

interface ActiveDelivery {
  id: string;
  restaurant: {
    name: string;
    address: string;
    phone: string;
    coordinates: { lat: number; lng: number };
  };
  customer: {
    name: string;
    address: string;
    phone: string;
    coordinates: { lat: number; lng: number };
    instructions?: string;
  };
  status: 'heading_to_restaurant' | 'at_restaurant' | 'picked_up' | 'heading_to_customer' | 'delivered';
  estimatedArrival: string;
  actualPickupTime?: string;
  actualDeliveryTime?: string;
  earnings: number;
  distance: string;
  items: { name: string; quantity: number }[];
}

const DeliveryTracking: React.FC = () => {
  const [activeDelivery, setActiveDelivery] = useState<ActiveDelivery>({
    id: '#1234',
    restaurant: {
      name: 'Pizza Palace',
      address: '123 Main St, Downtown, City 12345',
      phone: '+1 (555) 123-4567',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    customer: {
      name: 'John Doe',
      address: '456 Oak Ave, Midtown, City 12345',
      phone: '+1 (555) 987-6543',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      instructions: 'Ring doorbell twice. Leave at door if no answer.'
    },
    status: 'heading_to_restaurant',
    estimatedArrival: '14:45',
    earnings: 12.50,
    distance: '2.3 km',
    items: [
      { name: 'Margherita Pizza', quantity: 2 },
      { name: 'Caesar Salad', quantity: 1 }
    ]
  });

  const [showProofModal, setShowProofModal] = useState(false);

  const updateStatus = (newStatus: ActiveDelivery['status']) => {
    const now = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    setActiveDelivery(prev => ({
      ...prev,
      status: newStatus,
      actualPickupTime: newStatus === 'picked_up' ? now : prev.actualPickupTime,
      actualDeliveryTime: newStatus === 'delivered' ? now : prev.actualDeliveryTime
    }));
  };

  const getStatusSteps = () => [
    {
      id: 'heading_to_restaurant',
      label: 'Heading to Restaurant',
      completed: ['at_restaurant', 'picked_up', 'heading_to_customer', 'delivered'].includes(activeDelivery.status),
      active: activeDelivery.status === 'heading_to_restaurant'
    },
    {
      id: 'at_restaurant',
      label: 'At Restaurant',
      completed: ['picked_up', 'heading_to_customer', 'delivered'].includes(activeDelivery.status),
      active: activeDelivery.status === 'at_restaurant'
    },
    {
      id: 'picked_up',
      label: 'Order Picked Up',
      completed: ['heading_to_customer', 'delivered'].includes(activeDelivery.status),
      active: activeDelivery.status === 'picked_up'
    },
    {
      id: 'heading_to_customer',
      label: 'Heading to Customer',
      completed: activeDelivery.status === 'delivered',
      active: activeDelivery.status === 'heading_to_customer'
    },
    {
      id: 'delivered',
      label: 'Delivered',
      completed: activeDelivery.status === 'delivered',
      active: activeDelivery.status === 'delivered'
    }
  ];

  const getCurrentLocation = () => {
    // Simulate getting current location
    alert('Getting your current location...');
  };

  const openMaps = (destination: 'restaurant' | 'customer') => {
    const coords = destination === 'restaurant' 
      ? activeDelivery.restaurant.coordinates 
      : activeDelivery.customer.coordinates;
    
    // In a real app, this would open the device's maps app
    alert(`Opening maps to ${destination}: ${coords.lat}, ${coords.lng}`);
  };

  if (!activeDelivery) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Active Delivery</h2>
          <p className="text-gray-600 mb-6">Accept an order to start tracking your delivery</p>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
            View Available Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Delivery Tracking</h1>
        <p className="text-gray-600">Track your current delivery progress</p>
      </div>

      {/* Current Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Order {activeDelivery.id}</h2>
            <p className="text-gray-600">Earnings: ${activeDelivery.earnings.toFixed(2)} • {activeDelivery.distance}</p>
          </div>
          <button
            onClick={getCurrentLocation}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <Navigation className="h-4 w-4 mr-2" />
            My Location
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {getStatusSteps().map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : step.active 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-200 text-gray-400'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <p className={`text-sm mt-2 text-center ${
                  step.active ? 'text-orange-600 font-medium' : 'text-gray-600'
                }`}>
                  {step.label}
                </p>
                {index < getStatusSteps().length - 1 && (
                  <div className={`absolute h-0.5 w-full mt-5 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`} style={{ 
                    left: '50%', 
                    width: `${100 / getStatusSteps().length}%`,
                    zIndex: -1 
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Action */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-orange-500 mr-2" />
            <div>
              <p className="font-medium text-orange-900">
                {activeDelivery.status === 'heading_to_restaurant' && 'Head to restaurant for pickup'}
                {activeDelivery.status === 'at_restaurant' && 'Arrive at restaurant and collect order'}
                {activeDelivery.status === 'picked_up' && 'Order collected - head to customer'}
                {activeDelivery.status === 'heading_to_customer' && 'Deliver order to customer'}
                {activeDelivery.status === 'delivered' && 'Order delivered successfully!'}
              </p>
              <p className="text-sm text-orange-700">
                ETA: {activeDelivery.estimatedArrival}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Restaurant Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pickup Location</h3>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              ['at_restaurant', 'picked_up', 'heading_to_customer', 'delivered'].includes(activeDelivery.status)
                ? 'bg-green-100 text-green-800'
                : 'bg-orange-100 text-orange-800'
            }`}>
              {['at_restaurant', 'picked_up', 'heading_to_customer', 'delivered'].includes(activeDelivery.status)
                ? 'Completed'
                : 'In Progress'
              }
            </span>
          </div>

          <div className="space-y-3 mb-6">
            <div>
              <p className="font-medium text-gray-900">{activeDelivery.restaurant.name}</p>
              <div className="flex items-start text-sm text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                {activeDelivery.restaurant.address}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
              <div className="space-y-1">
                {activeDelivery.items.map((item, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    {item.quantity}x {item.name}
                  </div>
                ))}
              </div>
            </div>

            {activeDelivery.actualPickupTime && (
              <div className="text-sm text-green-600">
                <Clock className="h-4 w-4 inline mr-1" />
                Picked up at {activeDelivery.actualPickupTime}
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => openMaps('restaurant')}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <Navigation className="h-4 w-4 mr-2" />
              Navigate
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Phone className="h-4 w-4" />
            </button>
          </div>

          {activeDelivery.status === 'at_restaurant' && (
            <button
              onClick={() => updateStatus('picked_up')}
              className="w-full mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Mark as Picked Up
            </button>
          )}
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Delivery Location</h3>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              activeDelivery.status === 'delivered'
                ? 'bg-green-100 text-green-800'
                : ['picked_up', 'heading_to_customer'].includes(activeDelivery.status)
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-gray-100 text-gray-800'
            }`}>
              {activeDelivery.status === 'delivered'
                ? 'Delivered'
                : ['picked_up', 'heading_to_customer'].includes(activeDelivery.status)
                  ? 'In Progress'
                  : 'Pending'
              }
            </span>
          </div>

          <div className="space-y-3 mb-6">
            <div>
              <div className="flex items-center text-gray-900 mb-1">
                <User className="h-4 w-4 mr-2" />
                {activeDelivery.customer.name}
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                {activeDelivery.customer.address}
              </div>
            </div>

            {activeDelivery.customer.instructions && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm font-medium text-yellow-900 mb-1">Delivery Instructions</p>
                <p className="text-sm text-yellow-800">{activeDelivery.customer.instructions}</p>
              </div>
            )}

            {activeDelivery.actualDeliveryTime && (
              <div className="text-sm text-green-600">
                <Clock className="h-4 w-4 inline mr-1" />
                Delivered at {activeDelivery.actualDeliveryTime}
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => openMaps('customer')}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
              disabled={!['picked_up', 'heading_to_customer'].includes(activeDelivery.status)}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Navigate
            </button>
            <button 
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={!['picked_up', 'heading_to_customer'].includes(activeDelivery.status)}
            >
              <Phone className="h-4 w-4" />
            </button>
            <button 
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={!['picked_up', 'heading_to_customer'].includes(activeDelivery.status)}
            >
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>

          {activeDelivery.status === 'heading_to_customer' && (
            <button
              onClick={() => setShowProofModal(true)}
              className="w-full mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Mark as Delivered
            </button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => updateStatus('heading_to_restaurant')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            disabled={activeDelivery.status !== 'heading_to_restaurant'}
          >
            <Navigation className="h-6 w-6 text-blue-500 mb-2" />
            <h4 className="font-medium text-gray-900">Start Navigation</h4>
            <p className="text-sm text-gray-600">Get directions to pickup</p>
          </button>
          
          <button
            onClick={() => updateStatus('at_restaurant')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            disabled={activeDelivery.status !== 'heading_to_restaurant'}
          >
            <MapPin className="h-6 w-6 text-orange-500 mb-2" />
            <h4 className="font-medium text-gray-900">Arrived at Restaurant</h4>
            <p className="text-sm text-gray-600">Mark arrival for pickup</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Phone className="h-6 w-6 text-green-500 mb-2" />
            <h4 className="font-medium text-gray-900">Contact Support</h4>
            <p className="text-sm text-gray-600">Get help with delivery</p>
          </button>
        </div>
      </div>

      {/* Delivery Proof Modal */}
      {showProofModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Confirm Delivery</h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-600">Please confirm the delivery has been completed:</p>
              
              <div className="space-y-3">
                <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-300 transition-colors flex flex-col items-center">
                  <Camera className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Take Photo Proof (Optional)</span>
                </button>
                
                <textarea
                  placeholder="Add delivery notes (optional)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <button
                onClick={() => setShowProofModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateStatus('delivered');
                  setShowProofModal(false);
                }}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Confirm Delivery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryTracking;