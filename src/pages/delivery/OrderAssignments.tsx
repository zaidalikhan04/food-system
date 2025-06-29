import React, { useState } from 'react';
import { Package, Clock, MapPin, Navigation, Phone, CheckCircle, XCircle, DollarSign } from 'lucide-react';

interface DeliveryOrder {
  id: string;
  restaurant: {
    name: string;
    address: string;
    phone: string;
    image: string;
  };
  customer: {
    name: string;
    address: string;
    phone: string;
  };
  items: {
    name: string;
    quantity: number;
  }[];
  earnings: number;
  distance: string;
  estimatedTime: string;
  status: 'available' | 'assigned' | 'accepted' | 'declined';
  priority: 'normal' | 'high' | 'urgent';
  orderTime: string;
  pickupTime?: string;
  deliveryTime?: string;
}

const OrderAssignments: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'available' | 'assigned'>('available');
  const [sortBy, setSortBy] = useState<'time' | 'distance' | 'earnings'>('time');

  const [orders, setOrders] = useState<DeliveryOrder[]>([
    {
      id: '#1234',
      restaurant: {
        name: 'Pizza Palace',
        address: '123 Main St, Downtown',
        phone: '+1 (555) 123-4567',
        image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      customer: {
        name: 'John Doe',
        address: '456 Oak Ave, Midtown',
        phone: '+1 (555) 987-6543'
      },
      items: [
        { name: 'Margherita Pizza', quantity: 2 },
        { name: 'Caesar Salad', quantity: 1 }
      ],
      earnings: 12.50,
      distance: '2.3 km',
      estimatedTime: '15 min',
      status: 'available',
      priority: 'normal',
      orderTime: '14:30',
      pickupTime: '14:45',
      deliveryTime: '15:00'
    },
    {
      id: '#1235',
      restaurant: {
        name: 'Burger Barn',
        address: '789 Pine Rd, Uptown',
        phone: '+1 (555) 234-5678',
        image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      customer: {
        name: 'Jane Smith',
        address: '321 Elm St, Southside',
        phone: '+1 (555) 456-7890'
      },
      items: [
        { name: 'Classic Burger', quantity: 1 },
        { name: 'French Fries', quantity: 2 }
      ],
      earnings: 15.75,
      distance: '4.1 km',
      estimatedTime: '22 min',
      status: 'available',
      priority: 'high',
      orderTime: '14:45',
      pickupTime: '15:00',
      deliveryTime: '15:25'
    },
    {
      id: '#1236',
      restaurant: {
        name: 'Sushi Zen',
        address: '555 Bamboo Ave, Eastside',
        phone: '+1 (555) 345-6789',
        image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      customer: {
        name: 'Mike Johnson',
        address: '987 Maple Dr, Westside',
        phone: '+1 (555) 567-8901'
      },
      items: [
        { name: 'California Roll', quantity: 3 },
        { name: 'Miso Soup', quantity: 1 }
      ],
      earnings: 18.25,
      distance: '6.7 km',
      estimatedTime: '28 min',
      status: 'assigned',
      priority: 'urgent',
      orderTime: '14:20',
      pickupTime: '14:50',
      deliveryTime: '15:20'
    }
  ]);

  const handleAcceptOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'accepted' } : order
    ));
  };

  const handleDeclineOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'declined' } : order
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-purple-100 text-purple-800';
      case 'declined': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'earnings':
        return b.earnings - a.earnings;
      case 'time':
      default:
        return a.orderTime.localeCompare(b.orderTime);
    }
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order Assignments</h1>
        <p className="text-gray-600">View and manage available delivery orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Orders</p>
              <p className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'available').length}
              </p>
            </div>
            <Package className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Assigned to You</p>
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'assigned').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Potential Earnings</p>
              <p className="text-2xl font-bold text-orange-600">
                ${orders.filter(o => o.status === 'available').reduce((sum, o) => sum + o.earnings, 0).toFixed(2)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Distance</p>
              <p className="text-2xl font-bold text-purple-600">
                {(orders.reduce((sum, o) => sum + parseFloat(o.distance), 0) / orders.length).toFixed(1)} km
              </p>
            </div>
            <Navigation className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All Orders</option>
                <option value="available">Available</option>
                <option value="assigned">Assigned to Me</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="time">Order Time</option>
                <option value="distance">Distance</option>
                <option value="earnings">Earnings</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Showing {sortedOrders.length} orders
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {sortedOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={order.restaurant.image}
                    alt={order.restaurant.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-gray-600">{order.restaurant.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(order.priority)}`}>
                    {order.priority}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Restaurant Info */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Pickup From</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {order.restaurant.address}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {order.restaurant.phone}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Pickup: {order.pickupTime}
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Deliver To</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      {order.customer.name}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {order.customer.address}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {order.customer.phone}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Deliver by: {order.deliveryTime}
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Order Details</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                    <div className="flex items-center mt-2 pt-2 border-t border-gray-200">
                      <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                      <span className="font-medium text-green-600">${order.earnings.toFixed(2)} earnings</span>
                    </div>
                    <div className="flex items-center">
                      <Navigation className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{order.distance} • {order.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                    <Navigation className="h-4 w-4 mr-2" />
                    View Route
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Restaurant
                  </button>
                </div>

                {order.status === 'available' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDeclineOrder(order.id)}
                      className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Decline
                    </button>
                    <button
                      onClick={() => handleAcceptOrder(order.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept Order
                    </button>
                  </div>
                )}

                {order.status === 'assigned' && (
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      Start Pickup
                    </button>
                  </div>
                )}

                {order.status === 'accepted' && (
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Navigate to Restaurant
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders available</h3>
          <p className="text-gray-600">Check back later for new delivery opportunities</p>
        </div>
      )}
    </div>
  );
};

export default OrderAssignments;