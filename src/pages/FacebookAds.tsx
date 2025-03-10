
import React from 'react';
import { BarChart2, TrendingUp, DollarSign, Target, PlusCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedRoute from '@/components/ui/AnimatedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConnectButton from '@/components/dashboard/ConnectButton';
import StatCard from '@/components/dashboard/StatCard';

const FacebookAds = () => {
  // Mock data
  const campaigns = [
    { 
      id: 1, 
      name: 'Summer Sale 2023', 
      status: 'Active', 
      budget: '$500', 
      spent: '$320', 
      results: 142,
      cpa: '$2.25'
    },
    { 
      id: 2, 
      name: 'Product Launch', 
      status: 'Active', 
      budget: '$1,200', 
      spent: '$840', 
      results: 310,
      cpa: '$2.71'
    },
    { 
      id: 3, 
      name: 'Retargeting Campaign', 
      status: 'Paused', 
      budget: '$300', 
      spent: '$120', 
      results: 65,
      cpa: '$1.85'
    }
  ];

  const stats = [
    {
      title: 'Total Spend',
      value: '$1,280',
      change: { value: '15%', positive: true },
      icon: <DollarSign className="h-5 w-5 text-brand-600" />
    },
    {
      title: 'Conversions',
      value: '517',
      change: { value: '8%', positive: true },
      icon: <Target className="h-5 w-5 text-brand-600" />
    },
    {
      title: 'Avg. CPA',
      value: '$2.48',
      change: { value: '3%', positive: false },
      icon: <TrendingUp className="h-5 w-5 text-brand-600" />
    }
  ];

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Facebook Ads</h1>
            <p className="text-gray-600 mt-1">Manage and automate your Facebook ad campaigns</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>

        <Tabs defaultValue="campaigns" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="campaigns">
            {/* Connect Account Card */}
            <Card className="mb-8 border-brand-100 bg-brand-50/50">
              <CardHeader>
                <CardTitle>Connect Facebook Ads Account</CardTitle>
                <CardDescription>
                  Connect your Facebook Ads account to start automating your campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-md">
                  <ConnectButton 
                    service="Facebook Ads"
                    icon={<BarChart2 className="h-4 w-4 text-brand-600" />}
                    isConnected={true}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
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

            {/* Campaigns Table */}
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>
                  Overview of your running Facebook ad campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm border-b border-gray-200">
                        <th className="pb-3 font-medium text-gray-500">Campaign</th>
                        <th className="pb-3 font-medium text-gray-500">Status</th>
                        <th className="pb-3 font-medium text-gray-500">Budget</th>
                        <th className="pb-3 font-medium text-gray-500">Spent</th>
                        <th className="pb-3 font-medium text-gray-500">Results</th>
                        <th className="pb-3 font-medium text-gray-500">CPA</th>
                        <th className="pb-3 font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign) => (
                        <tr key={campaign.id} className="border-b border-gray-100 text-sm">
                          <td className="py-4 font-medium">{campaign.name}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              campaign.status === 'Active' 
                                ? 'bg-green-50 text-green-700' 
                                : 'bg-amber-50 text-amber-700'
                            }`}>
                              {campaign.status}
                            </span>
                          </td>
                          <td className="py-4">{campaign.budget}</td>
                          <td className="py-4">{campaign.spent}</td>
                          <td className="py-4">{campaign.results}</td>
                          <td className="py-4">{campaign.cpa}</td>
                          <td className="py-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className={campaign.status === 'Active' ? 'text-amber-600' : 'text-green-600'}
                              >
                                {campaign.status === 'Active' ? 'Pause' : 'Resume'}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="automation">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Auto-Optimization</CardTitle>
                  <CardDescription>
                    Automatically optimize your ad campaigns based on performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Enable AI-powered optimization to automatically adjust your campaign budget and 
                    targeting based on real-time performance data.
                  </p>
                  <Button>Configure Auto-Optimization</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>
                    Set up automated campaign performance reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Receive automated reports on your campaign performance via email at your preferred frequency.
                  </p>
                  <Button>Set Up Reports</Button>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>AI Campaign Creator</CardTitle>
                  <CardDescription>
                    Use AI to create optimized ad campaigns based on your business goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Our AI assistant will help you create effective ad campaigns by analyzing your 
                    target audience, business goals, and previous campaign performance.
                  </p>
                  <Button>Create Campaign with AI</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Detailed analysis of your Facebook ad campaigns performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                  <p className="text-gray-500">Interactive performance charts will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your Facebook Ads integration settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">API Access</h3>
                    <p className="text-sm text-gray-600 mb-2">Manage API access and permissions</p>
                    <Button variant="outline">Configure API Settings</Button>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-medium mb-1">Data Refresh Rate</h3>
                    <p className="text-sm text-gray-600 mb-2">Control how often data is refreshed from Facebook</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Every 15 min</Button>
                      <Button variant="outline" size="sm">Hourly</Button>
                      <Button size="sm">Daily</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedRoute>
  );
};

export default FacebookAds;
