
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import NotificationsPopover from './NotificationsPopover';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleSearch = () => {
    setSearchActive(!searchActive);
    if (searchActive) {
      setSearchQuery('');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Here you would implement your actual search logic
      // For now, let's just demonstrate by navigating to a search results page
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

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

      <div 
        className={cn(
          "absolute left-0 right-0 top-0 bg-white/80 backdrop-blur-md h-16 transition-all duration-200 flex items-center px-4 md:px-6",
          searchActive ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <form onSubmit={handleSearch} className="flex-1 flex items-center">
          <Input
            autoFocus
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search automations, templates, settings..."
            className="flex-1 border-none shadow-none focus-visible:ring-0 text-base"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            type="button" 
            onClick={toggleSearch}
            className="ml-2"
          >
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </form>
      </div>

      <div className={cn(
        "md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-[300px] lg:w-[400px]",
        searchActive ? "hidden" : "hidden"
      )}>
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
          onClick={toggleSearch}
          className="hover:bg-gray-100"
        >
          <Search className="h-5 w-5 text-gray-600" />
        </Button>
        
        <NotificationsPopover />
        
        <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center">
          <User className="h-4 w-4 text-brand-700" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
