import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, Eye, Clock, MapPin, Star } from 'lucide-react';

interface EarningsData {
  period: string;
  totalEarnings: number;
  deliveries: number;
  tips: number;
  bonuses: number;
  hours: number;
  distance: number;
}

interface DeliveryRecord {
  id: string;
  date: string;
  restaurant: string;
  customer: string;
  distance: string;
  time: string;
  baseEarnings: number;
  tip: number;
  bonus: number;
  total: number;
}

const Earnings: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'year'>('week');
  const [showDetails, setShowDetails] = useState(false);

  const earningsData: Record<string, EarningsData> = {
    today: {
      period: 'Today',
      totalEarnings: 156.80,
      deliveries: 12,
      tips: 23.50,
      bonuses: 15.00,
      hours: 8,
      distance: 45.2
    },
    week: {
      period: 'This Week',
      totalEarnings: 892.40,
      deliveries: 67,
      tips: 142.30,
      bonuses: 45.00,
      hours: 42,
      distance: 287.5
    },
    month: {
      period: 'This Month',
      totalEarnings: 3456.20,
      deliveries: 245,
      tips: 567.80,
      bonuses: 180.00,
      hours: 168,
      distance: 1234.7
    },
    year: {
      period: 'This Year',
      totalEarnings: 28450.60,
      deliveries: 2156,
      tips: 4567.90,
      bonuses: 1250.00,
      hours: 1456,
      distance: 9876.3
    }
  };

  const recentDeliveries: DeliveryRecord[] = [
    {
      id: '#1234',
      date: '2024-01-15 14:30',
      restaurant: 'Pizza Palace',
      customer: 'John D.',
      distance: '2.3 km',
      time: '18 min',
      baseEarnings: 8.50,
      tip: 3.00,
      bonus: 0,
      total: 11.50
    },
    {
      id: '#1235',
      date: '2024-01-15 15:45',
      restaurant: 'Burger Barn',
      customer: 'Jane S.',
      distance: '4.1 km',
      time: '25 min',
      baseEarnings: 12.25,
      tip: 4.50,
      bonus: 2.00,
      total: 18.75
    },
    {
      id: '#1236',
      date: '2024-01-15 16:20',
      restaurant: 'Sushi Zen',
      customer: 'Mike J.',
      distance: '3.7 km',
      time: '22 min',
      baseEarnings: 10.75,
      tip: 5.00,
      bonus: 0,
      total: 15.75
    },
    {
      id: '#1237',
      date: '2024-01-15 17:10',
      restaurant: 'Taco Fiesta',
      customer: 'Sarah W.',
      distance: '1.8 km',
      time: '15 min',
      baseEarnings: 7.25,
      tip: 2.50,
      bonus: 1.50,
      total: 11.25
    }
  ];

  const currentData = earningsData[selectedPeriod];

  const calculateAverages = () => {
    const avgPerDelivery = currentData.totalEarnings / currentData.deliveries;
    const avgPerHour = currentData.totalEarnings / currentData.hours;
    const avgPerKm = currentData.totalEarnings / currentData.distance;
    
    return { avgPerDelivery, avgPerHour, avgPerKm };
  };

  const { avgPerDelivery, avgPerHour, avgPerKm } = calculateAverages();

  const exportEarnings = () => {
    // In a real app, this would generate and download a report
    alert('Earnings report exported successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
          <p className="text-gray-600">Track your delivery earnings and performance</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportEarnings}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            {showDetails ? 'Hide' : 'Show'} Details
          </button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Earnings Overview</h3>
          <div className="flex space-x-2">
            {(['today', 'week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedPeriod === period
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-lg mb-3">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto" />
            </div>
            <p className="text-2xl font-bold text-gray-900">${currentData.totalEarnings.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Total Earnings</p>
            <p className="text-xs text-green-600 mt-1">+12% from last {selectedPeriod}</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-lg mb-3">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{currentData.deliveries}</p>
            <p className="text-sm text-gray-600">Deliveries</p>
            <p className="text-xs text-blue-600 mt-1">${avgPerDelivery.toFixed(2)} avg per delivery</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-lg mb-3">
              <Clock className="h-8 w-8 text-purple-600 mx-auto" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{currentData.hours}h</p>
            <p className="text-sm text-gray-600">Hours Worked</p>
            <p className="text-xs text-purple-600 mt-1">${avgPerHour.toFixed(2)} per hour</p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 p-4 rounded-lg mb-3">
              <MapPin className="h-8 w-8 text-orange-600 mx-auto" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{currentData.distance} km</p>
            <p className="text-sm text-gray-600">Distance Traveled</p>
            <p className="text-xs text-orange-600 mt-1">${avgPerKm.toFixed(2)} per km</p>
          </div>
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Base Earnings</span>
              <span className="font-medium text-gray-900">
                ${(currentData.totalEarnings - currentData.tips - currentData.bonuses).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tips</span>
              <span className="font-medium text-green-600">${currentData.tips.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bonuses</span>
              <span className="font-medium text-blue-600">${currentData.bonuses.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-green-600">${currentData.totalEarnings.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Visual Breakdown */}
          <div className="mt-6">
            <div className="flex rounded-lg overflow-hidden h-4">
              <div 
                className="bg-gray-400" 
                style={{ 
                  width: `${((currentData.totalEarnings - currentData.tips - currentData.bonuses) / currentData.totalEarnings) * 100}%` 
                }}
              />
              <div 
                className="bg-green-500" 
                style={{ 
                  width: `${(currentData.tips / currentData.totalEarnings) * 100}%` 
                }}
              />
              <div 
                className="bg-blue-500" 
                style={{ 
                  width: `${(currentData.bonuses / currentData.totalEarnings) * 100}%` 
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>Base</span>
              <span>Tips</span>
              <span>Bonuses</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
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
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Acceptance Rate</span>
                <span className="font-medium text-gray-900">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-medium text-gray-900">98%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-green-500 mr-2" />
              <div>
                <p className="font-medium text-green-900">Great Performance!</p>
                <p className="text-sm text-green-700">You're eligible for bonus rewards</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Deliveries */}
      {showDetails && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Deliveries</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Restaurant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distance/Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Base
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tip
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bonus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{delivery.id}</div>
                        <div className="text-sm text-gray-500">{delivery.date}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {delivery.restaurant}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {delivery.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{delivery.distance}</div>
                      <div>{delivery.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${delivery.baseEarnings.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      ${delivery.tip.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      ${delivery.bonus.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${delivery.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Weekly Goals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Earnings Goal</span>
              <span className="text-sm text-gray-500">$892 / $1000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{ width: '89%' }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">$108 to go</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Deliveries Goal</span>
              <span className="text-sm text-gray-500">67 / 75</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full" style={{ width: '89%' }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">8 deliveries to go</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Hours Goal</span>
              <span className="text-sm text-gray-500">42 / 50</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-purple-500 h-3 rounded-full" style={{ width: '84%' }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">8 hours to go</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;