import React, { useState } from 'react';
import { Bell, User, LogOut, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import NotificationPanel from './NotificationPanel';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [showNotifications, setShowNotifications] = useState(false);

  // Get role-specific colors and styling - More distinct themes with redder customer
  const getRoleTheme = () => {
    switch (user?.role) {
      case 'restaurant':
        return {
          bg: 'bg-gradient-to-r from-purple-500 to-indigo-500', // Purple theme for restaurant
          accent: 'text-purple-100',
          hover: 'hover:bg-purple-600',
          badge: 'bg-purple-600'
        };
      case 'customer':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-rose-500', // Much more red theme for customer
          accent: 'text-red-100',
          hover: 'hover:bg-red-600',
          badge: 'bg-red-600'
        };
      case 'delivery':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
          accent: 'text-green-100',
          hover: 'hover:bg-green-600',
          badge: 'bg-green-600'
        };
      default:
        return {
          bg: 'bg-white',
          accent: 'text-gray-600',
          hover: 'hover:bg-gray-100',
          badge: 'bg-orange-500'
        };
    }
  };

  const theme = getRoleTheme();

  return (
    <>
      <header className={`${theme.bg} shadow-lg border-b border-white/20 px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center relative">
            <h1 className="text-3xl font-bold text-white relative">
              <span className="inline-block">Grub</span>
              <span className="text-black inline-block">z</span>
              
              {/* Subtle floating particles for dashboard header - RESTORED */}
              <div className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping delay-300"></div>
              <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-white/30 rounded-full animate-ping delay-500"></div>
              <div className="absolute top-1/2 -right-4 w-1 h-1 bg-white/20 rounded-full animate-ping delay-700"></div>
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user?.role === 'customer' && (
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-white cursor-pointer hover:text-white/80 transition-colors" />
                {getTotalItems() > 0 && (
                  <span className={`absolute -top-2 -right-2 ${theme.badge} text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium`}>
                    {getTotalItems()}
                  </span>
                )}
              </div>
            )}
            
            <div className="relative">
              <button
                onClick={() => setShowNotifications(true)}
                className="relative p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Bell className="h-6 w-6 text-white hover:text-white/80 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3"></span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className={`text-xs ${theme.accent}`}>{user?.email}</p>
              </div>
              {user?.avatar && (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover border-2 border-white/20"
                />
              )}
              <User className="h-6 w-6 text-white" />
            </div>
            
            <button
              onClick={logout}
              className="p-2 text-white hover:text-red-200 hover:bg-white/10 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </>
  );
};

export default Header;