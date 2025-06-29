import React from 'react';
import { Package, Clock, MapPin, DollarSign, Navigation, Battery } from 'lucide-react';

const DeliveryDashboard: React.FC = () => {
  const stats = [
    { title: 'Today\'s Deliveries', value: '12', icon: Package, color: 'bg-blue-500' },
    { title: 'Earnings Today', value: '$156.80', icon: DollarSign, color: 'bg-green-500' },
    { title: 'Active Orders', value: '3', icon: Clock, color: 'bg-orange-500' },
    { title: 'Distance Traveled', value: '45.2 km', icon: Navigation, color: 'bg-purple-500' },
  ];

  const activeDeliveries = [
    {
      id: '#1234',
      restaurant: 'Pizza Palace',
      customer: 'John Doe',
      address: '123 Main St, Downtown',
      estimatedTime: '12 min',
      earnings: '$8.50',
      status: 'picked_up',
      distance: '2.1 km'
    },
    {
      id: '#1235',
      restaurant: 'Burger Barn',
      customer: 'Jane Smith',
      address: '456 Oak Ave, Midtown',
      estimatedTime: '18 min',
      earnings: '$12.25',
      status: 'ready',
      distance: '4.3 km'
    },
    {
      id: '#1236',
      restaurant: 'Sushi Zen',
      customer: 'Mike Johnson',
      address: '789 Pine Rd, Uptown',
      estimatedTime: '25 min',
      earnings: '$15.75',
      status: 'assigned',
      distance: '6.7 km'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-orange-100 text-orange-800';
      case 'picked_up': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'assigned': return 'Assigned';
      case 'ready': return 'Ready for pickup';
      case 'picked_up': return 'Picked up';
      default: return status;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your deliveries and track earnings</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-green-600">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium">Online</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Battery className="h-4 w-4 mr-1" />
            <span className="text-sm">89%</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Deliveries */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active Deliveries</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {activeDeliveries.map((delivery) => (
            <div key={delivery.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{delivery.id}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(delivery.status)}`}>
                      {getStatusText(delivery.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>From:</strong> {delivery.restaurant}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>To:</strong> {delivery.customer}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {delivery.address}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {delivery.estimatedTime}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Navigation className="h-4 w-4 mr-1" />
                    {delivery.distance}
                  </div>
                  <div className="flex items-center text-green-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {delivery.earnings}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Navigate
                  </button>
                  {delivery.status === 'ready' && (
                    <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                      Mark Picked Up
                    </button>
                  )}
                  {delivery.status === 'picked_up' && (
                    <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      Mark Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Orders</span>
              <span className="font-medium text-gray-900">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completed</span>
              <span className="font-medium text-green-600">9</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">In Progress</span>
              <span className="font-medium text-orange-600">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Earnings</span>
              <span className="font-medium text-gray-900">$156.80</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tips</span>
              <span className="font-medium text-green-600">$23.50</span>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-medium text-gray-900">96%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Customer Rating</span>
                <span className="font-medium text-gray-900">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">On-Time Delivery</span>
                <span className="font-medium text-gray-900">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;