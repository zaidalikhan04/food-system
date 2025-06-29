import React from 'react';
import { ShoppingBag, Clock, MapPin, Star, TrendingUp } from 'lucide-react';

const CustomerDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Orders', value: '24', icon: ShoppingBag, color: 'bg-blue-500' },
    { title: 'Active Orders', value: '2', icon: Clock, color: 'bg-orange-500' },
    { title: 'Favorite Restaurants', value: '8', icon: Star, color: 'bg-yellow-500' },
    { title: 'Points Earned', value: '1,240', icon: TrendingUp, color: 'bg-green-500' },
  ];

  const recentOrders = [
    {
      id: '#1234',
      restaurant: 'Pizza Palace',
      items: ['Margherita Pizza', 'Caesar Salad'],
      total: 29.50,
      status: 'delivered',
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '#1235',
      restaurant: 'Burger Barn',
      items: ['Classic Burger', 'Fries'],
      total: 18.99,
      status: 'on_way',
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '#1236',
      restaurant: 'Sushi Zen',
      items: ['California Roll', 'Miso Soup'],
      total: 34.75,
      status: 'preparing',
      date: '2024-01-14',
      image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const favoriteRestaurants = [
    {
      id: '1',
      name: 'Pizza Palace',
      cuisine: 'Italian',
      rating: 4.8,
      deliveryTime: '25-35 min',
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Burger Barn',
      cuisine: 'American',
      rating: 4.6,
      deliveryTime: '20-30 min',
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'Sushi Zen',
      cuisine: 'Japanese',
      rating: 4.9,
      deliveryTime: '30-40 min',
      image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'on_way': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing': return 'Preparing';
      case 'on_way': return 'On the way';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600">Discover great food and track your orders</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <img
                    src={order.image}
                    alt={order.restaurant}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-900">{order.restaurant}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{order.items.join(', ')}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">{order.date}</span>
                      <span className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Restaurants */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Favorite Restaurants</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {favoriteRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{restaurant.name}</h4>
                    <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{restaurant.rating}</span>
                      <span className="text-sm text-gray-500 ml-2">• {restaurant.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left group">
            <ShoppingBag className="h-6 w-6 text-orange-500 mb-2 group-hover:text-orange-600 transition-colors" />
            <h4 className="font-medium text-gray-900">Browse Restaurants</h4>
            <p className="text-sm text-gray-600">Discover new places to order from</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left group">
            <Clock className="h-6 w-6 text-blue-500 mb-2 group-hover:text-blue-600 transition-colors" />
            <h4 className="font-medium text-gray-900">Track Orders</h4>
            <p className="text-sm text-gray-600">See real-time order status</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left group">
            <MapPin className="h-6 w-6 text-green-500 mb-2 group-hover:text-green-600 transition-colors" />
            <h4 className="font-medium text-gray-900">Manage Addresses</h4>
            <p className="text-sm text-gray-600">Update delivery locations</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;