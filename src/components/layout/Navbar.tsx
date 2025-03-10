
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="mr-3 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/" className="flex items-center">
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">AutomateX</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-[300px] lg:w-[400px]">
        <Search className="h-4 w-4 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search automations..."
          className="bg-transparent border-none outline-none w-full text-sm"
        />
      </div>

      <div className="flex items-center space-x-1 md:space-x-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-gray-100"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center">
          <User className="h-4 w-4 text-brand-700" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
