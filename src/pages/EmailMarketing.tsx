import React, { useState } from 'react';
import { Mail, Users, TrendingUp, Calendar, Plus, Play, Pause, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import AnimatedRoute from '@/components/ui/AnimatedRoute';

const EmailMarketing = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Welcome Series',
      status: 'active',
      subscribers: 1250,
      openRate: 24.5,
      clickRate: 3.2,
      lastSent: '2 hours ago'
    },
    {
      id: 2,
      name: 'Product Launch',
      status: 'paused',
      subscribers: 890,
      openRate: 31.2,
      clickRate: 5.8,
      lastSent: '1 day ago'
    },
    {
      id: 3,
      name: 'Re-engagement',
      status: 'draft',
      subscribers: 2100,
      openRate: 0,
      clickRate: 0,
      lastSent: 'Never'
    }
  ]);

  const handleCampaignAction = (action: string, campaignId: number) => {
    toast({
      title: `Campaign ${action}`,
      description: `Email campaign has been ${action.toLowerCase()}.`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Email Marketing</h1>
            <p className="text-gray-600 mt-1">Automated email campaigns and sequences</p>
          </div>
          <Button onClick={() => handleCampaignAction('Created', 0)}>
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900">4,240</p>
                </div>
                <Users className="h-8 w-8 text-brand-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Open Rate</p>
                  <p className="text-2xl font-bold text-gray-900">27.8%</p>
                </div>
                <Mail className="h-8 w-8 text-brand-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Click Rate</p>
                  <p className="text-2xl font-bold text-gray-900">4.5%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-brand-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-bold text-gray-900">{campaigns.filter(c => c.status === 'active').length}</p>
                </div>
                <Calendar className="h-8 w-8 text-brand-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Email Campaigns</CardTitle>
            <CardDescription>Manage your automated email sequences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-8 w-8 text-brand-600" />
                    <div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <p className="text-sm text-gray-600">
                        {campaign.subscribers} subscribers • Last sent: {campaign.lastSent}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                    
                    <div className="text-right">
                      <p className="text-sm font-medium">{campaign.openRate}% open</p>
                      <p className="text-sm text-gray-600">{campaign.clickRate}% click</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      {campaign.status === 'active' ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCampaignAction('Paused', campaign.id)}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCampaignAction('Started', campaign.id)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCampaignAction('Configured', campaign.id)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedRoute>
  );
};

export default EmailMarketing;