
import React, { useState } from 'react';
import { BarChart2, Zap, MessageSquare, Filter, Plus, ArrowUpRight, Check, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AnimatedRoute from '@/components/ui/AnimatedRoute';
import AutomationCard from '@/components/dashboard/AutomationCard';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AllAutomations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const automations = [
    {
      id: 1,
      title: 'Facebook Ads Weekly Report',
      description: 'Generates performance reports from all active campaigns weekly',
      icon: <BarChart2 className="h-5 w-5 text-brand-600" />,
      status: 'active' as const,
      lastRun: '2 days ago',
      path: '/facebook-ads',
      category: 'marketing'
    },
    {
      id: 2,
      title: 'Customer Support AI',
      description: 'AI chatbot answering customer queries 24/7',
      icon: <MessageSquare className="h-5 w-5 text-brand-600" />,
      status: 'active' as const,
      lastRun: '2 hours ago',
      path: '/customer-support',
      category: 'support'
    },
    {
      id: 3,
      title: 'Business Data Analysis',
      description: 'Weekly business data analysis and insights generation',
      icon: <Zap className="h-5 w-5 text-brand-600" />,
      status: 'paused' as const,
      lastRun: '1 week ago',
      path: '/data-analysis',
      category: 'analytics'
    },
    {
      id: 4,
      title: 'Email Marketing Sequence',
      description: 'Automated email campaigns based on user behavior',
      icon: <MessageSquare className="h-5 w-5 text-brand-600" />,
      status: 'active' as const,
      lastRun: '1 day ago',
      path: '/email-marketing',
      category: 'marketing'
    },
    {
      id: 5,
      title: 'Inventory Management',
      description: 'Real-time inventory tracking and alerts',
      icon: <BarChart2 className="h-5 w-5 text-brand-600" />,
      status: 'inactive' as const,
      lastRun: 'Never',
      path: '/inventory',
      category: 'operations'
    },
    {
      id: 6,
      title: 'Social Media Monitoring',
      description: 'Track brand mentions and sentiment across platforms',
      icon: <MessageSquare className="h-5 w-5 text-brand-600" />,
      status: 'active' as const,
      lastRun: '3 hours ago',
      path: '/social-media',
      category: 'marketing'
    }
  ];

  const filteredAutomations = searchQuery 
    ? automations.filter(automation => 
        automation.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        automation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        automation.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : automations;

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Automations</h1>
            <p className="text-gray-600 mt-1">Manage and monitor all your automation workflows</p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={() => navigate('/new-automation')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Automation
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Automation Summary</CardTitle>
            <CardDescription>Overview of your automation status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total</span>
                <div className="flex items-center mt-1">
                  <Zap className="h-5 w-5 text-brand-600 mr-2" />
                  <span className="text-2xl font-semibold">{automations.length}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Active</span>
                <div className="flex items-center mt-1">
                  <Check className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-2xl font-semibold">
                    {automations.filter(a => a.status === 'active').length}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Paused</span>
                <div className="flex items-center mt-1">
                  <Clock className="h-5 w-5 text-amber-600 mr-2" />
                  <span className="text-2xl font-semibold">
                    {automations.filter(a => a.status === 'paused').length}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Inactive</span>
                <div className="flex items-center mt-1">
                  <AlertCircle className="h-5 w-5 text-gray-600 mr-2" />
                  <span className="text-2xl font-semibold">
                    {automations.filter(a => a.status === 'inactive').length}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search automations..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAutomations.map((automation) => (
                <AutomationCard
                  key={automation.id}
                  title={automation.title}
                  description={automation.description}
                  icon={automation.icon}
                  status={automation.status}
                  lastRun={automation.lastRun}
                  className="cursor-pointer"
                  onClick={() => navigate(automation.path)}
                />
              ))}
            </div>
          </TabsContent>
          
          {['marketing', 'support', 'analytics', 'operations'].map(category => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredAutomations
                  .filter(automation => automation.category === category)
                  .map((automation) => (
                    <AutomationCard
                      key={automation.id}
                      title={automation.title}
                      description={automation.description}
                      icon={automation.icon}
                      status={automation.status}
                      lastRun={automation.lastRun}
                      className="cursor-pointer"
                      onClick={() => navigate(automation.path)}
                    />
                  ))}
              </div>
              
              {filteredAutomations.filter(a => a.category === category).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No {category} automations found</p>
                  <Button 
                    className="mt-4"
                    onClick={() => navigate('/new-automation')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create {category.charAt(0).toUpperCase() + category.slice(1)} Automation
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AnimatedRoute>
  );
};

// Need to define Search component
const Search = BarChart2;

export default AllAutomations;
