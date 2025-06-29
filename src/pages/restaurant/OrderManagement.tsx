import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Eye, Phone, MapPin, User } from 'lucide-react';

interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
    specialInstructions?: string;
  }[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedTime?: string;
  deliveryPartner?: {
    name: string;
    phone: string;
  };
}

const OrderManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'cancelled'>('active');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const mockOrders: Order[] = [
    {
      id: '#1234',
      customer: {
        name: 'John Doe',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, Downtown, City 12345'
      },
      items: [
        { name: 'Margherita Pizza', quantity: 2, price: 16.99, specialInstructions: 'Extra cheese' },
        { name: 'Caesar Salad', quantity: 1, price: 12.50 }
      ],
      total: 46.48,
      status: 'preparing',
      createdAt: '2024-01-15 14:30',
      estimatedTime: '25 min'
    },
    {
      id: '#1235',
      customer: {
        name: 'Jane Smith',
        phone: '+1 (555) 987-6543',
        address: '456 Oak Ave, Midtown, City 12345'
      },
      items: [
        { name: 'Chicken Burger', quantity: 1, price: 14.99 },
        { name: 'French Fries', quantity: 1, price: 6.99 }
      ],
      total: 21.98,
      status: 'ready',
      createdAt: '2024-01-15 14:45',
      estimatedTime: '15 min',
      deliveryPartner: {
        name: 'Mike Wilson',
        phone: '+1 (555) 456-7890'
      }
    },
    {
      id: '#1236',
      customer: {
        name: 'Bob Johnson',
        phone: '+1 (555) 234-5678',
        address: '789 Pine Rd, Uptown, City 12345'
      },
      items: [
        { name: 'Pasta Carbonara', quantity: 1, price: 18.99 }
      ],
      total: 18.99,
      status: 'delivered',
      createdAt: '2024-01-15 13:15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'picked_up': return 'bg-purple-100 text-purple-800';
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
      case 'delivered': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  const getFilteredOrders = () => {
    switch (activeTab) {
      case 'active':
        return mockOrders.filter(order => 
          ['pending', 'confirmed', 'preparing', 'ready', 'picked_up'].includes(order.status)
        );
      case 'completed':
        return mockOrders.filter(order => order.status === 'delivered');
      case 'cancelled':
        return mockOrders.filter(order => order.status === 'cancelled');
      default:
        return mockOrders;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <p className="text-gray-600">Manage and track all your restaurant orders</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Orders</p>
              <p className="text-2xl font-bold text-orange-600">8</p>
            </div>
            <Clock className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ready for Pickup</p>
              <p className="text-2xl font-bold text-green-600">3</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue Today</p>
              <p className="text-2xl font-bold text-green-600">$1,248</p>
            </div>
            <Package className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Order Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'active', label: 'Active Orders', count: 8 },
              { key: 'completed', label: 'Completed', count: 24 },
              { key: 'cancelled', label: 'Cancelled', count: 2 }
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
                        <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                          <StatusIcon className="h-4 w-4 inline mr-1" />
                          {order.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{order.createdAt}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            {order.customer.name}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {order.customer.phone}
                          </div>
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                            <span>{order.customer.address}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{item.quantity}x {item.name}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {order.status === 'preparing' && (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Mark Ready
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Cancel Order
                        </button>
                      </div>
                    )}

                    {order.deliveryPartner && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">Delivery Partner</p>
                        <p className="text-sm text-blue-700">{order.deliveryPartner.name} - {order.deliveryPartner.phone}</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;