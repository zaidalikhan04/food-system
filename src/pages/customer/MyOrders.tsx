import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Eye, Phone, MapPin, Star, MessageCircle } from 'lucide-react';

interface CustomerOrder {
  id: string;
  restaurant: {
    name: string;
    image: string;
    phone: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'on_way' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery?: string;
  deliveryAddress: string;
  deliveryPartner?: {
    name: string;
    phone: string;
    rating: number;
  };
  trackingSteps: {
    status: string;
    time: string;
    completed: boolean;
  }[];
}

const MyOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'cancelled'>('active');
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);

  const mockOrders: CustomerOrder[] = [
    {
      id: '#1234',
      restaurant: {
        name: 'Pizza Palace',
        image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+1 (555) 123-4567'
      },
      items: [
        { name: 'Margherita Pizza', quantity: 2, price: 16.99 },
        { name: 'Caesar Salad', quantity: 1, price: 12.50 }
      ],
      total: 46.48,
      status: 'on_way',
      createdAt: '2024-01-15 14:30',
      estimatedDelivery: '15:15',
      deliveryAddress: '123 Main St, Downtown, City 12345',
      deliveryPartner: {
        name: 'Mike Wilson',
        phone: '+1 (555) 456-7890',
        rating: 4.8
      },
      trackingSteps: [
        { status: 'Order Placed', time: '14:30', completed: true },
        { status: 'Restaurant Confirmed', time: '14:32', completed: true },
        { status: 'Preparing Food', time: '14:35', completed: true },
        { status: 'Ready for Pickup', time: '14:55', completed: true },
        { status: 'Out for Delivery', time: '15:00', completed: true },
        { status: 'Delivered', time: '', completed: false }
      ]
    },
    {
      id: '#1235',
      restaurant: {
        name: 'Burger Barn',
        image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+1 (555) 987-6543'
      },
      items: [
        { name: 'Classic Burger', quantity: 1, price: 14.99 },
        { name: 'French Fries', quantity: 1, price: 6.99 }
      ],
      total: 21.98,
      status: 'preparing',
      createdAt: '2024-01-15 14:45',
      estimatedDelivery: '15:30',
      deliveryAddress: '123 Main St, Downtown, City 12345',
      trackingSteps: [
        { status: 'Order Placed', time: '14:45', completed: true },
        { status: 'Restaurant Confirmed', time: '14:47', completed: true },
        { status: 'Preparing Food', time: '14:50', completed: true },
        { status: 'Ready for Pickup', time: '', completed: false },
        { status: 'Out for Delivery', time: '', completed: false },
        { status: 'Delivered', time: '', completed: false }
      ]
    },
    {
      id: '#1236',
      restaurant: {
        name: 'Sushi Zen',
        image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400',
        phone: '+1 (555) 234-5678'
      },
      items: [
        { name: 'California Roll', quantity: 2, price: 12.99 },
        { name: 'Miso Soup', quantity: 1, price: 4.99 }
      ],
      total: 30.97,
      status: 'delivered',
      createdAt: '2024-01-14 19:15',
      deliveryAddress: '123 Main St, Downtown, City 12345',
      trackingSteps: [
        { status: 'Order Placed', time: '19:15', completed: true },
        { status: 'Restaurant Confirmed', time: '19:17', completed: true },
        { status: 'Preparing Food', time: '19:20', completed: true },
        { status: 'Ready for Pickup', time: '19:45', completed: true },
        { status: 'Out for Delivery', time: '19:50', completed: true },
        { status: 'Delivered', time: '20:15', completed: true }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'picked_up': return 'bg-purple-100 text-purple-800';
      case 'on_way': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'confirmed': return CheckCircle;
      case 'preparing': return Package;
      case 'ready': return CheckCircle;
      case 'picked_up': return Package;
      case 'on_way': return Package;
      case 'delivered': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const getFilteredOrders = () => {
    switch (activeTab) {
      case 'active':
        return mockOrders.filter(order => 
          ['pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'on_way'].includes(order.status)
        );
      case 'completed':
        return mockOrders.filter(order => order.status === 'delivered');
      case 'cancelled':
        return mockOrders.filter(order => order.status === 'cancelled');
      default:
        return mockOrders;
    }
  };

  if (selectedOrder) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedOrder(null)}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            ← Back to Orders
          </button>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Phone className="h-4 w-4 inline mr-2" />
              Call Restaurant
            </button>
            {selectedOrder.deliveryPartner && (
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <MessageCircle className="h-4 w-4 inline mr-2" />
                Contact Driver
              </button>
            )}
          </div>
        </div>

        {/* Order Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order {selectedOrder.id}</h1>
              <p className="text-gray-600">Placed on {selectedOrder.createdAt}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-500">${selectedOrder.total.toFixed(2)}</p>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                {selectedOrder.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Restaurant</h3>
              <div className="flex items-center space-x-3">
                <img
                  src={selectedOrder.restaurant.image}
                  alt={selectedOrder.restaurant.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{selectedOrder.restaurant.name}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.restaurant.phone}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Delivery Address</h3>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                <p className="text-gray-600">{selectedOrder.deliveryAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Tracking */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Tracking</h3>
          <div className="space-y-4">
            {selectedOrder.trackingSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Clock className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.status}
                  </p>
                  {step.time && (
                    <p className="text-sm text-gray-500">{step.time}</p>
                  )}
                </div>
                {index < selectedOrder.trackingSteps.length - 1 && (
                  <div className={`absolute left-4 mt-8 w-0.5 h-6 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`} style={{ marginLeft: '15px' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Partner Info */}
        {selectedOrder.deliveryPartner && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Partner</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{selectedOrder.deliveryPartner.name}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm text-gray-600">{selectedOrder.deliveryPartner.rating}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-3">
            {selectedOrder.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{item.quantity}x {item.name}</p>
                </div>
                <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-900">Total</p>
                <p className="text-lg font-semibold text-orange-500">${selectedOrder.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600">Track and manage your food orders</p>
      </div>

      {/* Order Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'active', label: 'Active Orders', count: 2 },
              { key: 'completed', label: 'Completed', count: 1 },
              { key: 'cancelled', label: 'Cancelled', count: 0 }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Orders List */}
        <div className="divide-y divide-gray-200">
          {getFilteredOrders().map((order) => {
            const StatusIcon = getStatusIcon(order.status);
            return (
              <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={order.restaurant.image}
                          alt={order.restaurant.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                          <p className="text-gray-600">{order.restaurant.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                          <StatusIcon className="h-4 w-4 inline mr-1" />
                          {order.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Items:</p>
                      <p className="text-gray-900">
                        {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <p>Ordered: {order.createdAt}</p>
                        {order.estimatedDelivery && (
                          <p>Estimated delivery: {order.estimatedDelivery}</p>
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {getFilteredOrders().length === 0 && (
          <div className="p-12 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">
              {activeTab === 'active' && "You don't have any active orders."}
              {activeTab === 'completed' && "You haven't completed any orders yet."}
              {activeTab === 'cancelled' && "You don't have any cancelled orders."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;