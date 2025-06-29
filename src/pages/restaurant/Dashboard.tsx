import React from 'react';
import { TrendingUp, Package, Clock, DollarSign, Users, Star } from 'lucide-react';

const RestaurantDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Orders', value: '248', change: '+12%', icon: Package, color: 'bg-blue-500' },
    { title: 'Revenue', value: '$3,240', change: '+8%', icon: DollarSign, color: 'bg-green-500' },
    { title: 'Active Orders', value: '12', change: '+3', icon: Clock, color: 'bg-orange-500' },
    { title: 'Rating', value: '4.8', change: '+0.2', icon: Star, color: 'bg-yellow-500' },
  ];

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', items: 3, total: 45.50, status: 'preparing', time: '5 min ago' },
    { id: '#1235', customer: 'Jane Smith', items: 2, total: 32.00, status: 'ready', time: '8 min ago' },
    { id: '#1236', customer: 'Mike Johnson', items: 1, total: 18.50, status: 'delivered', time: '15 min ago' },
    { id: '#1237', customer: 'Sarah Wilson', items: 4, total: 67.25, status: 'confirmed', time: '20 min ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Monitor your restaurant's performance and manage orders</p>
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
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{order.id}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">{order.items} items</span>
                      <span className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{order.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart would be displayed here</p>
                <p className="text-sm text-gray-400">Integration with charting library needed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Package className="h-6 w-6 text-orange-500 mb-2" />
            <h4 className="font-medium text-gray-900">View All Orders</h4>
            <p className="text-sm text-gray-600">Manage pending and active orders</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Users className="h-6 w-6 text-blue-500 mb-2" />
            <h4 className="font-medium text-gray-900">Add Menu Item</h4>
            <p className="text-sm text-gray-600">Create new dishes for your menu</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Star className="h-6 w-6 text-yellow-500 mb-2" />
            <h4 className="font-medium text-gray-900">View Reviews</h4>
            <p className="text-sm text-gray-600">Check customer feedback</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;