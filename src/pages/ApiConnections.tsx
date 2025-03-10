
import React, { useState } from 'react';
import { Globe, Key, Lock, RefreshCw, PlusCircle, Trash2, Check, ExternalLink, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedRoute from '@/components/ui/AnimatedRoute';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import ConnectButton from '@/components/dashboard/ConnectButton';
import { useToast } from '@/hooks/use-toast';

const ApiConnections = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('connections');

  const connectedApis = [
    {
      id: 1,
      name: 'Facebook Marketing API',
      status: 'connected',
      lastUsed: '2 hours ago',
      icon: <Globe className="h-4 w-4 text-blue-600" />
    },
    {
      id: 2,
      name: 'OpenAI API',
      status: 'connected',
      lastUsed: '1 day ago',
      icon: <Globe className="h-4 w-4 text-green-600" />
    }
  ];

  const availableApis = [
    {
      name: 'Google Analytics',
      icon: <Globe className="h-4 w-4 text-blue-500" />,
      connected: false
    },
    {
      name: 'Twitter API',
      icon: <Globe className="h-4 w-4 text-sky-500" />,
      connected: false
    },
    {
      name: 'Slack API',
      icon: <Globe className="h-4 w-4 text-purple-500" />,
      connected: false
    },
    {
      name: 'Stripe API',
      icon: <Globe className="h-4 w-4 text-indigo-500" />,
      connected: false
    }
  ];

  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      key: 'pk_live_•••••••••••••••••••••••••',
      created: 'May 15, 2023',
      lastUsed: 'Today'
    },
    {
      id: 2,
      name: 'Development API Key',
      key: 'pk_test_•••••••••••••••••••••••••',
      created: 'May 10, 2023',
      lastUsed: '3 days ago'
    }
  ];

  const webhooks = [
    {
      id: 1,
      name: 'New Data Webhook',
      url: 'https://api.example.com/webhooks/data',
      events: ['data.created', 'data.updated'],
      active: true
    },
    {
      id: 2,
      name: 'Alert Webhook',
      url: 'https://api.example.com/webhooks/alerts',
      events: ['alert.triggered'],
      active: false
    }
  ];

  const handleConnect = (apiName: string) => {
    toast({
      title: "Connection Initiated",
      description: `Connecting to ${apiName}...`,
    });
  };

  const handleCopyApiKey = (key: string) => {
    navigator.clipboard.writeText(key.replace(/•/g, '*'));
    toast({
      title: "Copied to Clipboard",
      description: "API key copied to clipboard (redacted for security)",
    });
  };

  const handleAddNewKey = () => {
    toast({
      title: "New API Key",
      description: "A new API key has been generated.",
    });
  };

  const handleRevokeKey = (keyId: number) => {
    toast({
      title: "API Key Revoked",
      description: "The API key has been revoked successfully.",
    });
  };

  const handleWebhookToggle = (webhookId: number, active: boolean) => {
    toast({
      title: active ? "Webhook Enabled" : "Webhook Disabled",
      description: `The webhook has been ${active ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">API Connections</h1>
            <p className="text-gray-600 mt-1">Manage your API connections and authentication</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Connection
            </Button>
          </div>
        </div>

        <Tabs defaultValue="connections" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="connections">API Connections</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connections">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Connected APIs Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Connected APIs</CardTitle>
                  <CardDescription>
                    External services that are currently connected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {connectedApis.length > 0 ? (
                    <div className="space-y-4">
                      {connectedApis.map((api) => (
                        <div key={api.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                              {api.icon}
                            </div>
                            <div>
                              <p className="font-medium">{api.name}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  Connected
                                </Badge>
                                <span className="text-xs text-gray-500">Last used: {api.lastUsed}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Key className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <p className="text-gray-500">No APIs connected yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Available APIs Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Connections</CardTitle>
                  <CardDescription>
                    Connect to additional services and APIs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {availableApis.map((api, index) => (
                      <ConnectButton
                        key={index}
                        service={api.name}
                        icon={api.icon}
                        isConnected={api.connected}
                        onClick={() => handleConnect(api.name)}
                      />
                    ))}
                    
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Add Custom API Connection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Documentation Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>
                  Resources to help you integrate with APIs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start h-auto py-4 gap-3">
                    <ExternalLink className="h-5 w-5 text-brand-600" />
                    <div className="text-left">
                      <p className="font-medium">API Reference</p>
                      <p className="text-xs text-gray-500">Complete API documentation</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-4 gap-3">
                    <ExternalLink className="h-5 w-5 text-brand-600" />
                    <div className="text-left">
                      <p className="font-medium">Quickstart Guides</p>
                      <p className="text-xs text-gray-500">Get up and running quickly</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-4 gap-3">
                    <ExternalLink className="h-5 w-5 text-brand-600" />
                    <div className="text-left">
                      <p className="font-medium">SDK Downloads</p>
                      <p className="text-xs text-gray-500">Client libraries for integration</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api-keys">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>
                    Manage authentication keys for the AutomateX API
                  </CardDescription>
                </div>
                <Button className="mt-4 sm:mt-0" onClick={handleAddNewKey}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Generate New Key
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="py-3 px-4 text-left font-medium">Key Name</th>
                        <th className="py-3 px-4 text-left font-medium">Key</th>
                        <th className="py-3 px-4 text-left font-medium">Created</th>
                        <th className="py-3 px-4 text-left font-medium">Last Used</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {apiKeys.map((apiKey) => (
                        <tr key={apiKey.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{apiKey.name}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm">{apiKey.key}</code>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6"
                                onClick={() => handleCopyApiKey(apiKey.key)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                          <td className="py-3 px-4">{apiKey.created}</td>
                          <td className="py-3 px-4">{apiKey.lastUsed}</td>
                          <td className="py-3 px-4">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 border-red-200" 
                              onClick={() => handleRevokeKey(apiKey.id)}
                            >
                              Revoke
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-100">
                  <h3 className="text-sm font-medium mb-2">API Key Security</h3>
                  <p className="text-sm text-gray-600">
                    <Lock className="h-4 w-4 inline-block mr-1 text-gray-500" />
                    Keep your API keys secure. Never share them in publicly accessible areas such as GitHub, client-side code, or forums.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="webhooks">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Webhooks</CardTitle>
                  <CardDescription>
                    Configure webhooks to receive notifications for events
                  </CardDescription>
                </div>
                <Button className="mt-4 sm:mt-0">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Webhook
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="py-3 px-4 text-left font-medium">Name</th>
                        <th className="py-3 px-4 text-left font-medium">URL</th>
                        <th className="py-3 px-4 text-left font-medium">Events</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {webhooks.map((webhook) => (
                        <tr key={webhook.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{webhook.name}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm truncate max-w-[200px]">
                                {webhook.url}
                              </code>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6"
                                onClick={() => {
                                  navigator.clipboard.writeText(webhook.url);
                                  toast({
                                    title: "Copied to Clipboard",
                                    description: "Webhook URL copied to clipboard",
                                  });
                                }}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {webhook.events.map((event, i) => (
                                <Badge key={i} variant="outline" className="bg-gray-100">
                                  {event}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Switch 
                                checked={webhook.active} 
                                onCheckedChange={(checked) => handleWebhookToggle(webhook.id, checked)} 
                              />
                              <span className={webhook.active ? 'text-green-600' : 'text-gray-500'}>
                                {webhook.active ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 bg-brand-50 p-4 rounded-md border border-brand-100">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Check className="h-4 w-4 text-brand-600" />
                    Webhook Testing
                  </h3>
                  <p className="text-sm text-brand-600">
                    Use the "Test" button to send a sample payload to your webhook endpoint to verify configuration.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedRoute>
  );
};

export default ApiConnections;
