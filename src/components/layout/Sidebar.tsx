import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BarChart2, MessageSquare, Zap, 
  Settings, ChevronRight, HelpCircle, LogOut, 
  ChevronDown, Plus, Globe, StarIcon, List
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import NewAutomationDialog from '../automation/NewAutomationDialog';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const [automationsExpanded, setAutomationsExpanded] = useState(true);
  const [integrationsExpanded, setIntegrationsExpanded] = useState(false);
  
  const mainMenuItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: LayoutDashboard 
    },
  ];

  const automationItems = [
    { 
      name: 'All Automations', 
      path: '/automations', 
      icon: List 
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
  ];

  const integrationItems = [
    { 
      name: 'API Connections', 
      path: '/api-connections', 
      icon: Globe 
    },
    { 
      name: 'Templates', 
      path: '/templates', 
      icon: StarIcon 
    },
  ];

  const bottomMenuItems = [
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: Settings 
    },
    { 
      name: 'Help & Support', 
      path: '/help', 
      icon: HelpCircle 
    },
  ];

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNewAutomation = (name: string, type: string) => {
    console.log('Creating new automation:', name, type);
    
    // Show success toast
    toast({
      title: "Automation Created!",
      description: `${name} (${type}) has been created successfully.`,
    });
    
    // Navigate to the appropriate page based on type
    switch(type) {
      case 'facebook-ads':
        navigate('/facebook-ads');
        break;
      case 'ai-customer-support':
        navigate('/customer-support');
        break;
      case 'data-analysis':
        navigate('/data-analysis');
        break;
      default:
        navigate('/automations');
    }
    
    closeSidebar();
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      <div 
        className={cn(
          "fixed left-0 top-0 bottom-0 w-64 bg-white z-50 transition-transform duration-300 ease-in-out transform md:relative md:z-auto border-r border-gray-100 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="h-16 border-b border-gray-100 flex items-center justify-center">
          <Link to="/" className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">
            AutomateX
          </Link>
        </div>
        
        <div className="flex-grow overflow-y-auto px-3 py-4">
          <div className="mb-6">
            <NewAutomationDialog 
              trigger={
                <Button className="w-full flex items-center justify-center">
                  <Plus className="h-4 w-4 mr-2" />
                  <span>New Automation</span>
                </Button>
              }
              onCreateAutomation={handleNewAutomation}
            />
          </div>

          <div className="space-y-1">
            {mainMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                  location.pathname === item.path
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-700 hover:bg-gray-50"
                )}
                onClick={closeSidebar}
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
          </div>

          <div className="mt-6">
            <button 
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
              onClick={() => setAutomationsExpanded(!automationsExpanded)}
            >
              <span className="font-semibold">Automations</span>
              <ChevronDown 
                className={cn(
                  "h-4 w-4 text-gray-500 transition-transform", 
                  automationsExpanded ? "transform rotate-180" : ""
                )} 
              />
            </button>
            
            {automationsExpanded && (
              <div className="mt-1 space-y-1 pl-2">
                {automationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
                      location.pathname === item.path
                        ? "bg-brand-50 text-brand-700"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={closeSidebar}
                  >
                    <item.icon className={cn(
                      "mr-3 h-4 w-4 transition-colors",
                      location.pathname === item.path
                        ? "text-brand-600"
                        : "text-gray-500 group-hover:text-gray-700"
                    )} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4">
            <button 
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
              onClick={() => setIntegrationsExpanded(!integrationsExpanded)}
            >
              <span className="font-semibold">Integrations</span>
              <ChevronDown 
                className={cn(
                  "h-4 w-4 text-gray-500 transition-transform", 
                  integrationsExpanded ? "transform rotate-180" : ""
                )} 
              />
            </button>
            
            {integrationsExpanded && (
              <div className="mt-1 space-y-1 pl-2">
                {integrationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
                      location.pathname === item.path
                        ? "bg-brand-50 text-brand-700"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={closeSidebar}
                  >
                    <item.icon className={cn(
                      "mr-3 h-4 w-4 transition-colors",
                      location.pathname === item.path
                        ? "text-brand-600"
                        : "text-gray-500 group-hover:text-gray-700"
                    )} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-auto border-t border-gray-100 px-3 py-4 space-y-1">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
                location.pathname === item.path
                  ? "bg-brand-50 text-brand-700"
                  : "text-gray-700 hover:bg-gray-50"
              )}
              onClick={closeSidebar}
            >
              <item.icon className={cn(
                "mr-3 h-5 w-5 transition-colors",
                location.pathname === item.path
                  ? "text-brand-600"
                  : "text-gray-500 group-hover:text-gray-700"
              )} />
              <span>{item.name}</span>
            </Link>
          ))}
          
          <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200">
            <LogOut className="mr-3 h-5 w-5 text-gray-500" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
