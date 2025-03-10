
import React from 'react';
import { BarChart2, Zap, MessageSquare, PlusCircle, ArrowUpRight, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/dashboard/StatCard';
import AutomationCard from '@/components/dashboard/AutomationCard';
import AnimatedRoute from '@/components/ui/AnimatedRoute';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Active Automations',
      value: '12',
      change: { value: '2', positive: true },
      icon: <Zap className="h-6 w-6 text-brand-600" />
    },
    {
      title: 'Tasks Completed',
      value: '1,284',
      change: { value: '12%', positive: true },
      icon: <CheckCircle2 className="h-6 w-6 text-brand-600" />
    },
    {
      title: 'Issues Detected',
      value: '2',
      change: { value: '1', positive: false },
      icon: <AlertTriangle className="h-6 w-6 text-amber-600" />
    },
    {
      title: 'Time Saved',
      value: '124h',
      change: { value: '8h', positive: true },
      icon: <Clock className="h-6 w-6 text-brand-600" />
    }
  ];

  const automations = [
    {
      title: 'Facebook Ads Weekly Report',
      description: 'Generates performance reports from all active campaigns weekly',
      icon: <BarChart2 className="h-5 w-5 text-brand-600" />,
      status: 'active' as const,
      lastRun: '2 days ago',
      path: '/facebook-ads'
    },
    {
      title: 'Customer Support AI',
      description: 'AI chatbot answering customer queries 24/7',
      icon: <MessageSquare className="h-5 w-5 text-brand-600" />,
      status: 'active' as const,
      lastRun: '2 hours ago',
      path: '/customer-support'
    },
    {
      title: 'Business Data Analysis',
      description: 'Weekly business data analysis and insights generation',
      icon: <Zap className="h-5 w-5 text-brand-600" />,
      status: 'paused' as const,
      lastRun: '1 week ago',
      path: '/data-analysis'
    }
  ];

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's an overview of your automations.</p>
          </div>
          <Button className="mt-4 md:mt-0 gap-2" onClick={() => navigate('/new-automation')}>
            <PlusCircle className="h-4 w-4" />
            Create Automation
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>

        {/* Recent Automations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-900">Recent Automations</h2>
            <Button variant="ghost" size="sm" className="text-brand-600 gap-1" onClick={() => navigate('/all-automations')}>
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {automations.map((automation, index) => (
              <AutomationCard
                key={index}
                title={automation.title}
                description={automation.description}
                icon={automation.icon}
                status={automation.status}
                lastRun={automation.lastRun}
                className="animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(automation.path)}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-3 justify-start text-left" 
              onClick={() => navigate('/facebook-ads')}
            >
              <BarChart2 className="h-5 w-5 mr-2 text-brand-600" />
              <span>Create Facebook Ad Campaign</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-3 justify-start text-left"
              onClick={() => navigate('/customer-support')}
            >
              <MessageSquare className="h-5 w-5 mr-2 text-brand-600" />
              <span>Configure AI Support Bot</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-3 justify-start text-left"
              onClick={() => navigate('/data-analysis')}
            >
              <Zap className="h-5 w-5 mr-2 text-brand-600" />
              <span>Generate Business Report</span>
            </Button>
          </div>
        </div>
      </div>
    </AnimatedRoute>
  );
};

export default Dashboard;
