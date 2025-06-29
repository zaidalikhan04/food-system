import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { User } from './types';
import RoleSelection from './components/auth/RoleSelection';
import LoginForm from './components/auth/LoginForm';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import RestaurantDashboard from './pages/restaurant/Dashboard';
import MenuManagement from './pages/restaurant/MenuManagement';
import OrderManagement from './pages/restaurant/OrderManagement';
import RestaurantProfile from './pages/restaurant/RestaurantProfile';
import Settings from './pages/restaurant/Settings';
import CustomerDashboard from './pages/customer/Dashboard';
import BrowseRestaurants from './pages/customer/BrowseRestaurants';
import Cart from './pages/customer/Cart';
import MyOrders from './pages/customer/MyOrders';
import Profile from './pages/customer/Profile';
import CustomerSettings from './pages/customer/Settings';
import DeliveryDashboard from './pages/delivery/Dashboard';
import OrderAssignments from './pages/delivery/OrderAssignments';
import DeliveryTracking from './pages/delivery/DeliveryTracking';
import Earnings from './pages/delivery/Earnings';
import DeliveryProfile from './pages/delivery/Profile';
import DeliverySettings from './pages/delivery/Settings';
import LoadingSpinner from './components/common/LoadingSpinner';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedRole, setSelectedRole] = useState<User['role'] | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    if (!selectedRole) {
      return <RoleSelection onRoleSelect={setSelectedRole} />;
    }
    return (
      <LoginForm 
        selectedRole={selectedRole} 
        onBack={() => setSelectedRole(null)} 
      />
    );
  }

  // Get role-specific background colors - More distinct themes with redder customer
  const getRoleBackground = () => {
    switch (user.role) {
      case 'restaurant':
        return 'bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100'; // Purple theme for restaurant
      case 'customer':
        return 'bg-gradient-to-br from-red-50 via-red-100 to-rose-100'; // Much more red theme for customer
      case 'delivery':
        return 'bg-gradient-to-br from-green-50 via-emerald-50 to-green-100';
      default:
        return 'bg-gray-50';
    }
  };

  const renderContent = () => {
    if (user.role === 'restaurant') {
      switch (activeTab) {
        case 'dashboard':
          return <RestaurantDashboard />;
        case 'menu':
          return <MenuManagement />;
        case 'orders':
          return <OrderManagement />;
        case 'profile':
          return <RestaurantProfile />;
        case 'settings':
          return <Settings />;
        default:
          return <RestaurantDashboard />;
      }
    } else if (user.role === 'customer') {
      switch (activeTab) {
        case 'dashboard':
          return <CustomerDashboard />;
        case 'restaurants':
          return <BrowseRestaurants />;
        case 'cart':
          return <Cart />;
        case 'orders':
          return <MyOrders />;
        case 'profile':
          return <Profile />;
        case 'settings':
          return <CustomerSettings />;
        default:
          return <CustomerDashboard />;
      }
    } else if (user.role === 'delivery') {
      switch (activeTab) {
        case 'dashboard':
          return <DeliveryDashboard />;
        case 'assignments':
          return <OrderAssignments />;
        case 'tracking':
          return <DeliveryTracking />;
        case 'earnings':
          return <Earnings />;
        case 'profile':
          return <DeliveryProfile />;
        case 'settings':
          return <DeliverySettings />;
        default:
          return <DeliveryDashboard />;
      }
    }

    return <div>Invalid role</div>;
  };

  return (
    <div className={`min-h-screen ${getRoleBackground()}`}>
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className={`flex-1 min-h-screen ${getRoleBackground()}`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;