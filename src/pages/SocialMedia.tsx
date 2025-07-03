import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, TrendingUp, Users, Eye, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import AnimatedRoute from '@/components/ui/AnimatedRoute';

const SocialMedia = () => {
  const { toast } = useToast();
  const [mentions, setMentions] = useState([
    {
      id: 1,
      platform: 'Twitter',
      author: '@john_doe',
      content: 'Just tried the new AutomateX features and I\'m blown away! The automation workflows are incredible.',
      sentiment: 'positive',
      engagement: { likes: 24, shares: 8, comments: 5 },
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      platform: 'Facebook',
      author: 'Sarah Johnson',
      content: 'Has anyone used AutomateX for their business? Looking for reviews.',
      sentiment: 'neutral',
      engagement: { likes: 12, shares: 3, comments: 15 },
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      platform: 'LinkedIn',
      author: 'Mike Chen',
      content: 'AutomateX customer support could be better. Took a while to get a response.',
      sentiment: 'negative',
      engagement: { likes: 5, shares: 1, comments: 8 },
      timestamp: '6 hours ago'
    },
    {
      id: 4,
      platform: 'Instagram',
      author: '@tech_enthusiast',
      content: 'Love the clean interface of AutomateX! Makes automation so much easier.',
      sentiment: 'positive',
      engagement: { likes: 89, shares: 12, comments: 23 },
      timestamp: '1 day ago'
    }
  ]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Twitter': return 'bg-blue-100 text-blue-800';
      case 'Facebook': return 'bg-blue-100 text-blue-800';
      case 'LinkedIn': return 'bg-blue-100 text-blue-800';
      case 'Instagram': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAction = (action: string, mentionId?: number) => {
    toast({
      title: `Social Media ${action}`,
      description: `Action completed successfully.`
    });
  };

  const totalMentions = mentions.length;
  const positiveMentions = mentions.filter(m => m.sentiment === 'positive').length;
  const negativeMentions = mentions.filter(m => m.sentiment === 'negative').length;
  const totalEngagement = mentions.reduce((sum, m) => sum + m.engagement.likes + m.engagement.shares + m.engagement.comments, 0);

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Social Media Monitoring</h1>
            <p className="text-gray-600 mt-1">Track brand mentions and sentiment across platforms</p>
          </div>
          <Button onClick={() => handleAction('Alert Created')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Alert
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Mentions</p>
                  <p className="text-2xl font-bold text-gray-900">{totalMentions}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-brand-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Positive Sentiment</p>
                  <p className="text-2xl font-bold text-green-600">{positiveMentions}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Negative Sentiment</p>
                  <p className="text-2xl font-bold text-red-600">{negativeMentions}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600 rotate-180" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Engagement</p>
                  <p className="text-2xl font-bold text-gray-900">{totalEngagement}</p>
                </div>
                <Users className="h-8 w-8 text-brand-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="mentions" className="mb-6">
          <TabsList>
            <TabsTrigger value="mentions">Recent Mentions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mentions" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Brand Mentions</CardTitle>
                    <CardDescription>Recent mentions across social platforms</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => handleAction('Filtered')}>
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mentions.map((mention) => (
                    <div key={mention.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge className={getPlatformColor(mention.platform)}>
                            {mention.platform}
                          </Badge>
                          <Badge className={getSentimentColor(mention.sentiment)}>
                            {mention.sentiment}
                          </Badge>
                          <span className="text-sm text-gray-600">{mention.timestamp}</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAction('Responded', mention.id)}
                        >
                          Respond
                        </Button>
                      </div>
                      
                      <div className="mb-3">
                        <p className="font-medium text-gray-900 mb-1">{mention.author}</p>
                        <p className="text-gray-700">{mention.content}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{mention.engagement.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share2 className="h-4 w-4" />
                          <span>{mention.engagement.shares}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{mention.engagement.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Analysis</CardTitle>
                  <CardDescription>Breakdown of mention sentiment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Positive</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: `${(positiveMentions/totalMentions)*100}%`}}></div>
                        </div>
                        <span className="text-sm text-gray-600">{positiveMentions}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Neutral</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-600 h-2 rounded-full" style={{width: `${((totalMentions-positiveMentions-negativeMentions)/totalMentions)*100}%`}}></div>
                        </div>
                        <span className="text-sm text-gray-600">{totalMentions-positiveMentions-negativeMentions}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Negative</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{width: `${(negativeMentions/totalMentions)*100}%`}}></div>
                        </div>
                        <span className="text-sm text-gray-600">{negativeMentions}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Platform Distribution</CardTitle>
                  <CardDescription>Mentions by social platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Twitter', 'Facebook', 'LinkedIn', 'Instagram'].map(platform => {
                      const count = mentions.filter(m => m.platform === platform).length;
                      return (
                        <div key={platform} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{platform}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div className="bg-brand-600 h-2 rounded-full" style={{width: `${(count/totalMentions)*100}%`}}></div>
                            </div>
                            <span className="text-sm text-gray-600">{count}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="alerts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Monitoring Alerts</CardTitle>
                <CardDescription>Configure alerts for brand mentions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h3>
                  <p className="text-gray-600 mb-4">Create alerts to monitor specific keywords or mentions</p>
                  <Button onClick={() => handleAction('Alert Created')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Alert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedRoute>
  );
};

export default SocialMedia;