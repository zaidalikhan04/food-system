import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  Menu, 
  Package, 
  Store, 
  MapPin, 
  Truck, 
  ShoppingBag,
  User,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();

  // Get role-specific colors and styling - More distinct themes with redder customer
  const getRoleTheme = () => {
    switch (user?.role) {
      case 'restaurant':
        return {
          bg: 'bg-gradient-to-b from-purple-50 to-indigo-50', // Purple theme for restaurant
          border: 'border-purple-100',
          active: 'bg-purple-100 text-purple-700 border-r-4 border-purple-500',
          activeIcon: 'text-purple-500',
          hover: 'hover:bg-purple-50 hover:text-purple-600',
          accent: 'text-purple-400'
        };
      case 'customer':
        return {
          bg: 'bg-gradient-to-b from-red-50 to-rose-50', // Much more red theme for customer
          border: 'border-red-100',
          active: 'bg-red-100 text-red-700 border-r-4 border-red-500',
          activeIcon: 'text-red-500',
          hover: 'hover:bg-red-50 hover:text-red-600',
          accent: 'text-red-400'
        };
      case 'delivery':
        return {
          bg: 'bg-gradient-to-b from-green-50 to-emerald-50',
          border: 'border-green-100',
          active: 'bg-green-100 text-green-700 border-r-4 border-green-500',
          activeIcon: 'text-green-500',
          hover: 'hover:bg-green-50 hover:text-green-600',
          accent: 'text-green-400'
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-gray-200',
          active: 'bg-orange-50 text-orange-700 border-r-2 border-orange-500',
          activeIcon: 'text-orange-500',
          hover: 'hover:bg-gray-50 hover:text-gray-900',
          accent: 'text-gray-400'
        };
    }
  };

  const theme = getRoleTheme();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'restaurant':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'menu', label: 'Menu Management', icon: Menu },
          { id: 'orders', label: 'Orders', icon: Package },
          { id: 'profile', label: 'Restaurant Profile', icon: Store },
        ];
      case 'customer':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'restaurants', label: 'Browse Restaurants', icon: Store },
          { id: 'cart', label: 'Cart', icon: ShoppingBag },
          { id: 'orders', label: 'My Orders', icon: Package },
          { id: 'profile', label: 'Profile', icon: User },
        ];
      case 'delivery':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'assignments', label: 'Order Assignments', icon: Package },
          { id: 'tracking', label: 'Delivery Tracking', icon: MapPin },
          { id: 'earnings', label: 'Earnings', icon: Truck },
          { id: 'profile', label: 'Profile', icon: User },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className={`w-64 ${theme.bg} shadow-lg ${theme.border} border-r min-h-screen`}>
      <nav className="mt-8">
        <div className="px-6 mb-6">
          <h2 className={`text-xs font-semibold ${theme.accent} uppercase tracking-wider`}>
            Menu
          </h2>
        </div>
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? theme.active
                      : `text-gray-700 ${theme.hover}`
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? theme.activeIcon : 'text-gray-400'}`} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
        
        <div className="px-6 mt-8 mb-6">
          <h2 className={`text-xs font-semibold ${theme.accent} uppercase tracking-wider`}>
            Account
          </h2>
        </div>
        <ul className="space-y-1 px-3">
          <li>
            <button
              onClick={() => onTabChange('settings')}
              className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'settings'
                  ? theme.active
                  : `text-gray-700 ${theme.hover}`
              }`}
            >
              <Settings className={`mr-3 h-5 w-5 ${activeTab === 'settings' ? theme.activeIcon : 'text-gray-400'}`} />
              Settings
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;