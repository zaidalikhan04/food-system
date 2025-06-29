import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types';
import LoadingSpinner from '../common/LoadingSpinner';

interface LoginFormProps {
  selectedRole: User['role'];
  onBack: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ selectedRole, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password, selectedRole);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = {
    restaurant: { email: 'restaurant@grubz.com', password: 'demo123' },
    customer: { email: 'customer@grubz.com', password: 'demo123' },
    delivery: { email: 'delivery@grubz.com', password: 'demo123' }
  };

  const handleDemoLogin = () => {
    setEmail(demoCredentials[selectedRole].email);
    setPassword(demoCredentials[selectedRole].password);
  };

  const getRoleTitle = (role: User['role']) => {
    switch (role) {
      case 'restaurant': return 'Restaurant';
      case 'customer': return 'Grubber';
      case 'delivery': return 'Delivery Hero';
      default: return role;
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'restaurant': return 'from-purple-500 to-indigo-500'; // Purple theme
      case 'customer': return 'from-red-500 to-rose-500'; // Much more red theme
      case 'delivery': return 'from-green-500 to-emerald-500';
      default: return 'from-orange-500 to-red-500';
    }
  };

  const getPageBackground = (role: User['role']) => {
    switch (role) {
      case 'restaurant': return 'bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100'; // Purple background
      case 'customer': return 'bg-gradient-to-br from-red-50 via-red-100 to-rose-100'; // Much more red background
      case 'delivery': return 'bg-gradient-to-br from-green-50 via-white to-emerald-50';
      default: return 'bg-gradient-to-br from-orange-50 via-white to-blue-50';
    }
  };

  return (
    <div className={`min-h-screen ${getPageBackground(selectedRole)} flex items-center justify-center p-4`}>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform animate-slideInUp">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getRoleColor(selectedRole)} p-6 text-white relative`}>
          <button
            onClick={onBack}
            className="absolute left-4 top-6 p-2 hover:bg-white/20 rounded-lg transition-colors"
            type="button"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              <span className="inline-block text-white">Grub</span>
              <span className="text-black inline-block">z</span>
            </h1>
            <p className="text-white/90 text-sm mt-2">Food That Moves</p>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in' : 'Sign up'} as {getRoleTitle(selectedRole)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r ${getRoleColor(selectedRole)} text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center`}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" color="text-white" />
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick Demo Access</span>
              </div>
            </div>

            <button
              onClick={handleDemoLogin}
              className="mt-4 w-full px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Use Demo {getRoleTitle(selectedRole)} Account
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;