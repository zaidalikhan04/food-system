import React, { useState, useEffect } from 'react';
import { User as UserType } from '../../types';

interface RoleSelectionProps {
  onRoleSelect: (role: UserType['role']) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showRoles, setShowRoles] = useState(false);

  useEffect(() => {
    // Show logo much faster at 100ms
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 100);

    // Show roles shortly after logo starts appearing
    const rolesTimer = setTimeout(() => {
      setShowRoles(true);
    }, 600);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(rolesTimer);
    };
  }, []);

  const roles = [
    {
      id: 'restaurant' as const,
      title: 'Restaurant',
      emoji: '🍽️',
      color: 'from-purple-500 to-indigo-500',
      hoverColor: 'hover:from-purple-600 hover:to-indigo-600'
    },
    {
      id: 'customer' as const,
      title: 'Grubber',
      emoji: '🍕',
      color: 'from-red-500 to-rose-500',
      hoverColor: 'hover:from-red-600 hover:to-rose-600'
    },
    {
      id: 'delivery' as const,
      title: 'Delivery Hero',
      emoji: '🚀',
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'hover:from-green-600 hover:to-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Animated Brand Header */}
      <div className="text-center mb-20">
        <div 
          className={`transform transition-all duration-1000 ease-out ${
            showLogo 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-6 opacity-0 scale-98'
          }`}
        >
          <h1 className="text-8xl md:text-9xl font-bold text-gray-900 mb-6 relative">
            <span className="inline-block">Grub</span>
            <span className="text-orange-500 inline-block">z</span>
            
            {/* Floating particles animation - RESTORED */}
            <div className="absolute -top-4 -right-4 w-3 h-3 bg-orange-400 rounded-full animate-ping delay-300"></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-500"></div>
            <div className="absolute top-1/2 -right-8 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping delay-700"></div>
          </h1>
          
          <p className={`text-2xl md:text-3xl text-gray-600 font-medium transition-all duration-800 ease-out delay-200 ${
            showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Food That Moves
          </p>
          
          {/* Animated underline */}
          <div className={`w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-6 rounded-full transition-all duration-800 ease-out delay-400 ${
            showLogo ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`}></div>
        </div>
      </div>

      {/* Animated Role Selection Cards - Much Smaller */}
      <div 
        className={`max-w-2xl w-full transform transition-all duration-800 ease-out ${
          showRoles 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role, index) => {
            return (
              <div
                key={role.id}
                className={`transform transition-all duration-600 ease-out ${
                  showRoles 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-6 opacity-0'
                }`}
                style={{
                  transitionDelay: showRoles ? `${index * 150}ms` : '0ms'
                }}
              >
                <button
                  onClick={() => onRoleSelect(role.id)}
                  className={`group relative overflow-hidden bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 w-full h-24 flex flex-col items-center justify-center`}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 transition-all duration-500 transform scale-0 group-hover:scale-100`}></div>
                  
                  {/* Ripple effect on hover */}
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transform scale-0 group-hover:scale-150 transition-all duration-700 rounded-full`}></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Emoji */}
                    <div className="text-xl mb-1 transform group-hover:scale-110 transition-transform duration-300">
                      {role.emoji}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-gray-800 transition-all duration-300">
                      {role.title}
                    </h3>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${role.color} rounded-lg blur opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
                  
                  {/* Floating arrow on hover */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <div className={`w-4 h-4 bg-gradient-to-br ${role.color} rounded-full flex items-center justify-center`}>
                      <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animated footer */}
      <div 
        className={`mt-16 text-center transform transition-all duration-800 ease-out delay-300 ${
          showRoles 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-4 opacity-0'
        }`}
      >
        <p className="text-gray-500 text-sm">
          Join thousands of users who trust Grubz for their food delivery needs
        </p>
      </div>

      {/* Background animated elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default RoleSelection;