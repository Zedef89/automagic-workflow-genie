
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart2, MessageSquare, Zap, Settings, ChevronRight, HelpCircle, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  
  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: LayoutDashboard 
    },
    { 
      name: 'Facebook Ads', 
      path: '/facebook-ads', 
      icon: BarChart2 
    },
    { 
      name: 'Customer Support', 
      path: '/customer-support', 
      icon: MessageSquare 
    },
    { 
      name: 'Data Analysis', 
      path: '/data-analysis', 
      icon: Zap 
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: Settings 
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed left-0 top-0 bottom-0 w-64 bg-white z-50 transition-transform duration-300 ease-in-out transform md:translate-x-0 border-r border-gray-100 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 border-b border-gray-100 flex items-center justify-center">
          <Link to="/" className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">
            AutomateX
          </Link>
        </div>
        
        <div className="flex flex-col flex-grow px-3 py-6 overflow-y-auto">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                  location.pathname === item.path
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5 transition-colors",
                  location.pathname === item.path
                    ? "text-brand-600"
                    : "text-gray-500 group-hover:text-gray-700"
                )} />
                <span>{item.name}</span>
                {location.pathname === item.path && (
                  <ChevronRight className="ml-auto h-4 w-4 text-brand-600" />
                )}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto space-y-1">
            <Link to="/help" className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <HelpCircle className="mr-3 h-5 w-5 text-gray-500" />
              <span>Help & Support</span>
            </Link>
            <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <LogOut className="mr-3 h-5 w-5 text-gray-500" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
